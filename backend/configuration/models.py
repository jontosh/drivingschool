from django.core.validators import MinValueValidator, MaxValueValidator, StepValueValidator
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from colorfield.fields import ColorField
from scheduling.models import Weekday
import uuid
from abstracts.models import Extra,Status
# Create your models here.
class CompanyInfo(models.Model):
    id = models.UUIDField(auto_created=True,primary_key=True)
    name = models.CharField(max_length=200)
    owner_name = models.CharField(max_length=200)
    address = models.TextField()
    city = models.CharField(max_length=200, blank=True, null=True)
    zip = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField()
    cell_phone = models.CharField(blank=True,null=True)
    fax = models.TextField(blank=True)
    extra = models.JSONField(blank=True)
    url = models.TextField()
    notes = models.TextField(blank=True)
    def save(self, *args, **kwargs):
        if not self.id:
            self.id = uuid.uuid4()
        super().save(*args, **kwargs)

class WebContent(models.Model):
    title = models.CharField(max_length=200)
    rest_url = models.URLField()
    content = models.TextField(blank=True)
    note = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    def __str__(self):
        return self.title

class ZipCode(models.Model):
    zip_code = models.IntegerField(blank=True)
    def __str__(self):
        return str(self.zip_code)

class StorageManagement(models.Model):
    id = models.UUIDField(primary_key=True)
    last_datetime=models.DateField(auto_now_add=True)
    used = models.IntegerField(default=0)
    upload_month = models.IntegerField(default=0)
    download_month = models.IntegerField(default=0)
    number_files = models.IntegerField(default=0)
    storage = models.IntegerField(default=0)
    unit = models.CharField(max_length=10)
    def __str__(self):
        return f"{self.storage}{self.unit}"

class EmergencyData(models.Model):
    name = models.CharField(max_length=200)
    data = models.JSONField()
    note = models.TextField(blank=True)
    def __str__(self):
        return self.name


class MessageItems(models.Model):
    message = models.ForeignKey("Messages",on_delete=models.CASCADE)
    from_object_id = models.IntegerField()
    from_content_type = models.ForeignKey(
        ContentType,
        on_delete=models.PROTECT,
    )
    from_user = GenericForeignKey(
        'from_content_type',
        'from_object_id',
    )

class Messages(models.Model):
    STATUS = [
        ["SEEN", "SEEN"],
        ["DELETED", "DELETED"],
        ["UNREAD", "UNREAD"]
    ]
    student = models.ForeignKey("Users.Student",related_name="student1_message",on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS,max_length=30,default="UNREAD")
    def add_item(self, user) -> 'MessageItems':
        from_content_type = ContentType.objects.get_for_model(user)
        return MessageItems.objects.create(
            message = self,
            from_content_type=from_content_type,
            from_object_id=user.pk,
        )

class PasswordManagement(models.Model):
    has_2AF = models.BooleanField(default=False)
    usertype = models.ForeignKey("Users.UserType",on_delete=models.CASCADE)
    remember_password = models.IntegerField(default=0,help_text="How many we should remember")
    age = models.SmallIntegerField(default=0,verbose_name="Max Password Age Policy")
    min_length = models.SmallIntegerField(default=5,verbose_name="Min Password Length Policy")
    reset_password_link = models.SmallIntegerField(default=4,verbose_name="Reset Password Link Age (Hours) Policy")
    lower = models.BooleanField(default=False)
    upper = models.BooleanField(default=False)
    number = models.BooleanField(default=False)
    symbol = models.BooleanField(default=False)
    re_capcha = models.BooleanField(default=False)
    staff_2AF = models.BooleanField(default=False,verbose_name="Enable Two Factor Authentication (2FA) for Staff")
    admin_2AF = models.BooleanField(default=False,verbose_name="Enable Two Factor Authentication (2FA) for Admin")
    email_2AF = models.BooleanField(default=False, verbose_name="Enable Two Factor Authentication (2FA) using Email")
    OTP_expire = models.SmallIntegerField(default=5,verbose_name="OTP Expires After (Minutes)")
    OTP_expire_after = models.SmallIntegerField(default=5,verbose_name="OTP Expires After (Minutes)")
    request_new_OTP = models.SmallIntegerField(default=60,verbose_name="Able to Request New Code After (Seconds)")
    limit_attemp = models.BooleanField(default=False,verbose_name="Limit OTP Login Attempts?")
    limit_OTP = models.SmallIntegerField(default=3,verbose_name="OTP Attempt Limit")
    incorrect_limit = models.SmallIntegerField(default=3,verbose_name="Incorrect OTP Attempt Limit")

class GraphicalScheduleSetting(models.Model):
    SCHEDULE_VIEW = [
        ["Day","Day"],
        ["Week", "Week"],
        ["Work Week ", "Work Week "],
        ["Month", "Month"],
        ["Agenda", "Agenda"],
        ["Timeline", "Timeline"],
    ]
    calendar_open_slot = ColorField(default='#FF0000',verbose_name="Calendar Open Slots Available")
    calendar_all_slot_booked = ColorField(default='#FF0000',verbose_name="All Open Slots Booked")
    appointment_open_slot = ColorField(default='#FF0000',verbose_name="Appointment Open Slots Available")
    appointment_confirmed_slot = ColorField(default='#FF0000',verbose_name="Appointment Confirmed Slot Color")
    appointment_completed_slot = ColorField(default='#FF0000',verbose_name="Appointment Complete Slot Color")
    appointment_no_show_slot = ColorField(default='#FF0000',verbose_name="Appointment No Show Appointment Color")
    appointment_pending_slot = ColorField(default='#FF0000',verbose_name="Appointment Pending Slot Color")
    appointment_late_slot = ColorField(default='#FF0000',verbose_name="Appointment Late Cancelled Slot Color")
    appointment_class_apt_slot = ColorField(default='#FF0000',verbose_name="Appointment Classroom Appointment Color")
    appointment_staff_unavailable_slot = ColorField(default='#FF0000',verbose_name="Appointment Staff Unavailability Color")
    schedule_row_height = models.IntegerField(default=25,verbose_name="Scheduler Row Height")
    week_start = models.CharField(max_length=30,choices=Weekday,default="MON")
    schedule_view = models.CharField(max_length=30,choices=SCHEDULE_VIEW,default="Day")
    #TODO: Student Detail Settings
    #TODO: Instructor Detail Settings
    #TODO: Multi Instructor: Staff Default Display & Order of Display
class Instructions(models.Model):
    description = models.TextField()
    def __str__(self):
        return self.description
class GeneralSetting(models.Model):
    CHOICES = [
        ["Settings From Staff Info","Settings From Staff Info"],
        ["Settings From Location Info","Settings From Location Info"],
        ["Settings From Vehicle Info","Settings From Vehicle Info"],
    ]
    zip_coverage_filter = models.BooleanField(default=False,verbose_name="Enable Zip Code Coverage Filter")
    location_coverage_filter = models.BooleanField(default=False,verbose_name="Enable Location Coverage Filter")
    default_filter = models.CharField(choices=[["Location","Location"],["ZipCode","ZipCode"]],max_length=20)
    show_instructions = models.BooleanField(default=False,verbose_name="Show Instructions")
    instructions =models.ManyToManyField("Instructions",related_name="instructions_setting")
    show_student = models.BooleanField(default=False,verbose_name="Show Student Appnt. Observation Selection")
    page_size = models.SmallIntegerField(verbose_name="Page Size For Appts")
    is_cancellation_chargeable = models.BooleanField(default=False,verbose_name="Cancellation Chargeable")#No Show Charges
    not_show_chargeable = models.BooleanField(default=False,verbose_name="No Show Chargeable")
    cancellation = models.IntegerField(default=False,verbose_name="Cancellation Hours")
    cancellation_charge = models.IntegerField(default=False,verbose_name="Cancellation Charges ($)")
    no_show_charge = models.IntegerField(default=False,verbose_name="No Show Charges ($)")
    show_location = models.BooleanField(verbose_name="Show Locatio",default=False)
    can_late_cancellation = models.BooleanField(default=False,verbose_name="Apply Late Cancellation Charges (Observer Only)")
    can_late_cancellation = models.BooleanField(default=False,verbose_name=" Cancellation Charges (Observer Only)")
    single_instructor_view = models.CharField(max_length=50, choices=CHOICES, blank=False)
    multi_instructors_view = models.CharField(max_length=50, choices=CHOICES, blank=False)
    single_location_view = models.CharField(max_length=50, choices=CHOICES, blank=False)
    multi_vehicle_view = models.CharField(max_length=50, choices=CHOICES, blank=False)
    create_combined_appointment = models.BooleanField(default=False, verbose_name="CreateCombinedAppointment(Driver and Observer)")
    create_single_appointment_d_o = models.BooleanField(default=False, verbose_name="CreateSingleAppointment(Driver and Observer)")
    create_single_appointment_d = models.BooleanField(default=False, verbose_name="CreateSingleAppointment(DriverOnly)")
    create_road_test = models.BooleanField(default=False, verbose_name="CreateRoadTest(DriverOnly)")
    create_open_time_slot = models.BooleanField(default=False, verbose_name="CreateOpenTimeSlot")
    create_single_student_appointment = models.BooleanField(default=False, verbose_name="CreateSingleStudentAppointment(Driver and Observer)")
    create_single_appointment_o = models.BooleanField(default=False, verbose_name="CreateSingleAppointment(ObserverOnly)")
    schedule_multiple_appointments = models.BooleanField(default=False, verbose_name="ScheduleMultipleAppointments")
    allowdouble_bookfor_vehicle = models.BooleanField(default=False, verbose_name="AllowdoubleBookforVehicle")
    allowdouble_bookfor_instructor = models.BooleanField(default=False, verbose_name="AllowdoubleBookforInstructor")
    add_staff_unavailability = models.BooleanField(default=False, verbose_name="AddStaffUnavailability")
    show_staff_detail = models.BooleanField(default=False, verbose_name="ShowStaffDetail")
    show_pickup_dropoff = models.BooleanField(default=False, verbose_name="ShowPickup / Dropoff")
    time_vehicleis_mandatory = models.BooleanField(default=False, verbose_name="TimeVehicleisMandatory")
    show_complete_status = models.BooleanField(default=False, verbose_name="ShowCompleteStatus")
    locationis_mandatory = models.BooleanField(default=False, verbose_name="LocationisMandatory")
    pickup_locationis_mandatory = models.BooleanField(default=False, verbose_name="PickupLocationisMandatory")
    show_dropoff_location = models.BooleanField(default=False, verbose_name="ShowDropoffLocation")
    show_late_cancel_appointments = models.BooleanField(default=False, verbose_name="ShowLateCancelAppointments")
    highlight_current_time = models.BooleanField(default=False, verbose_name="HighlightCurrentTime")
    show_previous_lesson_notes = models.BooleanField(default=False, verbose_name="ShowPreviousLessonNotes")
    search_student_by_name_or_by_classroom = models.BooleanField(default=False, verbose_name="SearchStudentByNameOrByClassroom")
    show_product_matching_graphical_scheduler = models.BooleanField(default=False, verbose_name="ShowProductMatching(GraphicalScheduler)")
    product_matching_graphical_scheduleris_mandatory = models.BooleanField(default=False, verbose_name="ProductMatching(GraphicalScheduler)isMandatory")
    allow_pendingstatusappointmentswithoutstudentassisgned = models.BooleanField(default=False, verbose_name="AllowPendingstatusappointmentswithoutstudentassisgned")
    allow_confirmedstatusappointmentswithoutstudentassisgned = models.BooleanField(default=False, verbose_name="AllowConfirmedstatusappointmentswithoutstudentassisgned")
    AllowWebstatusappointmentswithoutstudentassisgned = models.BooleanField(default=False,verbose_name="AllowWebstatusappointmentswithoutstudentassisgned")
    spliter_width = models.IntegerField(default=150,validators=[
            MinValueValidator(150),
            MaxValueValidator(450),
        ])
    combined_appointment = models.IntegerField(default=15,validators=[
            MinValueValidator(15),
            MaxValueValidator(240),
            StepValueValidator(15)
        ])
    single_appointment_d_o = models.IntegerField(default=15, validators=[
        MinValueValidator(15),
        MaxValueValidator(180),
        StepValueValidator(15)
    ])
    single_appointment_d = models.IntegerField(default=15, validators=[
        MinValueValidator(15),
        MaxValueValidator(180),
        StepValueValidator(15)
    ])
    read_test = models.IntegerField(default=15, validators=[
        MinValueValidator(15),
        MaxValueValidator(180),
        StepValueValidator(15)
    ])
    single_student_appointment_d = models.IntegerField(default=15, validators=[
        MinValueValidator(15),
        MaxValueValidator(180),
        StepValueValidator(15)
    ])
    single_student_appointment_o = models.IntegerField(default=15, validators=[
        MinValueValidator(15),
        MaxValueValidator(180),
        StepValueValidator(15)
    ])
    single_student_appointment_observ_only = models.IntegerField(default=15, validators=[
        MinValueValidator(15),
        MaxValueValidator(180),
        StepValueValidator(15)
    ])
class Fields(models.Model):
    app_name = models.CharField(max_length=50)
    model_name = models.CharField(max_length=50,blank=True,null=True)
    field_name = models.CharField(max_length=50,blank=True,null=True)

class Rights(models.Model):
    has_add_new = models.BooleanField(default=False)
    has_edit_page = models.BooleanField(default=False)
    has_view_page = models.BooleanField(default=False)
    has_delete_record = models.BooleanField(default=False)
    has_read_own = models.BooleanField(default=False)
    has_read_all = models.BooleanField(default=False)
    field = models.ForeignKey("Fields",on_delete=models.CASCADE)

class Expanses(Extra):
    Status = [
        ["ACTIVE", "ACTIVE"],
        ["DELETED", "DELETED"],
        ["PAID", "PAID"]
    ]
    status = models.CharField(choices=Status, default="INACTIVE", max_length=15)
    amount = models.IntegerField()
    data = models.DateTimeField(auto_now_add=True,blank=True)
    name = models.CharField(max_length=200)
    def __str__(self):
        return  self.name
