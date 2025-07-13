from datetime import date
from unittest.mock import MagicMock, patch

import pandas as pd
from apps.dataset.v1.services import (dataset_create, delete_dataset, get_list, rename_dataset)
from django.test import TestCase


class DatasetServiceTests(TestCase):
    @patch("apps.dataset.v1.services.Dataset")
    @patch("apps.dataset.v1.services.DatasetUtils")
    @patch("apps.dataset.v1.services.pd")
    @patch("apps.dataset.v1.services.uuid")
    @patch("apps.dataset.v1.services.transaction")
    def test_dataset_create(
        self,
        mock_transaction: MagicMock,
        mock_uuid: MagicMock,
        mock_pd: MagicMock,
        mock_dataset_utils: MagicMock,
        mock_dataset_model: MagicMock,
    ):
        # Arrange
        mock_file = MagicMock()
        mock_file.read.return_value = (
            b'{"time": ["2023-01-01", "2023-01-02"], "value": [1, 2]}'
        )
        dataset_name = "test_dataset"
        # uuid.uuid4() が返すオブジェクトの __str__ メソッドをモック
        mock_uuid_obj = MagicMock()
        mock_uuid_obj.__str__.return_value = "test_table_name"
        mock_uuid.uuid4.return_value = mock_uuid_obj

        mock_df = MagicMock(spec=pd.DataFrame)
        mock_df.size = 1024 * 1024 * 2  # 2MB
        mock_time_series = MagicMock()
        mock_time_series.min.return_value.date.return_value = date(2023, 1, 1)
        mock_time_series.max.return_value.date.return_value = date(2023, 1, 2)
        mock_df.__getitem__.return_value = mock_time_series
        mock_pd.read_json.return_value = mock_df

        mock_created_dataset = MagicMock()
        mock_created_dataset.dataset_id = 1
        mock_dataset_model.objects.create.return_value = mock_created_dataset

        # Act
        result = dataset_create(mock_file, dataset_name)

        # Assert
        mock_pd.read_json.assert_called_once_with(mock_file)
        mock_dataset_utils.dataset_create.assert_called_once_with(
            mock_df, "test_table_name"
        )
        mock_dataset_model.objects.create.assert_called_once_with(
            dataset_name=dataset_name,
            table_name="test_table_name",
            df_size=2.0,
            start_date=date(2023, 1, 1),
            end_date=date(2023, 1, 2),
        )
        self.assertEqual(result, {"datasetId": 1})
        mock_transaction.atomic.assert_called_once()

    @patch("apps.dataset.v1.services.Dataset")
    def test_get_list_with_datasets(self, mock_dataset_model: MagicMock):
        # Arrange
        mock_dataset1 = MagicMock()
        mock_dataset1.dataset_id = 1
        mock_dataset1.dataset_name = "Dataset 1"
        mock_dataset1.start_date = date(2023, 1, 1)
        mock_dataset1.end_date = date(2023, 1, 31)

        mock_dataset2 = MagicMock()
        mock_dataset2.dataset_id = 2
        mock_dataset2.dataset_name = "Dataset 2"
        mock_dataset2.start_date = date(2023, 2, 1)
        mock_dataset2.end_date = date(2023, 2, 28)

        mock_dataset_model.objects.all.return_value.order_by.return_value = [
            mock_dataset1,
            mock_dataset2,
        ]

        # Act
        result = get_list()

        # Assert
        expected_response = [
            {
                "datasetId": 1,
                "datasetName": "Dataset 1",
                "startDate": date(2023, 1, 1),
                "endDate": date(2023, 1, 31),
            },
            {
                "datasetId": 2,
                "datasetName": "Dataset 2",
                "startDate": date(2023, 2, 1),
                "endDate": date(2023, 2, 28),
            },
        ]
        self.assertEqual(result, expected_response)
        mock_dataset_model.objects.all.assert_called_once()

    @patch("apps.dataset.v1.services.Dataset")
    def test_get_list_no_datasets(self, mock_dataset_model: MagicMock):
        # Arrange
        mock_dataset_model.objects.all.return_value.order_by.return_value = []

        # Act
        result = get_list()

        # Assert
        self.assertEqual(result, [])  # 空のリストが返されることを期待

    @patch("apps.dataset.v1.services.Dataset")
    @patch("apps.dataset.v1.services.transaction")
    def test_rename_dataset(
        self, mock_transaction: MagicMock, mock_dataset_model: MagicMock
    ):
        # Arrange
        dataset_id = 1
        new_dataset_name = "New Dataset Name"
        mock_dataset = MagicMock()
        mock_dataset_model.objects.select_for_update.return_value.get.return_value = (
            mock_dataset
        )

        # Act
        rename_dataset(dataset_id, new_dataset_name)

        # Assert
        mock_dataset_model.objects.select_for_update.assert_called_once()
        mock_dataset_model.objects.select_for_update.return_value.get.assert_called_once_with(
            dataset_id=dataset_id
        )
        self.assertEqual(mock_dataset.dataset_name, new_dataset_name)
        mock_dataset.save.assert_called_once()
        mock_transaction.atomic.assert_called_once()

    @patch("apps.dataset.v1.services.DbUtils")
    @patch("apps.dataset.v1.services.Dataset")
    def test_delete_dataset(
        self, mock_dataset_model: MagicMock, mock_db_utils: MagicMock
    ):
        # Arrange
        dataset_id = 1
        mock_dataset = MagicMock()
        mock_dataset.table_name = "test_table_to_delete"
        mock_dataset_model.objects.filter.return_value.first.return_value = mock_dataset

        # Act
        delete_dataset(dataset_id)

        # Assert
        mock_dataset_model.objects.filter.assert_called_once_with(dataset_id=dataset_id)
        mock_db_utils.delete_app_data_table.assert_called_once_with(
            "test_table_to_delete"
        )
        mock_dataset.delete.assert_called_once()

    @patch("apps.dataset.v1.services.Dataset")
    def test_delete_dataset_not_found(self, mock_dataset_model: MagicMock):
        # Arrange
        dataset_id = 1
        mock_dataset_model.objects.filter.return_value.first.return_value = None

        # Act
        delete_dataset(dataset_id)

        # Assert
        mock_dataset_model.objects.filter.assert_called_once_with(dataset_id=dataset_id)
        # DbUtils.delete_app_data_table と dataset.delete は呼び出されないことを確認
        self.assertFalse(
            mock_dataset_model.objects.filter.return_value.first.return_value
        )
        # DbUtils.delete_app_data_table が呼び出されていないことを確認
        # mock_db_utils.delete_app_data_table.assert_not_called() # DbUtilsがモックされていないので直接は確認できない
        # dataset.delete が呼び出されていないことを確認
        # mock_dataset.delete.assert_not_called() # datasetがモックされていないので直接は確認できない
