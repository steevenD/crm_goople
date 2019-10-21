from django.shortcuts import render
from crm_editor.serializers import SaleSerializer, SchoolSerializer
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.parsers import JSONParser
from .models import Sale, School

# Create your views here.
class CreateGetAllSale(generics.CreateAPIView):
    #todo must be authenticate permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.AllowAny,)
    @parser_classes((JSONParser,)) 
    def post(self, request):
        schoolSerializer = SchoolSerializer(data=request.data['school'])
        if schoolSerializer.is_valid():
            schoolSerializer.save()

            lastInsert = School.objects.latest('id').id
            request.data['school'] = lastInsert
            serializer = SaleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

    def get(self, request):
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales, many=True)

        for saleSerializer in serializer.data :
            idSchool = saleSerializer['school']
            if idSchool:
                school = School.objects.get(pk=idSchool)
                toReturn = saleSerializer
                schoolSerializer = SchoolSerializer(school)
                toReturn['school'] = schoolSerializer.data
        
        return Response(serializer.data)

class UpdateGetDeleteSale(generics.CreateAPIView):
    
    #todo must be authenticate permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.AllowAny,)
    @parser_classes((JSONParser,)) 

    def get(self, request, pk):
        sale = Sale.objects.get(pk=pk)
        idSchool = sale.school.id
        school = School.objects.get(pk=idSchool)

        serializer = SaleSerializer(sale)
        schoolSerializer = SchoolSerializer(school)

        toReturn = serializer.data
        toReturn['school'] = schoolSerializer.data

        return Response(toReturn)

    def put(self, request, pk):
        sale = Sale.objects.get(pk=pk)

        idSchool = Sale.objects.get(pk=pk).school.id
        school = School.objects.get(pk=idSchool)

        schoolSerializer = SchoolSerializer(school, data=request.data['school'])
        if schoolSerializer.is_valid():
            schoolSerializer.save()

        request.data['school'] = idSchool
        serializer = SaleSerializer(sale, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        print("rrrrr")
        print(pk)
        # idSchool = Sale.objects.get(pk=pk).school.id
        # school = School.objects.get(pk=idSchool)
        # school.delete()

        sale = Sale.objects.get(pk=pk)
        sale.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)