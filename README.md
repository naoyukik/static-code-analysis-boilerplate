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

## コーディング規約
### PHP
ルールセットはCakePHP Code Sniffer（PSR-12準拠）をベースに構築しています。

PHPCSやPHPMD、Psalmと重複しているルールを残す優先度は下記のようにしました。

1. PHP Code Sniffer
2. Psalm
3. PHP Mess Detector

PHPCSは他の静的解析ツールよりも導入確度が高そうなためです（むしろ入っていないプロジェクトはぜひ導入いただきたい）。

型関連に関しては、PHPCSとPsalmがかぶっていてもそのままとしました。これは型に関してはPsalmに任せたいから、とはいえ、PHPCSでもひとまず指摘はされるようにしておきたいからです。Psalmを入れるプロジェクトの場合、PHPCSの型に関してOFFにしてもよいでしょう。

PsalmとPHPMDについては、型が必須になりつつある時代でPHPの型を補完するシステムが必要と感じているためです（個人的に絶対指摘を入れたい「使用していない変数」に対する指摘がPsalmで可能なのもありがたい）。

#### CakePHPCSから変更したもの
- クラス名と関数名のプレフィックスにアンダースコアを許可しないルールを有効化
```xml
<exclude name="PSR2.Classes.PropertyDeclaration.Underscore"/>
<exclude name="PSR2.Methods.MethodDeclaration.Underscore"/>
```
CakePHPCSではアンダースコアーを許可しているため除外されている。

なお、全体的に`exclude-pattern`については、そのままにしてあります（おそらくCakePHP準拠）。各プロジェクトで必要な分だけ追加・削除してください。

- Operatorに関する指摘するルールを有効化
```xml
<rule ref="Squiz.Operators.ComparisonOperatorUsage"/>
```
これは例えば`==`を許可せず、`===`へ書き換えを促す等のルールが追加されます。

## リポジトリーについて
各種ルールはもちろん、すぐにルールを確認できるお手軽なDocker環境と、ルールセットを確認できるように例となるコードを公開している。
コード例は全てを網羅しているわけではない（ベストエフォートで記載）。

## 対応ツール
### PHP
#### PHP Code Sniffer
https://github.com/squizlabs/PHP_CodeSniffer

PHPの静的解析の老舗。まずはここから。

https://github.com/squizlabs/PHP_CodeSniffer/wiki/Annotated-Ruleset

カスタムルールなどを記載するルールセットファイルの書き方。

##### CakePHP Code Sniffer
https://github.com/cakephp/cakephp-codesniffer

CakePHP Code Sniffer（以下CakePHPCS）はPHPCSのルール集です。
PSR-12に準拠しており、さらに独自ルールを追加しています。

導入後、ルールセットは下記のパスに入っている。
```
vendor/cakephp/cakephp-codesniffer/CakePHP/ruleset.xml
```

また、CakePHPCSは内部でもう1つのサードパーティーのCode Snifferを使用しています。

https://github.com/slevomat/coding-standard

今まで存在を知らなかったのだけれど、ルールを確認するにかなり強そう。

#### PHP Mess Detector
https://phpmd.org/

こちらも静的解析の老舗。PHPCSとは違った観点で問題点を洗い出してくれます。

#### Psalm
https://psalm.dev/

動画配信サイトVimeoが作っている静的解析ツール。型関連まで指摘をしてくれます。

#### JetBrains Qodana PHP
※QodanaはEAP終了に併せて月間サブスクリプションプランでリリースされます。PHPの解析は有料版でのみ使用可能となるようで、その時点でリポジトリーから削除予定です。

https://www.jetbrains.com/ja-jp/qodana/

JetBrains Qodanaでの静的解析の設定も追加してあります。
QodanaはJetBrains製品に搭載されている静的解析エンジンを使用してコード検証を行えます。
（EAPの間は使用しているDockerイメージに期限があり、イメージ公開からだいたい1か月程度で期限切れエラーを吐きます）

設定が膨大で1つずつ精査しているのは非常に時間がかかるため、今回はベースルールとして `qodana.recommended` を採用し、追加でルールを設定しました。

PHPCSやPsalmなどのコマンドラインツールとは違って、日常的に動作させるような軽量なものではないのです。
基本的にはGitHub Actionsを使用するか、ローカルでは必要に応じて設定済みのDocker Composeから起動させてください。

### JavaScript/TypeScript
#### ESLint
Airbnbのスタイルガイドを採用しました。

https://github.com/airbnb/javascript

Airbnbを設定した以外は素の状態です。

## GitHub Actions
対応ツールはそれぞれGitHub ActionsでAnnotationsが出力できるように設定してあります。

また、指摘が存在してもGitHub Actionsのチェックはグリーンになるよう設定されてますので、エラーにする場合などは設定を変更する必要があります。

### ESLint
ESLintは当初SARIFファイルを出力していたのですが、Annotationsで出力できませんでした。 ESLintデフォルト（stylish）で出力したところAnnotationで出力されましたので、GitHub Actionsの出力はデフォルトになっています。

Problem MatcherやSARIFを使用していないのになぜAnnotationsに出力されるかというと、`setup-node`が内部でProblem Matcherを設定しているからです。

### テキスト校正
#### textlint
JTF標準ルールを採用しています。
プラスで設定があります。設定については、以前記事を書いていますのでそちらも参考にしてください。

https://zenn.dev/naoyukik/articles/537f020909e2eae5155b
