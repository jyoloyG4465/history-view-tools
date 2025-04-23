# Pythonの公式イメージを使用
FROM python:3.13

# 作業ディレクトリを指定
WORKDIR /apps

# requirements.txt をコンテナにコピー
COPY requirements.txt .

# pandas をインストール（他の依存もあればここで）
RUN pip install --no-cache-dir -r requirements.txt

# 作業ディレクトリに全てのファイルをコピー（必要なら）
COPY . .
