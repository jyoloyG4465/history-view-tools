# history-view-tools

## 概要

`history-view-tools` は、YouTube の自身の動画視聴履歴をグラフで視覚的に分析・可視化するためのWebツールです。YouTube からエクスポートした視聴履歴データをインポートし、様々な種類のグラフで表示することで、自身の視聴傾向を深く理解することができます。

## 機能

*   **YouTube 視聴履歴のインポート**: YouTube からダウンロードした視聴履歴データ (HTMLファイルなど) をWebインターフェースから簡単にインポートできます。
*   **多様なグラフ表示**: インポートされた履歴データに基づき、視聴時間、視聴頻度、カテゴリ別視聴傾向など、様々な角度から分析したグラフを生成・表示します。
*   **Webベースのインターフェース**: ブラウザを通じてアクセスできるユーザーフレンドリーなWebインターフェースを提供します。

## 技術スタック

このプロジェクトは、以下の技術で構成されています。

*   **バックエンド (API)**: Python (FastAPI または Django を想定)
    *   データベースとの連携、データ処理、APIエンドポイントの提供を担当します。
*   **フロントエンド (Web UI)**: HTML, CSS, JavaScript (具体的なフレームワークは未確認ですが、静的ファイルとして提供されます)
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
    DB_NAME=youtube_history_db
    DB_USER=user
    DB_PASSWORD=password
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

## 使い方

1.  **YouTube 視聴履歴のダウンロード**:
    *   YouTube のデータエクスポート機能 (Google Takeout など) を利用して、自身の視聴履歴データをダウンロードします。通常、HTML形式で提供されます。

2.  **履歴データのインポート**:
    *   `history-view-tools` のWebインターフェースにアクセスします。
    *   画面上の指示に従い、ダウンロードした視聴履歴ファイル (例: `watch-history.json`) をアップロードします。

3.  **グラフの表示**:
    *   データが正常にインポートされると、様々な種類のグラフが自動的に生成され、表示されます。
    *   グラフの種類や表示オプションを切り替えることで、多角的な分析が可能です。

## プロジェクト構造

```
.
├── .git/                     # Git リポジトリ関連ファイル
├── .github/                  # GitHub Actions ワークフロー
├── .mypy_cache/              # MyPy のキャッシュ
├── .venv/                    # Python 仮想環境
├── containers/
│   ├── api-server/           # バックエンドAPIサーバーのDocker関連ファイルとソースコード
│   │   ├── Dockerfile        # APIサーバーのDockerイメージ定義
│   │   └── entrypoint.sh     # APIサーバーの起動スクリプト
│   ├── databases/            # データベース関連ファイル
│   │   └── init.sql          # PostgreSQL 初期化スクリプト
│   └── http-server/          # フロントエンドWebサーバーのDocker関連ファイルと静的ファイル
│       ├── Dockerfile        # HTTPサーバーのDockerイメージ定義
│       └── index.html        # フロントエンドのメインHTMLファイル
├── docker-compose.yml        # Docker Compose 設定ファイル
├── host_script.sh            # ホスト側で実行する可能性のあるスクリプト
├── postgres_data/            # PostgreSQL のデータ永続化ディレクトリ
├── README.md                 # このREADMEファイル
├── requirements-venv.txt     # Python 仮想環境用の依存関係リスト
└── .gitignore                # Git の無視リスト
```