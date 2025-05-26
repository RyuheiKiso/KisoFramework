# npm

---

## 概要

npm（Node Package Manager）は、Node.jsのパッケージ管理ツールである。JavaScriptのライブラリやツールを簡単にインストール・管理できる。

```mermaid
flowchart LR
    A[Node.js] --> B[npm]
    B --> C[パッケージ管理]
    B --> D[依存関係管理]
    B --> E[スクリプト実行]
```

---

## npmとは

### npmの特徴
- オープンソースパッケージが豊富である
- コミュニティによる活発な開発が行われている
- クロスプラットフォームに対応している

```mermaid
graph TD
    A[npm] --> B[OSSパッケージ]
    A --> C[コミュニティ]
    A --> D[クロスプラットフォーム]
```

### npmの仕組み

#### レジストリ

npmはパッケージを「レジストリ」と呼ばれるサーバーで管理している。

##### npm公式レジストリ
https://registry.npmjs.org/

##### プライベートレジストリ
企業や組織内で独自に構築可能である。

```mermaid
flowchart TD
    subgraph レジストリ
        A1[npm公式レジストリ]
        A2[プライベートレジストリ]
    end
    B1[開発者] -->|公開| A1
    B2[開発者] -->|公開| A2
    C1[利用者] -->|取得| A1
    C2[利用者] -->|取得| A2
```

#### CLI（コマンドラインインターフェース）

npmはCLIツールとして提供され、コマンドで操作する。

##### コマンドの構成
例: `npm install express`

##### 設定ファイル（.npmrc）
ユーザーやプロジェクトごとに設定可能である。

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Registry
    User->>CLI: npm install express
    CLI->>Registry: パッケージ要求
    Registry-->>CLI: パッケージデータ
    CLI-->>User: インストール完了
```

#### パッケージの公開と取得

##### パッケージの公開手順
`npm publish` コマンドで公開する。

##### バージョン管理と公開
セマンティックバージョニングに従い管理する。

```mermaid
flowchart TD
    A[開発者] -->|npm publish| B[npmレジストリ]
    C[利用者] -->|npm install| B
```

---

## インストール方法

### Node.jsのインストール手順

#### Windowsでのインストール
- 公式サイトからインストーラーをダウンロードする
- インストール時の注意点: パスを通す必要がある

#### macOSでのインストール
- Homebrew: `brew install node` でインストールできる
- インストーラー: 公式サイトからダウンロードする

#### Linuxでのインストール
- apt: `sudo apt install nodejs npm` でインストールできる
- nvm: バージョン管理が容易である

```mermaid
graph LR
    A[公式サイト] -->|ダウンロード| B[Windows]
    A -->|ダウンロード| C[macOS]
    A -->|ダウンロード| D[Linux]
    E[Homebrew] --> C
    F[apt/nvm] --> D
```

### npmのインストール確認

```sh
npm -v
```
出力例: `9.6.7`

### npmのバージョン確認コマンド

```sh
npm -v
```
バージョン確認はトラブルシュート時に重要である。

### npmのアップデート方法

#### npm自体のアップデート

```sh
npm install -g npm
```

#### Node.jsとnpmの同時アップデート

nvmを利用すると便利である。

```sh
nvm install node
```

### Windowsでの注意点

#### パスの設定
環境変数PATHにNode.jsとnpmのパスが含まれているか確認する。

#### 権限の問題
管理者権限でコマンドプロンプトを実行する。

### macOS/Linuxでの注意点

#### sudoの利用
グローバルインストール時は`sudo`が必要な場合がある。

#### 権限エラーの回避
npmのグローバルディレクトリをユーザー権限に変更することで回避可能である。

---

## 基本コマンド

### パッケージのインストール

#### ローカルインストール

```sh
npm install <package>
```

##### --saveオプション
（npm5以降はデフォルトである）

##### --save-devオプション

```sh
npm install --save-dev <package>
```

##### --save-optionalオプション

```sh
npm install --save-optional <package>
```

#### グローバルインストール

```sh
npm install -g <package>
```

##### グローバルパスの確認

```sh
npm root -g
```

```mermaid
flowchart LR
    A[プロジェクト] -- ローカル --> B[依存パッケージ]
    A -- グローバル --> C[グローバルパッケージ]
```

### パッケージのアンインストール

#### ローカルパッケージの削除

```sh
npm uninstall <package>
```

#### グローバルパッケージの削除

```sh
npm uninstall -g <package>
```

### パッケージのアップデート

#### 個別アップデート

```sh
npm update <package>
```

#### すべてのパッケージのアップデート

```sh
npm update
```

### インストール済みパッケージの一覧表示

#### ローカル一覧

```sh
npm list
```

#### グローバル一覧

```sh
npm list -g --depth=0
```

### パッケージの検索

#### npm searchコマンド

```sh
npm search <keyword>
```

#### npm公式サイトでの検索
https://www.npmjs.com/

### プロジェクトの初期化

#### package.jsonの作成

```sh
npm init
```

##### npm init -y
対話なしでデフォルト値で作成できる。

```mermaid
flowchart TD
    A[プロジェクト作成] --> B[npm init]
    B --> C[package.json生成]
```

---

## パッケージ管理

### package.jsonの役割

プロジェクトの依存関係やスクリプト、メタ情報を管理する。

#### 基本構成

```json
{
  "name": "sample",
  "version": "1.0.0",
  "description": "サンプルプロジェクト"
}
```

#### scriptsセクション

```json
"scripts": {
  "start": "node index.js",
  "test": "echo \"No test specified\" && exit 0"
}
```

#### enginesセクション

```json
"engines": {
  "node": ">=16.0.0"
}
```

```mermaid
flowchart TD
    A[package.json]
    A --> B[dependencies]
    A --> C[devDependencies]
    A --> D[scripts]
    A --> E[engines]
```

### package-lock.jsonの役割

依存関係のバージョンを固定し、再現性を担保する。

#### lockfileVersion
npmのバージョンによって異なる。

#### チーム開発での重要性
同じ環境を再現できる。

### 依存関係の種類

#### dependencies
本番環境で必要なパッケージである。

#### devDependencies
開発時のみ必要なパッケージである。

#### peerDependencies
プラグインやライブラリで利用する。

#### optionalDependencies
インストール失敗時も処理継続可能である。

```mermaid
flowchart TD
    A[依存関係]
    A --> B[dependencies]
    A --> C[devDependencies]
    A --> D[peerDependencies]
    A --> E[optionalDependencies]
```

### 依存関係の追加・削除

#### npm install

```sh
npm install <package>@<version>
```

#### npm uninstall

```sh
npm uninstall <package1> <package2>
```

### スクリプトの利用方法

#### npm run

```sh
npm run <script>
```

#### カスタムスクリプトの作成

複数コマンドの連結例:

```json
"scripts": {
  "build": "npm run clean && tsc"
}
```

### バージョン指定の方法

#### セマンティックバージョニング

- メジャー.マイナー.パッチ（例: 1.2.3）である

#### 範囲指定（^, ~, > など）

- `^1.2.3`: 1.x.x
- `~1.2.3`: 1.2.x

```mermaid
flowchart LR
    A[1.2.3] -- ^ --> B[1.x.x]
    A -- ~ --> C[1.2.x]
    A -- > --> D[より新しいバージョン]
```

---

## よくあるトラブルと対処法

### パーミッションエラーの対処法

#### グローバルインストール時のエラー

エラー例: `EACCES: permission denied`

##### エラー例と解決策

- sudoを使う
- グローバルディレクトリを変更する

#### フォルダ権限の修正

```sh
sudo chown -R $USER:$GROUP ~/.npm
```

### キャッシュの問題とクリア方法

#### npm cache cleanコマンド

```sh
npm cache clean --force
```

#### キャッシュディレクトリの場所

```sh
npm config get cache
```

### 依存関係の競合解決

#### npm audit

```sh
npm audit
npm audit fix
```

#### npm dedupe

```sh
npm dedupe
```

```mermaid
flowchart TD
    A[依存関係の競合]
    A --> B[npm audit]
    A --> C[npm dedupe]
    B --> D[脆弱性修正]
    C --> E[重複解消]
```

### node_modulesやpackage-lock.jsonの削除

#### クリーンアップ手順

```sh
rm -rf node_modules
rm package-lock.json
```

#### 再インストール手順

```sh
npm install
```

### プロキシ環境での利用

#### プロキシ設定方法

```sh
npm config set proxy http://proxy.example.com:8080
```

#### 設定ファイルの編集

.npmrcファイルに記載例:

```
proxy=http://proxy.example.com:8080
https-proxy=http://proxy.example.com:8080
```

---

## 参考リンク

- [npm公式ドキュメント](https://docs.npmjs.com/)
- [Node.js公式サイト](https://nodejs.org/ja/)
- [npmパッケージ検索](https://www.npmjs.com/)

---