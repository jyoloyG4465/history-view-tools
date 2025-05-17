from typing import Any

from common.models import Dataset
from common.utils.db_utils import get_dataset_channel_list, get_monthly_view_counts


def get_channel_list(dataset_id: int) -> dict[str, list]:

    dataset = Dataset.objects.filter(dataset_id=dataset_id).first()
    if dataset is None:

        return {"message": "GET no datasets"}

    table_name = dataset.table_name

    channel_list = get_dataset_channel_list(table_name)

    return {"data": channel_list}


def get_data(dataset_id: int, channel_name: str | None) -> dict[str, list]:
    dataset = Dataset.objects.filter(dataset_id=dataset_id).first()
    if dataset is None:

        return {"message": "GET no datasets"}

    table_name = dataset.table_name

    data = get_monthly_view_counts(table_name, channel_name)

    return data
