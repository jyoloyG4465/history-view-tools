from django.db import models

class Book(models.Model):
    book_id = models.AutoField(primary_key=True) 
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date = models.DateField()

    class Meta:
        app_label = 'apps'