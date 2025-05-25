# ディレクトリ構成

---

src
│  App.css
│  App.test.tsx
│  App.tsx
│  index.css
│  index.tsx
│  logo.svg
│  react-app-env.d.ts
│  reportWebVitals.ts
│  setupTests.ts
│  
├─app              # 各画面や機能ごとのディレクトリ
│  ├─home          # ホーム画面関連
│  │  ├─api        # API通信関連の処理
│  │  ├─assets     # 画像やスタイルなどの静的リソース
│  │  ├─hooks      # カスタムフック
│  │  ├─layout     # レイアウト関連
│  │  ├─stores     # 状態管理
│  │  └─types      # 型定義
│  └─login         # ログイン画面関連
│      ├─api       # API通信関連の処理
│      ├─assets    # 画像やスタイルなどの静的リソース
│      ├─hooks     # カスタムフック
│      ├─layout    # レイアウト関連
│      ├─stores    # 状態管理
│      └─types     # 型定義
├─shared           # アプリ全体で共通利用するリソースやロジック
│   ├─assets       # 共通の画像やスタイル
│   ├─components   # 再利用可能なUIコンポーネント
│   ├─hooks        # 共通カスタムフック
│   ├─layouts      # 共通レイアウト
│   ├─mui          # MUI（Material-UI）関連のカスタマイズ
│   ├─routes       # ルーティング設定
│   ├─schemas      # バリデーションスキーマ等
│   ├─stores       # 共通状態管理
│   ├─types        # 共通型定義
│   ├─utils        # 汎用ユーティリティ関数
│   ├─constants    # 定数管理
│   ├─services     # サービス層（APIラッパーやビジネスロジック）
│   ├─config       # 設定ファイル（環境変数やアプリ設定）
│   ├─locales      # 多言語対応（i18n用の翻訳ファイルなど）
│   ├─validators   # バリデーション関数
│   ├─themes       # テーマ設定
│   ├─errors       # エラー管理
│   ├─permissions  # 権限管理
│   └─logger       # ロギング機能
└─tests            # テストコード（ユニット・統合・E2Eなど）

---