import uuid
from typing import Any

import pandas as pd
from common.constants import Constants
from common.models import Dataset
from common.utils.dataset_utils import DatasetUtils
from common.utils.db_utils import delete_app_data_table
from django.core.files.uploadedfile import UploadedFile
from django.db import transaction


def dataset_create(file: UploadedFile, dataset_name: str) -> dict[str, int]:

    try:
        with transaction.atomic():

            table_name = str(uuid.uuid4())
            df = pd.read_json(file)
            DatasetUtils.dataset_create(df, table_name)
            df_size = round(df.size / 1024 / 1024, 3)
            start_date = df["time"].min().date()
            end_date = df["time"].max().date()

            created_dataset = Dataset.objects.create(
                dataset_name=dataset_name,
                table_name=table_name,
                df_size=df_size,
                start_date=start_date,
                end_date=end_date,
            )
            return {Constants.KEY_DATASET_ID: created_dataset.dataset_id}
    except Exception as e:
        raise e


def get_list():

    datasets = Dataset.objects.all().order_by("dataset_id")
    if datasets is None:

        return {"message": "GET no datasets"}

    response = [
        {
            Constants.KEY_DATASET_ID: d.dataset_id,
            Constants.KEY_DATASET_NAME: d.dataset_name,
            Constants.KEY_START_DATE: d.start_date,
            Constants.KEY_END_DATE: d.end_date,
        }
        for d in datasets
    ]

    return response


def rename_dataset(dataset_id: int, dataset_name: str) -> dict[str, Any]:
    with transaction.atomic():
        dataset = Dataset.objects.select_for_update().get(dataset_id=dataset_id)
        dataset.dataset_name = dataset_name
        dataset.save()
    return


def delete_dataset(dataset_id: int) -> dict[str, Any]:
    dataset = Dataset.objects.filter(dataset_id=dataset_id).first()

    if dataset is None:
        return

    table_name = dataset.table_name
    delete_app_data_table(table_name)
    dataset.delete()
    return
