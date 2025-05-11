import os
from typing import Any

import pandas as pd
from sqlalchemy import create_engine, text
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

    df.to_sql(table_name, con=engine, schema="app_data", index=False, dtype=dtype)

    return


def delete_app_data_table(table_name: str) -> None:
    engine = _get_engine()

    sql = f'DROP TABLE IF EXISTS app_data."{table_name}";'

    # SQL コマンドを実行
    with engine.connect() as connection:
        connection.execute(text(sql))
        connection.commit()  # コミットを追加

    return
