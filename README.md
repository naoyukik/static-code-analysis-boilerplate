# Custom rules for static code analysis

## PHP解析サンプル実行方法
### Docker起動
```bash
cp .env.example .env
# Change `COMPOSE_PROJECT_NAME` in .env
docker compose up -d php
```
### 各種解析ツール実行
```bash
make phpcs
make psalm
make phpmd
```

## JS解析サンプル実行方法
```bash
cp .env.example .env
# Change `COMPOSE_PROJECT_NAME` in .env
docker compose up -d js
```
### 各種解析ツール実行
```bash
make eslint
make textlint
```

## コーディング規約方針
### PHP
このリポジトリーのルールセットはPSRをベースに、PHP The Right wayのコーディング規約ページ、PhpStormとプラグインのPhpInspections、そして経験（もしくは独断と偏見）から現場でよく使われているルールでセットを構築している。

### ESLint
作成予定だがまだ作られていない

## リポジトリーについて
各種ルールはもちろん、すぐにルールを確認できるお手軽なDocker環境と、ルールセットを確認出来るように例となるコードが公開されています。
コード例は全てを網羅しているわけではないです（ベストエフォートで記載）。
