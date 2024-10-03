from django.db import models
from location.models import Vehicle, Location, School
import uuid
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.postgres.fields import ArrayField
from abstracts.models import Extra, Status


# FIXME: APPOINTMENT SECTIONS
class Weekday(models.TextChoices):
    MONDAY = 'MON', 'Monday'
    TUESDAY = 'TUE', 'Tuesday'
    WEDNESDAY = 'WED', 'Wednesday'
    THURSDAY = 'THU', 'Thursday'
    FRIDAY = 'FRI', 'Friday'
    SATURDAY = 'SAT', 'Saturday'
    SUNDAY = 'SUN', 'Sunday'

    def __str__(self):
        return self.week


class TimeRange(models.Model):
    day_of_week = models.CharField(max_length=3, choices=Weekday.choices, blank=True, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    start = models.DateTimeField(blank=True, null=True, )
    end = models.DateTimeField(blank=True, null=True, )


class DateRange(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    start = models.DateField(blank=True, null=True, )
    end = models.DateField(blank=True, null=True, )


class TimeOff(models.Model):
    STATUS = [
        [ "ACTIVE", "ACTIVE" ],
        [ "DELETED", "DELETED" ],
        [ "PENDING", "PENDING" ],
    ]
    TYPES = [
        [ "Federal Holiday", "Federal Holiday" ],
        [ "State Holiday", "State Holiday" ],
        [ "Religious Holiday", "Religious Holiday" ],
        [ "Corporate Off", "Corporate Off" ],
    ]
    id = models.UUIDField(auto_created=True, primary_key=True, unique=True, blank=True, )
    name = models.CharField(max_length=200)
    status = models.CharField(choices=STATUS, max_length=30, default="PENDING")
    code = models.CharField(max_length=150, blank=True, null=True)
    type = models.CharField(choices=TYPES, max_length=30, default="Corporate Off")
    date = models.DateField(default="02/22/2024", help_text="MM/DD/YYYY")
    is_all_day = models.BooleanField(default=False)
    start = models.DateField(blank=True, null=True, )
    end = models.DateField(blank=True, null=True, )
    is_assign_new_staff = models.BooleanField(default=False)
    is_assign_all_staff = models.BooleanField(default=False)
    staff = models.ManyToManyField("Users.Instructor", related_name="time_off_staff")
    note = models.TextField(blank=True)
    extra = models.JSONField(blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4( )
        super( ).save(*args, **kwargs)


class TimeSlot(Extra, Status):
    """
    Here we will store available slots for staff
    """
    TYPE = [
        [ "Single Appointment(Driver Only)Road", "Single Appointment (Driver Only)" ],
        [ "Road Test(DriverOnly)", "Road Test (Driver Only)" ],
    ]
    WEEK_CHOICES = [
        [ 'mon', 'Monday' ],
        [ 'tue', 'Tuesday' ],
        [ 'wed', 'Wednesday' ],
        [ 'thu', 'Thursday' ],
        [ 'fri', 'Friday' ],
        [ 'sat', 'Saturday' ],
        [ 'sun', 'Sunday' ],
    ]
    type = models.CharField(choices=TYPE, max_length=50)
    staff = models.ForeignKey("Users.Instructor", on_delete=models.CASCADE, related_name="appointment_staff")
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    date = models.DateField( )
    date_range = models.ForeignKey("DateRange", on_delete=models.CASCADE)
    week_range = ArrayField(models.CharField(choices=WEEK_CHOICES, max_length=15, default='mon'), default=list)
    slots = models.ManyToManyField(TimeRange, related_name="time_slot")
    pu_location = models.CharField(max_length=200)
    show_in_student_center = models.BooleanField(default=False)
    slot_duration = models.IntegerField(default=0, blank=True)
    slots_per_day = models.IntegerField(default=1, blank=False)

    def __str__(self):
        return f"{self.staff.username}\t{self.type}"


class Appointment(Status):
    """
    Assign slot for student
    """
    time_slot = models.ForeignKey("TimeSlot", on_delete=models.CASCADE)
    student = models.ManyToManyField("Users.Student", related_name='apt_students')

    class Meta:
        unique_together = [ 'time_slot', 'id' ]

    def __str__(self):
        return f"{self.time_slot.staff.username}\t{self.time_slot.type}"


@receiver((post_save, post_delete), sender=Appointment)
def handle_appointment_changes(sender, instance, created=False, **kwargs):
    time_slot = TimeSlot.objects.get(pk=instance.time_slot.id)

    if kwargs.get("signal") == post_delete:
        # Handle appointment deletion
        time_slot.status = "DELETED"
    elif created:
        # Handle appointment creation
        time_slot.status = "INACTIVE"

    # Save the time_slot if any status change occurred
    time_slot.save( )


# FIXME: VIDEO LESSONS SECTIONS
class VideoLecture(Extra, Status):
    video = models.FileField(upload_to="video/video_lessons", blank=True)
    theme = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    tests = models.ManyToManyField("VideoLectureTest", blank=True)
    _has_test = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.theme


class VideoLectureTest(models.Model):
    question = models.TextField( )
    answers = models.JSONField(blank=True)
    weight = models.PositiveSmallIntegerField(default=1)


class VideoLectureStudent(Extra):
    student = models.ForeignKey("Users.Student", on_delete=models.CASCADE, blank=False)
    video_lecture = models.ForeignKey("VideoLecture", on_delete=models.CASCADE, blank=False)
    answer = models.JSONField(blank=True)
    ball = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return f"{self.student.username} - {self.video_lecture.theme} - ball: {self.ball}"


class VideoLectureSection(Status, Extra):
    lectures = models.ManyToManyField("VideoLecture", related_name="section_lecture")
    text = models.TextField(blank=True)
    name = models.CharField(max_length=100, blank=False)
    student_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class VideoLectureSectionStudent(models.Model):
    student = models.ForeignKey("Users.Student", on_delete=models.CASCADE)
    section = models.ForeignKey("VideoLectureSection", on_delete=models.CASCADE)
    progress = models.PositiveSmallIntegerField(default=0)
    total_score = models.PositiveSmallIntegerField(default=0)

    class Meta:
        # Ensure that each student can only have a unique section entry
        constraints = [
            models.UniqueConstraint(fields=[ 'student', 'section' ], name='unique_student_section')
        ]


@receiver((post_save), sender=VideoLectureStudent)
def handle_appointment_changes(sender, instance, created=False, **kwargs):
    if created:
        from Users.models import Student
        student = Student.objects.get(pk=instance.student.id)
        video_lecture = VideoLecture.objects.get(pk=instance.video_lecture.id)
        video_lecture.views = video_lecture.views + 1
        section = VideoLectureSection.objects.filter(lectures=video_lecture).first( )

        # Step 2: If no such section exists, create a new VideoLectureSection
        if not section:
            section = VideoLectureSection.objects.create( )
            section.lectures.add(video_lecture)
            section.student_count = 1
            section.name = video_lecture.theme
        else:
            section.student_count = section.student_count + 1
        section_student,get = VideoLectureSectionStudent.objects.get_or_create(student=student, section=section)
        section_student.progress = section_student.progress+1
        section_student.total_score = section_student.total_score + instance.ball

        video_lecture.save()
        section.save()
        section_student.save()

