from common.constants import Constants
from common.models import Dataset


def list():

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
