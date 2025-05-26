# GithubAction

---

## 概要

- 本ドキュメントの目的  
  Github Actionsの概要、基本構成、よく使うアクション、注意点などをまとめ、プロジェクトでの活用を支援します。
- 対象読者  
  - 前提知識  
    GitHubの基本操作、YAMLの基礎知識がある方
  - 想定ユースケース  
    CI/CD導入を検討している開発者、運用担当者

---

## Github Actionsとは

- サービス概要  
  GitHub Actionsは、GitHub上でCI/CDパイプラインを構築できるサービスです。リポジトリへのpushやpull requestなどのイベントをトリガーに、テストやビルド、デプロイなどの自動化が可能です。

  - CI/CDとは  
    - 継続的インテグレーション  
      - コード品質向上：自動テストによりバグの早期発見が可能
    - 継続的デリバリー  
      - 自動テスト：コミットごとにテストを自動実行
      - 自動デプロイ：本番・ステージング環境への自動デプロイ

    ```mermaid
    %% CI/CDの流れ（詳細版）
    flowchart TD
      A[ソースコード変更] --> B[GitHubへpush/pull request]
      B --> C[GitHub Actionsトリガー]
      C --> D[依存パッケージのインストール]
      D --> E[静的解析・Lint]
      E --> F[ユニットテスト]
      F --> G[ビルド]
      G --> H[成果物アップロード]
      H --> I[デプロイ]
      I --> J["通知(Slack/メール)"]
    ```

    <!-- 追加: 他CI/CDサービスとの比較図（詳細） -->
    ```mermaid
    %% CI/CDサービス比較（詳細）
    graph LR
      GH[GitHub Actions] -- 統合 --> GHPR[PR連携]
      GH -- Marketplace --> GHMP[多様なアクション]
      GH -- 独自アクション --> GHE[拡張性]
      CC[CircleCI] -- 設定ファイル --> CCC[.circleci/config.yml]
      CC -- 実行環境 --> CCD[Dockerベース]
      GL[GitLab CI] -- パイプライン --> GLP[依存関係記述]
      GL -- 権限管理 --> GLG[グループ単位]
      GH -. サードパーティ連携 .-> CC
      GH -. サードパーティ連携 .-> GL
    ```

  - Github Actionsの位置づけ  
    - Githubとの統合  
      - プルリクエスト連携：PR作成時に自動でテストやレビューを実行
    - 他CI/CDサービスとの違い  
      - サードパーティ連携：Marketplaceで多様なアクションを利用可能
      - 拡張性：独自アクションの作成も可能

- 主な特徴  
  - 無料枠と制限  
    - パブリック/プライベートリポジトリの違い  
      - パブリックは無料枠が多い、プライベートは制限あり
      - 分単位の課金：無料枠超過時は課金
      - ランナーの種類：GitHubホスト/セルフホスト
  - 他サービスとの比較  
    - CircleCI  
      - 設定ファイルの違い：CircleCIは`.circleci/config.yml`
      - 実行環境の違い：Dockerベースが主流
    - GitLab CI  
      - パイプライン構成の違い：ジョブの依存関係記述が異なる
      - 権限管理の違い：GitLabはグループ単位で管理

---

## ワークフローの基本構成

- ワークフロー（workflow）とは  
  複数のジョブやステップをまとめた自動化処理の単位です。
  - 定義ファイル（YAML）の場所  
    - .github/workflows ディレクトリに配置
      - ファイル命名規則：任意のファイル名（例：ci.yml）
      - 複数ワークフローの管理が可能

- ジョブ（job）とステップ（step）  
  - 並列・直列実行  
    - needsによる依存関係でジョブの順序を制御
      - 複数ジョブの例
      - ジョブ間の成果物共有：artifactsを利用

    ```mermaid
    %% ジョブの依存関係例（詳細）
    flowchart TD
      job1[テスト] --> job2[ビルド]
      job2 --> job3[デプロイ]
      job1 -.-> cache[キャッシュ保存]
      job2 -.-> artifact[成果物アップロード]
      job3 -.-> notify[通知]
    ```

    <!-- 追加: ワークフロー全体像（詳細） -->
    ```mermaid
    %% ワークフロー全体像（詳細）
    flowchart LR
      trigger["トリガー(push/pull_request)"] --> wf["ワークフロー"]
      wf --> jobA["JobA: テスト"]
      wf --> jobB["JobB: ビルド"]
      wf --> jobC["JobC: デプロイ"]
      jobA -->|artifacts| jobB
      jobB -->|成果物| jobC
      jobC --> notify["通知(Slack)"]
      jobA -.-> cacheA["キャッシュ利用"]
      jobB -.-> cacheB["キャッシュ利用"]
    ```

- トリガー（trigger）の種類  
  - push/pull_request  
    - ブランチ指定や除外パターン、タグ指定が可能
  - 手動実行（workflow_dispatch）  
    - 入力パラメータを指定して手動実行
      - デフォルト値や必須/任意指定が可能

---

## よく使うアクション例

- チェックアウト（actions/checkout）  
  - リポジトリの取得、サブモジュール対応（recursiveオプション）、特定ブランチの取得も可能

- セットアップ（actions/setup-node など）  
  - Node.jsのセットアップ（バージョン指定、LTS指定、バージョンマトリクス）
  - Pythonのセットアップ（キャッシュ利用、pipキャッシュ、requirements.txt対応）

- テスト・ビルド・デプロイ  
  - 単体テスト（Jest, Pytest, PHPUnitなど）
  - デプロイ例  
    - GitHub Pagesへのデプロイ（actions/deploy-pages）
    - クラウドサービスへのデプロイ（AWS, Azure, GCP等）

  ```mermaid
  %% 代表的なワークフロー例（詳細）
  graph TD
    A[checkout] --> B[setup-node]
    B --> C["install dependencies"]
    C --> D[lint]
    D --> E[test]
    E --> F[build]
    F --> G["upload-artifact"]
    G --> H[deploy]
    H --> I["通知(Slack)"]
  ```

  <!-- 追加: セットアップのバリエーション（詳細） -->
  ```mermaid
  %% セットアップ例（詳細）
  graph TD
    S1[setup-node] --> N1[Node.js v18]
    S1 --> N2[Node.js LTS]
    S1 --> N3[Node.js v20]
    S2[setup-python] --> P1[Python 3.10]
    S2 --> P2[Python 3.11]
    S2 --> P3[Python 3.12]
    S3[setup-java] --> J1[Java 17]
    S3 --> J2[Java 21]
  ```

---

## 注意点・ベストプラクティス

- セキュリティ  
  - 権限設定（最小権限の原則、GITHUB_TOKENのスコープ、ワークフローごとの権限制御）
- シークレット管理  
  - secretsの使い方（環境変数としての利用、マスキング、組織/リポジトリ単位の管理）
- 実行コスト  
  - 無料枠の消費（実行時間の最適化、キャッシュ活用、不要なジョブのスキップ）

  <!-- 追加: セキュリティとシークレット管理の関係図（詳細） -->
  ```mermaid
  %% セキュリティとシークレット管理（詳細）
  graph LR
    U[ユーザー] -->|push| GH[GitHub Actions]
    GH -->|GITHUB_TOKEN| Repo[リポジトリ]
    GH -->|secrets| Env[環境変数]
    Env -->|マスキング| Log[ログ]
    GH -->|最小権限| Perm[パーミッション設定]
    GH -->|組織/リポジトリ単位| Scope[スコープ管理]
    secrets -.->|暗号化| Env
    secrets -.->|管理画面| Admin[管理者]
  ```

---

## 参考リンク

- 公式ドキュメント  
  https://docs.github.com/ja/actions
- サンプル集  
  - GitHub Marketplace: https://github.com/marketplace?type=actions
  - コミュニティ事例: https://github.com/topics/github-actions-examples

---