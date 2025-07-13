from unittest.mock import MagicMock, patch

from apps.analysis.v1.services import get_channel_list, get_data
from django.test import TestCase


class ServiceTests(TestCase):
    @patch("apps.analysis.v1.services.DbUtils")
    @patch("apps.analysis.v1.services.Dataset.objects.get")
    def test_get_channel_list(
        self, mock_dataset_get: MagicMock, mock_db_utils: MagicMock
    ):
        # --- Arrange ---
        # データベースから取得されるDatasetオブジェクトのモックを作成
        mock_dataset = MagicMock()
        mock_dataset.table_name = "test_table"
        mock_dataset_get.return_value = mock_dataset

        # DbUtils.get_dataset_channel_listのモックを作成
        expected_channels = ["channel1", "channel2"]
        mock_db_utils.get_dataset_channel_list.return_value = expected_channels

        # --- Act ---
        # テスト対象の関数を呼び出し
        result = get_channel_list(dataset_id=1)

        # --- Assert ---
        # 結果が期待通りか検証
        self.assertEqual(result, {"data": expected_channels})

        # Dataset.objects.getが正しい引数で呼び出されたか検証
        mock_dataset_get.assert_called_once_with(dataset_id=1)

        # DbUtils.get_dataset_channel_listが正しい引数で呼び出されたか検証
        mock_db_utils.get_dataset_channel_list.assert_called_once_with("test_table")

    @patch("apps.analysis.v1.services.DbUtils")
    @patch("apps.analysis.v1.services.Dataset.objects.get")
    def test_get_data(self, mock_dataset_get: MagicMock, mock_db_utils: MagicMock):
        # --- Arrange ---
        # データベースから取得されるDatasetオブジェクトのモックを作成
        mock_dataset = MagicMock()
        mock_dataset.table_name = "test_table_for_data"
        mock_dataset_get.return_value = mock_dataset

        # DbUtils.get_monthly_view_countsのモックを作成
        expected_data = [
            {"month": "2023-01", "views": 100},
            {"month": "2023-02", "views": 150},
        ]
        mock_db_utils.get_monthly_view_counts.return_value = expected_data

        # --- Act ---
        # テスト対象の関数を呼び出し
        result = get_data(dataset_id=2, channel_name="test_channel")

        # --- Assert ---
        # 結果が期待通りか検証
        self.assertEqual(result, {"data": expected_data})

        # Dataset.objects.getが正しい引数で呼び出されたか検証
        mock_dataset_get.assert_called_once_with(dataset_id=2)

        # DbUtils.get_monthly_view_countsが正しい引数で呼び出されたか検証
        mock_db_utils.get_monthly_view_counts.assert_called_once_with(
            "test_table_for_data", "test_channel"
        )

    @patch("apps.analysis.v1.services.DbUtils")
    @patch("apps.analysis.v1.services.Dataset.objects.get")
    def test_get_data_no_channel_name(
        self, mock_dataset_get: MagicMock, mock_db_utils: MagicMock
    ):
        # --- Arrange ---
        # データベースから取得されるDatasetオブジェクトのモックを作成
        mock_dataset = MagicMock()
        mock_dataset.table_name = "test_table_no_channel"
        mock_dataset_get.return_value = mock_dataset

        # DbUtils.get_monthly_view_countsのモックを作成 (channel_nameがNoneの場合)
        expected_data = [
            {"month": "2023-01", "views": 500},
            {"month": "2023-02", "views": 600},
        ]
        mock_db_utils.get_monthly_view_counts.return_value = expected_data

        # --- Act ---
        # テスト対象の関数を呼び出し (channel_nameをNoneで)
        result = get_data(dataset_id=3, channel_name=None)

        # --- Assert ---
        # 結果が期待通りか検証
        self.assertEqual(result, {"data": expected_data})

        # Dataset.objects.getが正しい引数で呼び出されたか検証
        mock_dataset_get.assert_called_once_with(dataset_id=3)

        # DbUtils.get_monthly_view_countsが正しい引数で呼び出されたか検証
        mock_db_utils.get_monthly_view_counts.assert_called_once_with(
            "test_table_no_channel", None
        )
