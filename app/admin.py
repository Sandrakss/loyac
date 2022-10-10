from django.contrib import admin
from .models import Program, ProgramEnrollment


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['program_name', 'from_date',
                    'to_date', 'from_age', 'to_age']
    search_fields = ['program_name']
    list_filter = ['created_at']
    list_per_page = 25


@admin.register(ProgramEnrollment)
class ProgramEnrollmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'program', 'user', 'created_at', 'status']
    list_filter = ['status', 'created_at']
    list_per_page = 25
