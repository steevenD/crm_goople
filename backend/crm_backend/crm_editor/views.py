from django.shortcuts import render
from crm_editor.serializers import SaleSerializer, SchoolSerializer, AttachmentSerializer
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from .models import Sale, School, Attachment
from django.core.files.base import ContentFile
import json
import base64
import uuid
import datetime

# Create your views here.
class CreateGetAllSale(generics.CreateAPIView):
    #todo must be authenticate permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    permission_classes = (permissions.AllowAny,)
    @parser_classes((JSONParser, FormParser, MultiPartParser)) 


    def post(self, request):

        schoolSerializer = SchoolSerializer(data=request.data['saleShare']['school'])
        if schoolSerializer.is_valid():
            schoolSerializer.save()
            data = ""
            lastInsert = School.objects.latest('id').id
            request.data['saleShare']['school'] = lastInsert
            serializer = SaleSerializer(data=request.data['saleShare'])

            request.data['saleShare']['dt_created'] = datetime.datetime.now()

            if serializer.is_valid():
                serializer.save()
                lastSale = Sale.objects.latest('id').id

                if request.data['attachments']:
                    for attachment in request.data['attachments']:
                        file_obj = attachment['file']

                        if 'data:' in file_obj and ';base64,' in file_obj:
                            header, data = file_obj.split(';base64,')

                        try:
                            decoded_file = base64.b64decode(file_obj)

                        except TypeError:
                            self.fail('invalid_image')
                        
                        d = data
                        # file_name = attachment['name'] + str(uuid.uuid4())[:12] # 12 characters are more than enough.
                        file_name = attachment['name']
                        complete_file_name = "%s" % (file_name)
                        data = ContentFile(decoded_file, name=complete_file_name)
                        print(d)

                        request.data['attachments'] = {
                            'attachment': data,
                            'sale': lastSale
                        }
                        attachmentSerializer = AttachmentSerializer(data=request.data['attachments'])
                        print(attachmentSerializer.is_valid())
                        if attachmentSerializer.is_valid():
                            attachmentSerializer.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
        print(request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
       
        # idSchool = Sale.objects.get(pk=pk).school.id
        # school = School.objects.get(pk=idSchool)
        # school.delete()

        sale = Sale.objects.get(pk=pk)
        sale.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GetDeleteAttachments(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    @parser_classes((JSONParser,)) 

    def get(self, request, idSale):
     
        listAttachments = Attachment.objects.filter(sale_id=idSale)
        toReturn = []
        for a in listAttachments:
            d = AttachmentSerializer(a).data

            name = d["attachment"]
            with open(d["attachment"], "rb") as pdf_file:
                encoded_string = base64.b64encode(pdf_file.read())
                a = encoded_string
                d["attachment"] = a
                d["name"] = name
                toReturn.append(d)

        return Response(toReturn, content_type="application/json")


    def delete(self, request, idSale):

        attachment = Attachment.objects.get(pk=idSale)
        attachment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)