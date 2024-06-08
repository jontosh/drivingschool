import os
import sys
from django.core.management.base import BaseCommand, CommandError
from django.db import connection, transaction

class Command(BaseCommand):
    help = 'Execute a raw SQL command'

    def add_arguments(self, parser):
        parser.add_argument('sql', type=str, help='The SQL command to execute')

    def handle(self, *args, **options):
        sql = options['sql']
        try:
            with connection.cursor() as cursor:
                cursor.execute(sql)
                # If it's a SELECT query, fetch the results
                if sql.strip().lower().startswith('select'):
                    results = cursor.fetchall()
                    for row in results:
                        self.stdout.write(str(row)+'\n\n')
                else:
                    # Commit the transaction if it's not a SELECT query
                    transaction.commit()
                    self.stdout.write(self.style.SUCCESS('Successfully executed SQL command'))
        except Exception as e:
            raise CommandError(f'Error executing SQL command: {e}')
