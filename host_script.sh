#!/bin/bash

# コンテナが立ち上がった後に実行したいコマンドをここに記載
echo "コンテナが立ち上がりました！ホスト側の操作を実行します"

DIR="./postgres_data"
OWNER=$(stat -c '%U' "$DIR")
echo "$OWNER"

if [ "$OWNER" = "UNKNOWN" ]; then
  sudo chown -R r3-yamada:r3-yamada "$DIR"
else
  echo "所有者は $OWNER なので、chown は不要です。"
fi