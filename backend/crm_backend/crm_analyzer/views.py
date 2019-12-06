from django.shortcuts import render
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework import generics, permissions
from rest_framework.decorators import parser_classes
from crm_editor.serializers import SaleSerializer
from crm_analyzer.serializers import ObjectifSerializer
from crm_editor.models import Sale
from .models import Objectif
from rest_framework import status

from rest_framework.response import Response


from datetime import datetime, date

# Create your views here.
class GetStats(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    @parser_classes((JSONParser,)) 

    def get(self, request):
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales, many=True)

        sale_in_six_month = []
        month_1 = []
        month_2 = []
        month_3 = []
        month_4 = []
        month_5 = []
        month_6 = []

        for sale in serializer.data: 
            if (self.date_n_month(6) < datetime.strptime(sale["dt_created"][:10], "%Y-%m-%d").date()):
                sale_in_six_month.append(sale)

        for s in sale_in_six_month :
            

            if self.date_n_month(0).strftime("%Y-%m") == (datetime.strptime(sale["dt_created"][:7], "%Y-%m")).strftime("%Y-%m"):
                month_1.append(s)
            if self.date_n_month(1).strftime("%Y-%m") == (datetime.strptime(sale["dt_created"][:7], "%Y-%m")).strftime("%Y-%m"):
                month_2.append(s)
            if self.date_n_month(2).strftime("%Y-%m") == (datetime.strptime(sale["dt_created"][:7], "%Y-%m")).strftime("%Y-%m"):
                month_3.append(s)
            if self.date_n_month(3).strftime("%Y-%m") == (datetime.strptime(sale["dt_created"][:7], "%Y-%m")).strftime("%Y-%m"):
                month_4.append(s)
            if self.date_n_month(4).strftime("%Y-%m") == (datetime.strptime(sale["dt_created"][:7], "%Y-%m")).strftime("%Y-%m"):
                month_5.append(s)
            if self.date_n_month(5).strftime("%Y-%m") == (datetime.strptime(sale["dt_created"][:7], "%Y-%m")).strftime("%Y-%m"):
                month_6.append(s)

        

        toRet = [
            self.return_object_by_month(month_1, self.date_n_month(0).strftime("%Y-%m")),
            self.return_object_by_month(month_2, self.date_n_month(1).strftime("%Y-%m")),
            self.return_object_by_month(month_3, self.date_n_month(2).strftime("%Y-%m")),
            self.return_object_by_month(month_4, self.date_n_month(3).strftime("%Y-%m")),
            self.return_object_by_month(month_5, self.date_n_month(4).strftime("%Y-%m")),
            self.return_object_by_month(month_6, self.date_n_month(5).strftime("%Y-%m"))
        ]

        
        return Response(toRet)

    def return_object_by_month(self, sale_month, month):
        objectif = {
            'month': month,
            'nb_contact': self.first_contact_by_month(sale_month),
            'earned_sales': self.won_by_month(sale_month),
            'renounced_sales': self.abandonment_by_month(sale_month),
            'signed_sales': self.amount_signed_by_month(sale_month)
        }
        return objectif

    def amount_signed_by_month(self, sale_month):
        toReturn = 0
        for s in sale_month:
            if s['amount_signed']:
                toReturn = toReturn + s['amount_signed']
        return toReturn

    def abandonment_by_month(self, sale_month):
        toReturn = 0
        for s in sale_month:
            if s['sale_state'] == 'ABANDONMENT':
                toReturn = toReturn + 1
        return toReturn

    def first_contact_by_month(self, sale_month):
        toReturn = 0
        for s in sale_month:
            if s['sale_state'] == 'FIRST_CONTACT':
                toReturn = toReturn + 1
        return toReturn
        
    def won_by_month(self, sale_month):
        toReturn = 0
        for s in sale_month:
            if s['sale_state'] == 'WON':
                toReturn = toReturn + 1
        return toReturn

    def date_n_month(self, n):
        import datetime
        return datetime.date.today() - datetime.timedelta(n*365/12)

class UpdateGoal(generics.CreateAPIView):
            
    #todo must be authenticate permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.AllowAny,)
    @parser_classes((JSONParser, FormParser, MultiPartParser)) 
    def put(self, request, id_goal):
        objectif = Objectif.objects.get(pk=id_goal)

        serializer = ObjectifSerializer(objectif, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetGoals(generics.CreateAPIView):
    
    #todo must be authenticate permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.AllowAny,)
    @parser_classes((JSONParser, FormParser, MultiPartParser)) 
    def get(self, request):
        goals = Objectif.objects.all()
        serializer = ObjectifSerializer(goals, many=True)
        return Response(serializer.data)
