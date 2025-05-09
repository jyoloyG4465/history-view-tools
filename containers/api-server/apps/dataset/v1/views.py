from apps.dataset.v1 import services
from common.constants import Constants
from common.models import Dataset
from django.core.files.uploadedfile import UploadedFile
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(["POST"])
def create(request: Request):
    file = request.FILES[Constants.FILE]
    dataset_name = request.data[Constants.KEY_DATASET_NAME]

    if not isinstance(file, UploadedFile):
        raise TypeError("無効なファイル型です")

    try:
        services.dataset_create(file, dataset_name)
    except:
        return Response(
            {"error": "ファイル取り込みに失敗しました"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_list(_: Request):
    response = services.get_list()
    return Response(response=response, status=status.HTTP_200_OK)


@api_view(["PUT"])
def rename(request: Request):
    dataset_id = request.data[Constants.KEY_DATASET_ID]
    dataset_name = request.data[Constants.KEY_DATASET_NAME]
    dataset = Dataset.objects.filter(dataset_id=dataset_id).first()
    if dataset is None:
        return Response({"message": "PUT no datasets"}, status=status.HTTP_200_OK)

    dataset.dataset_name = dataset_name
    dataset.save()
    return Response({"message": "PUT request received"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def delete(request: Request):
    dataset_id = request.query_params.get(Constants.KEY_DATASET_ID)
    dataset = Dataset.objects.filter(dataset_id=dataset_id).first()
    if dataset is None:
        return Response({"message": "DELETE no datasets"}, status=status.HTTP_200_OK)
    dataset.delete()
    return Response(
        {"message": "DELETE request received"}, status=status.HTTP_204_NO_CONTENT
    )
