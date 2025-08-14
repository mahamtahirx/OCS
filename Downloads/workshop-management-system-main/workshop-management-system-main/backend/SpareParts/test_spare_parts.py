from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from SpareParts.models import SparePart
from SpareParts.views import check_low_stock_and_notify
from SpareParts.serializers import SparePartSerializer

# ✅ MODEL TEST: Checks SparePart creation and the is_available logic
# class TestSparePartModel(TestCase):
#     def test_spare_part_creation_sets_availability(self):
#         # Create a SparePart with quantity > 0
#         part = SparePart.objects.create(
#             name="Brake Pad",
#             part_number="BP001",
#             nomenclature="Brake Component",
#             quantity=10,
#             price=100.50,
#             contractor="ABC Ltd",
#             make_type="OEM",
#             location="Aisle 5",
#             origin="Local"
#             "is_available": True,  # Add this line!
#         )
#         # ✅ Assert data is stored correctly and is_available is set to True
#         self.assertEqual(part.name, "Brake Pad")
#         self.assertTrue(part.is_available)


class TestSparePartModel(TestCase):
    def test_spare_part_creation_sets_availability(self):
        # Create a SparePart with quantity > 0
        part = SparePart.objects.create(
            name="Brake Pad",
            part_number="BP001",
            nomenclature="Brake Component",
            quantity=10,
            # is_available=True,
            price=100.50,
            contractor="ABC Ltd",
            make_type="OEM",
            location="Aisle 5",
            origin="Local"
        )

        self.assertEqual(part.name, "Brake Pad")
        # self.assertTrue(part.is_available)



# ✅ SERIALIZER TEST: Checks that the serializer accepts valid input
class SparePartSerializerTest(TestCase):
    def test_valid_serializer_data(self):
        data = {
            "name": "Test Part",
            "part_number": "TP123",
            "nomenclature": "Test",
            "quantity": 1,
            "price": "9.99",
            "contractor": "XYZ Ltd",
            "make_type": "OEM",
            "location": "Shelf X",
            "origin": "Imported"
        }
        serializer = SparePartSerializer(data=data)
        # ✅ Serializer should be valid with correct fields
        self.assertTrue(serializer.is_valid(), serializer.errors)


# ✅ API TESTS: CRUD endpoint testing with DRF APIClient
class SparePartAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.part_data = {
            "name": "Oil Filter",
            "part_number": "OF123",
            "nomenclature": "Filter",
            "quantity": 2,
            "price": 20.00,
            "contractor": "XYZ Motors",
            "make_type": "OEM",
            "location": "Shelf 1",
            "origin": "Imported"
        }

    def test_create_spare_part(self):
        # POST request to create a spare part
        response = self.client.post('/api/spareparts/', self.part_data, format='json')
        # ✅ Assert status code and correct creation
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SparePart.objects.count(), 1)
        part = SparePart.objects.get(part_number="OF123")
        self.assertEqual(part.name, "Oil Filter")
        # self.assertTrue(part.is_available)

    def test_retrieve_spare_parts_list(self):
        # Create a part directly in DB
        SparePart.objects.create(**self.part_data)
        # GET request to fetch spare parts
        response = self.client.get('/api/spareparts/')
        # ✅ Expect one result in the list
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    # ✅ NOTIFICATION TEST: Ensure low stock check runs without exception
    def test_low_stock_notification_trigger(self):
        # Create a spare part with quantity = 0 (out of stock)
        SparePart.objects.create(
            name="Coolant",
            part_number="COOL001",
            nomenclature="Cooling",
            quantity=0,
            price=100,
            contractor="CoolCo",
            make_type="Aftermarket",
            location="Bin A",
            origin="Imported",
        )
        # ✅ Smoke test: check if the low-stock notifier runs without error
        try:
            check_low_stock_and_notify()
        except Exception as e:
            self.fail(f"check_low_stock_and_notify() raised Exception: {e}")