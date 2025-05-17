from common.models import Dataset
from common.utils.db_utils import DbUtils


def get_channel_list(dataset_id: int) -> dict[str, list]:
    dataset = Dataset.objects.get(dataset_id=dataset_id)
    table_name = dataset.table_name
    channel_list = DbUtils.get_dataset_channel_list(table_name)
    return {"data": channel_list}


def get_data(dataset_id: int, channel_name: str | None) -> dict[str, list]:
    dataset = Dataset.objects.get(dataset_id=dataset_id)
    table_name = dataset.table_name
    data = DbUtils.get_monthly_view_counts(table_name, channel_name)
    return {"data": data}
