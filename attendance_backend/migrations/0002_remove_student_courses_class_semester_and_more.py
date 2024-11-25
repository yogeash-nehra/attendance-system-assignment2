# Generated by Django 5.1.3 on 2024-11-19 09:54

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendance_backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='courses',
        ),
        migrations.AddField(
            model_name='class',
            name='semester',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='attendance_backend.semester'),
        ),
        migrations.AddField(
            model_name='collegeday',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='credits',
            field=models.IntegerField(default=3),
        ),
        migrations.AddField(
            model_name='student',
            name='enrollment_date',
            field=models.DateField(auto_now_add=True, default=datetime.date(2024, 11, 19)),
            preserve_default=False,
        ),
    ]