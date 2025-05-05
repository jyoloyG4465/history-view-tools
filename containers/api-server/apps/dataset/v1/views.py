from common.models import Dataset
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response


@api_view(["POST"])
def create(request: Request):
    if request.method == "POST":
        dataset_name = request.data["datasetName"]
        Dataset.objects.create(dataset_name=dataset_name, size=100)
        return Response({"message": "POST received"}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def list(request: Request):
    if request.method == "GET":
        datasets = Dataset.objects.all()
        if datasets is None:

            return Response({"message": "GET no datasets"})

        response = [
            {
                "datasetId": d.dataset_id,
                "datasetName": d.dataset_name,
            }
            for d in datasets
        ]

        return Response(response)


@api_view(["PUT"])
def rename(request: Request):
    if request.method == "PUT":
        dataset_id = request.data["datasetId"]
        dataset_name = request.data["datasetName"]
        dataset = Dataset.objects.filter(dataset_id=dataset_id).first()
        if dataset is None:
            return Response({"message": "PUT no datasets"}, status=status.HTTP_200_OK)

        dataset.dataset_name = dataset_name
        dataset.save()
        return Response({"message": "PUT request received"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def delete(request: Request):
    if request.method == "DELETE":
        dataset_id = request.query_params.get("datasetId")
        dataset = Dataset.objects.filter(dataset_id=dataset_id).first()
        if dataset is None:
            return Response(
                {"message": "DELETE no datasets"}, status=status.HTTP_200_OK
            )
        dataset.delete()
        return Response(
            {"message": "DELETE request received"}, status=status.HTTP_204_NO_CONTENT
        )
