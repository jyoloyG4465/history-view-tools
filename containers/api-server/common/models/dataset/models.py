from django.db import models


class Dataset(models.Model):
    dataset_id = models.AutoField(primary_key=True)
    dataset_name = models.CharField(max_length=100)
    size = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = "apps"
