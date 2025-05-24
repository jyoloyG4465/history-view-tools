#!/bin/bash

# コンテナが立ち上がった後に実行したいコマンドをここに記載
echo "コンテナが立ち上がりました！ホスト側の操作を実行します"

DIR="./postgres_data"
OWNER=$(stat -c '%U' "$DIR")
echo "$OWNER"
CURRENT_USER=$(whoami)
CURRENT_GROUP=$(id -gn)

if [ "$OWNER" = "UNKNOWN" ]; then
  sudo chown -R $CURRENT_USER:$CURRENT_GROUP "$DIR"
else
  echo "所有者は $OWNER なので、chown は不要です。"
fi