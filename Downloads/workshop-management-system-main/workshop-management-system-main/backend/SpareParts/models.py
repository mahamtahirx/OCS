from django.db import models
from Vehicles.models import Vehicle

class SparePart(models.Model):
    name = models.CharField(max_length=100)
    part_number = models.CharField(max_length=100, unique=True)
    nomenclature = models.CharField(max_length=100)
    picture = models.ImageField(upload_to='spare_parts/', blank=True, null=True)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    contractor = models.CharField(max_length=100)
    make_type = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
    reorder_level = models.PositiveIntegerField(default=5)
    # is_available = models.BooleanField(default=True)
    location = models.CharField(max_length=100)
    origin = models.CharField(max_length=100,  default='Imported')

    def __str__(self):
        return f"{self.name} ({self.part_number})"

    def save(self, *args, **kwargs):
        #self.is_available = self.quantity > 0
        super().save(*args, **kwargs)


class IssueSparePart(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    spare_part = models.ForeignKey(SparePart, on_delete=models.CASCADE)
    quantity_used = models.PositiveIntegerField()
    issued_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.quantity_used} x {self.spare_part} for {self.vehicle}"
    
    def save(self, *args, **kwargs):
        # Prevent issuing more than available
        if self.pk is None:  # Only deduct on new issue, not on update
            if self.quantity_used > self.spare_part.quantity:
                raise ValueError("Not enough quantity available")

            # Deduct the quantity
            self.spare_part.quantity -= self.quantity_used
            self.spare_part.save()

        super().save(*args, **kwargs)

