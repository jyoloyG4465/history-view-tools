import os
from typing import Any

import pandas as pd
from sqlalchemy import Text, create_engine
from sqlalchemy.engine import Engine


def _get_engine() -> Engine:
    db_url = (
        f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
        f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
    )
    return create_engine(db_url)


def save_dataframe_to_postgres(
    df: pd.DataFrame, table_name: str, dtype: dict[str, Any]
) -> None:
    engine = _get_engine()

    df.to_sql(table_name, con=engine, index=False, dtype=dtype)

    return
