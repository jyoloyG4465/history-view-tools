import re

import pandas as pd
from common.utils.db_utils import DbUtils
from sqlalchemy.types import ARRAY, DateTime, Text


class DatasetUtils:

    @staticmethod
    def dataset_create(df: pd.DataFrame, table_name: str) -> None:

        df["channel_name"] = df["subtitles"].apply(
            lambda x: x[0].get("name") if isinstance(x, list) else None
        )

        df["channel_url"] = df["subtitles"].apply(
            lambda x: x[0].get("url") if isinstance(x, list) and x else None
        )

        df["products"] = df["products"].apply(
            lambda x: x[0] if isinstance(x, list) else None
        )

        df["details"] = df["details"].apply(
            lambda x: x[0].get("name") if isinstance(x, list) else None
        )

        df["time"] = pd.to_datetime(df["time"], errors="coerce")

        df.columns = [_camel_to_snake(col) for col in df.columns]
        df = df.drop(columns=["subtitles"])
        dtype = {
            "header": Text(),
            "title": Text(),
            "time": DateTime(),
            "products": Text(),
            "details": Text(),
            "activity_controls": ARRAY(Text),
            "title_url": Text(),
            "description": Text(),
            "channel_name": Text(),
            "channel_url": Text(),
        }

        DbUtils.save_dataframe_to_postgres(df, table_name, dtype)

        return


def _camel_to_snake(name: str) -> str:
    name = re.sub(r"(.)([A-Z][a-z]+)", r"\1_\2", name)
    name = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", name)
    return name.lower()
