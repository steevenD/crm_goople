import unittest
from django.test import TestCase
from crm_analyzer.views import GetStats
from crm_editor.views import CreateGetAllSale

class TestStringMethods(unittest.TestCase):

    def test_date_n_month(self):
        stats = GetStats()
        import datetime
        self.assertIsNotNone(stats.date_n_month(12))


    def test_get_attachment(self):
        getter  = CreateGetAllSale()
        getter.get(1)
        self.assertIsNotNone(getter.get(1))
    


if __name__ == '__main__':
    unittest.main()