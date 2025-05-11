from django.db import models
from django.utils import timezone


class Dataset(models.Model):
    dataset_id = models.AutoField(primary_key=True)
    dataset_name = models.CharField(max_length=100)
    table_name = models.CharField(max_length=100)
    df_size = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        app_label = "apps"

    def create(self, *args, **kwargs):
        # タイムゾーンを取り除いてローカルタイムに変換
        if self.created_at:
            self.created_at = timezone.localtime(self.created_at).replace(tzinfo=None)
        super().save(*args, **kwargs)
