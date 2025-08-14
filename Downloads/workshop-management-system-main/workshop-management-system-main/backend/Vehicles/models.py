from django.db import models

class Vehicle(models.Model):
    bano = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=100)
    maketype = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    modelyear = models.PositiveIntegerField()
    civil_reg_no = models.CharField(max_length=100)
    entry_datetime = models.DateTimeField(null=True, blank=True)
    exit_datetime = models.DateTimeField(null=True, blank=True)
    nomenclature = models.CharField(max_length=100)
    # entry_milometer = models.PositiveIntegerField()
    # exit_milometer = models.PositiveIntegerField()
    # entry_fuel = models.PositiveIntegerField()
    # exit_fuel = models.PositiveIntegerField()
    driver = models.CharField(max_length=100)
    driver_contact = models.PositiveIntegerField()
    officer = models.CharField(max_length=100)
    officer_rank = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.maketype} {self.model} ({self.bano})"

class VehicleHistory(models.Model):
    STATUS_CHOICES = [
        ('in', 'In'),
        ('in_process', 'In Process'),
        ('out', 'Out'),
    ]
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='history')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

