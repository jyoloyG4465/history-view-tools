from apps.analysis.v1 import services
from common.constants import Constants
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(["GET"])
def get_channel_list(request: Request):
    dataset_id = request.query_params.get(Constants.KEY_DATASET_ID)
    response = services.get_channel_list(dataset_id)

    return Response(response, status=status.HTTP_200_OK)


@api_view(["POST"])
def get_data(request: Request):
    dataset_id = request.data[Constants.KEY_DATASET_ID]
    channel_name = request.data.get(Constants.KEY_CHANNEL_NAME)
    response = services.get_data(dataset_id, channel_name)
    return Response(response, status=status.HTTP_200_OK)
