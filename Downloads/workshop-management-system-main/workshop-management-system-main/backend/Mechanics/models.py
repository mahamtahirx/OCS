from django.db import models
from datetime import date
from Vehicles.models import Vehicle, VehicleHistory

class Mechanic(models.Model):
    name = models.CharField(max_length=100)
    trade = models.CharField(max_length=100)
    skill_lvl = models.CharField(max_length=100)
    join_date = models.DateField()
    left_date = models.DateField(null=True, blank=True)
    svc_yrs = models.PositiveIntegerField(editable=False, default=0)
    meno = models.CharField(max_length=100, unique=True)

    def save(self, *args, **kwargs):
        end_date = self.left_date or date.today()
        self.svc_yrs = end_date.year - self.join_date.year - (
            (end_date.month, end_date.day) < (self.join_date.month, self.join_date.day)
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class MechanicAttendance(models.Model):
    mechanic = models.ForeignKey(Mechanic, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Leave', 'Leave'),
    ])

    def __str__(self):
        return f"{self.mechanic.name} - {self.date} - {self.status}"

class MechanicPerformance(models.Model):
    mechanic = models.ForeignKey(Mechanic, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    fault_description = models.TextField()
    date = models.DateField()
    rating = models.PositiveIntegerField(null=True, blank=True)  # optional rating out of 5 or 10
    duration_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # optional
    history_entry = models.ForeignKey(VehicleHistory, on_delete=models.SET_NULL, null=True, blank=True)


    def __str__(self):
        return f"{self.mechanic.name} - {self.vehicle.bano} - {self.date}"
