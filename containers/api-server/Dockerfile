# Pythonの公式イメージを使用
FROM python:3.13

# 作業ディレクトリを指定
WORKDIR /code

RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# requirements.txt をコンテナにコピー
COPY requirements.txt .

# pandas をインストール（他の依存もあればここで）
RUN pip install --no-cache-dir -r requirements.txt

# 作業ディレクトリに全てのファイルをコピー（必要なら）
COPY . .

RUN chmod +x ./entrypoint.sh
