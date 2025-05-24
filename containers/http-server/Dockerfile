FROM node:18-alpine

RUN npm install -g http-server

WORKDIR /code

COPY ./containers/http-server/browser-cli/package*.json ./

RUN npm install -g @angular/cli \
    && npm install

CMD ["sh", "-c", "cd ./browser-cli && ng serve --host 0.0.0.0"]

# デプロイ時はこちら

# Stage 1: Angularのビルド
# FROM node:18 AS builder

# # 作業ディレクトリを作成
# WORKDIR /app

# # package.jsonとpackage-lock.jsonをコピー
# COPY ./containers/http-server/browser-cli/package*.json ./

# # 依存関係をインストール
# RUN npm install

# # Angularのプロジェクトファイルをコピー
# COPY ./containers/http-server/browser-cli/ ./

# # Angularアプリをビルド（環境に応じて--configurationオプションを追加可能）
# RUN npm run build

# FROM nginx:stable

# COPY ./containers/http-server/nginx.conf /etc/nginx/nginx.conf

# COPY ./containers/http-server/browser-cli/dist/browser-cli/ /usr/share/nginx/html

