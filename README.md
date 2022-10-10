# custom-rules-for-static-code-analysis

## initial
```bash
cp .env.example .env
docker compose up -d 
```
Change `COMPOSE_PROJECT_NAME` in .env

## コーディング規約方針
### PHP
このリポジトリーのルールセットはPSRをベースに、PHP The Right wayのコーディング規約ページ、PhpStormとプラグインのPhpInspections、そして経験（もしくは独断と偏見）から現場でよく使われているルールでセットを構築している。

### ESLint
作成予定だがまだ作られていない

## リポジトリーについて
各種ルールはもちろん、すぐにルールを確認できるお手軽なDocker環境と、ルールセットを確認出来るように例となるコードが公開されています。
コード例は全てを網羅しているわけではないです（ベストエフォートで記載）。
