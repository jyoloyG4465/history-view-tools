# history-view-tools

## 概要

`history-view-tools` は、YouTube の自身の動画視聴履歴をグラフで視覚的に分析・可視化するためのWebツールです。YouTube からエクスポートした視聴履歴データをインポートし、様々な種類のグラフで表示することで、自身の視聴傾向を深く理解することができます。

## 機能

*   **YouTube 視聴履歴のインポート**: YouTube からダウンロードした視聴履歴データ (HTMLファイルなど) をWebインターフェースから簡単にインポートできます。
*   **多様なグラフ表示**: インポートされた履歴データに基づき、視聴時間、視聴頻度、カテゴリ別視聴傾向など、様々な角度から分析したグラフを生成・表示します。
*   **Webベースのインターフェース**: ブラウザを通じてアクセスできるユーザーフレンドリーなWebインターフェースを提供します。

## 技術スタック

このプロジェクトは、以下の技術で構成されています。

*   **バックエンド (API)**: Python (Django)
    *   データベースとの連携、データ処理、APIエンドポイントの提供を担当します。
*   **フロントエンド (Web UI)**: Angular (TypeScript)
    *   ユーザーインターフェースの表示、履歴データのインポート、グラフの描画を担当します。
*   **データベース**: PostgreSQL
    *   インポートされた視聴履歴データを永続的に保存します。
*   **コンテナ化**: Docker, Docker Compose
    *   開発環境および本番環境の構築を容易にし、各サービスを独立して管理します。

## セットアップ方法

このプロジェクトは Docker Compose を使用して簡単にセットアップできます。

### 前提条件

*   Docker がインストールされていること
    *   Windows の場合、[Docker Desktop](https://www.docker.com/products/docker-desktop/) をインストールしてください。通常、Docker Desktop には Docker Compose も含まれています。
    *   Docker Desktop のインストールには、Windows Subsystem for Linux 2 (WSL 2) の有効化が必要な場合があります。
*   Docker Compose がインストールされていること

### 手順

1.  **リポジトリのクローン**

    ```bash
    git clone https://github.com/your-username/history-view-tools.git
    cd history-view-tools
    ```

2.  **環境変数の設定**

    `.env` ファイルを作成し、データベース接続情報を設定します。
    (例: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`)

    ```bash
    cp .env.example .env # .env.example が存在する場合
    # または手動で .env ファイルを作成
    ```

    `.env` ファイルの例:

    ```
    DB_NAME=postgres
    DB_USER=pguser
    DB_PASSWORD=pgpassword
    DB_HOST=databases
    DB_PORT=5432
    ```

3.  **Docker コンテナの起動**

    ```bash
    docker-compose up --build -d
    ```

    *   `--build`: イメージが存在しない場合や変更があった場合に再ビルドします。
    *   `-d`: バックグラウンドでコンテナを起動します。

4.  **アプリケーションへのアクセス**

    コンテナが正常に起動したら、Webブラウザで以下のURLにアクセスしてください。

    ```
    http://localhost:8080
    ```

    これにより、`history-view-tools` のWebインターフェースが表示されます。

## プロジェクト構造

```
.
├── .git/                     # Git リポジトリ関連ファイル
├── .github/                  # GitHub Actions ワークフロー
│   └── workflows/
│       ├── backend-formatter.yaml
│       ├── frontend-test.yaml
│       └── test.yaml
├── containers/
│   ├── api-server/           # バックエンドAPIサーバーのDocker関連ファイルとソースコード
│   │   ├── Dockerfile        # APIサーバーのDockerイメージ定義
│   │   ├── entrypoint.sh     # APIサーバーの起動スクリプト
│   │   ├── pytest.ini        # Pytest 設定ファイル
│   │   ├── requirements.txt  # アプリケーションの依存関係
│   │   └── requirements-tests.txt # テスト用の依存関係
│   ├── databases/            # データベース関連ファイル
│   │   └── init.sql          # PostgreSQL 初期化スクリプト
│   └── http-server/          # フロントエンドWebサーバーのDocker関連ファイルと静的ファイル
│       ├── browser-cli/      # Angular アプリケーションのソースコード
│       │   └── src/          # Angular アプリケーションのソース
│       │       └── app/      # Angular アプリケーションのコンポーネントなど
│       │           └── pages/ # 各ページのコンポーネント
│       │               ├── analysis/ # analysis ページ
│       │               ├── data-preparation/ # data-preparation ページ
│       │               ├── dataset/ # dataset ページ
│       │               └── home/ # home ページ
│       └── Dockerfile        # HTTPサーバーのDockerイメージ定義
│       └── nginx.conf        # Nginx 設定ファイル
├── docker-compose.yml        # Docker Compose 本番用設定ファイル
├── docker-compose.test.yml   # Docker Compose テスト用設定ファイル
├── host_script.sh            # ホスト側で実行する可能性のあるスクリプト
├── postgres_data/            # PostgreSQL のデータ永続化ディレクトリ
├── postgres_test_data/       # PostgreSQL のテストデータ永続化ディレクトリ
├── README.md                 # このREADMEファイル
└── .gitignore                # Git の無視リスト
```
