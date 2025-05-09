import uuid

from common.constants import Constants
from common.models import Dataset
from common.utils.dataset_utils import DatasetUtils
from django.core.files.uploadedfile import UploadedFile
from django.db import transaction


def dataset_create(file: UploadedFile, dataset_name: str):

    try:
        with transaction.atomic():

            table_name = str(uuid.uuid4())
            DatasetUtils.dataset_create(file, table_name)
            size = round(file.size / 1024 / 1024, 3)

            Dataset.objects.create(
                dataset_name=dataset_name, table_name=table_name, size=size
            )
    except Exception as e:
        raise e


def get_list():

    datasets = Dataset.objects.all()
    if datasets is None:

        return {"message": "GET no datasets"}

    response = [
        {
            Constants.KEY_DATASET_ID: d.dataset_id,
            Constants.KEY_DATASET_NAME: d.dataset_name,
        }
        for d in datasets
    ]

    return response
