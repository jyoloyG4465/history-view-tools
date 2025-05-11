from apps.dataset.v1 import services
from common.constants import Constants
from common.models import Dataset
from django.core.files.uploadedfile import UploadedFile
from django.http import JsonResponse
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
        response = services.dataset_create(file, dataset_name)
    except:
        return Response(
            {"error": "ファイル取り込みに失敗しました"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(response, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_list(_: Request):
    response = services.get_list()
    return Response(response, status=status.HTTP_200_OK)


@api_view(["PUT"])
def rename(request: Request):
    dataset_id = request.data[Constants.KEY_DATASET_ID]
    dataset_name = request.data[Constants.KEY_DATASET_NAME]
    services.rename_dataset(dataset_id, dataset_name)
    return Response({}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def delete(request: Request):
    dataset_id = request.query_params.get(Constants.KEY_DATASET_ID)
    services.delete_dataset(dataset_id)
    return Response({}, status=status.HTTP_204_NO_CONTENT)
