# Pythonの公式イメージを使用
FROM node:18-alpine

RUN npm install -g http-server

WORKDIR /code

COPY ./containers/http-server/browser-cli/package*.json ./

RUN npm install -g @angular/cli \
    && npm install

EXPOSE 8080

# CMD ["sh", "-c", "cd /code/browser-cli && ng serve --host 0.0.0.0"]
