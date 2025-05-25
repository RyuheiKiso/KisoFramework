# ディレクトリ構成

---

src                                // プロジェクトのルートディレクトリ
│  App.css                         // アプリ全体のスタイル
│  App.test.tsx                    // Appコンポーネントのテスト
│  App.tsx                         // ルートコンポーネント
│  index.css                       // グローバルスタイル
│  index.tsx                       // エントリーポイント
│  logo.svg                        // ロゴ画像
│  react-app-env.d.ts              // 型定義（React用）
│  reportWebVitals.ts              // パフォーマンス測定
│  setupTests.ts                   // テストセットアップ
│  
├─app                              // 各画面や機能ごとのディレクトリ
│   ├─home                         // ホーム画面関連
│   │  ├─api                       // API通信関連の処理
│   │  │  └─ homeApi.ts            // ホーム画面用API関数
│   │  ├─assets                    // 画像やスタイルなどの静的リソース
│   │  │  ├─ homeBanner.png        // ホーム画面バナー画像
│   │  │  └─ home.module.css       // ホーム画面専用CSS
│   │  ├─hooks                     // カスタムフック
│   │  │  └─ useHomeData.ts        // ホーム画面用カスタムフック
│   │  ├─layout                    // レイアウト関連
│   │  │  └─ HomeLayout.tsx        // ホーム画面レイアウト
│   │  ├─stores                    // 状態管理
│   │  │  └─ homeStore.ts          // ホーム画面用状態管理
│   │  └─types                     // 型定義
│   │     └─ homeTypes.ts          // ホーム画面用型定義
│   └─login                        // ログイン画面関連
│      ├─api                       // API通信関連の処理
│      │  └─ loginApi.ts           // ログインAPI関数
│      ├─assets                    // 画像やスタイルなどの静的リソース
│      │  ├─ loginLogo.svg         // ログイン画面ロゴ画像
│      │  └─ login.module.css      // ログイン画面専用CSS
│      ├─hooks                     // カスタムフック
│      │  └─ useLogin.ts           // ログイン用カスタムフック
│      ├─layout                    // レイアウト関連
│      │  └─ LoginLayout.tsx       // ログイン画面レイアウト
│      ├─stores                    // 状態管理
│      │  └─ loginStore.ts         // ログイン画面用状態管理
│      └─types                     // 型定義
│         └─ loginTypes.ts         // ログイン画面用型定義
├─shared                           // アプリ全体で共通利用するリソースやロジック
│   ├─assets                       // 共通の画像やスタイル
│   │  ├─ logo.svg                 // 共通ロゴ画像
│   │  └─ shared.module.css        // 共通スタイル
│   ├─components                   // 再利用可能なUIコンポーネント
│   │  ├─ Button.tsx               // ボタンコンポーネント
│   │  └─ Modal.tsx                // モーダルコンポーネント
│   ├─hooks                        // 共通カスタムフック
│   │  └─ useWindowSize.ts         // ウィンドウサイズ取得フック
│   ├─layouts                      // 共通レイアウト
│   │  └─ MainLayout.tsx           // メインレイアウト
│   ├─mui                          // MUI（Material-UI）関連のカスタマイズ
│   │  └─ theme.ts                 // MUIテーマ設定
│   ├─routes                       // ルーティング設定
│   │  └─ AppRoutes.tsx            // ルーティング定義
│   ├─schemas                      // バリデーションスキーマ等
│   │  └─ userSchema.ts            // ユーザーバリデーションスキーマ
│   ├─stores                       // 共通状態管理
│   │  └─ appStore.ts              // アプリ全体の状態管理
│   ├─types                        // 共通型定義
│   │  └─ commonTypes.ts           // 共通型定義
│   ├─utils                        // 汎用ユーティリティ関数
│   │  └─ formatDate.ts            // 日付フォーマット関数
│   ├─constants                    // 定数管理
│   │  └─ appConstants.ts          // アプリ定数
│   ├─services                     // サービス層（APIラッパーやビジネスロジック）
│   │  └─ apiService.ts            // APIサービス
│   ├─config                       // 設定ファイル（環境変数やアプリ設定）
│   │  └─ appConfig.ts             // アプリ設定
│   ├─locales                      // 多言語対応（i18n用の翻訳ファイルなど）
│   │  └─ ja.json                  // 日本語翻訳ファイル
│   ├─validators                   // バリデーション関数
│   │  └─ emailValidator.ts        // メールバリデータ
│   ├─themes                       // テーマ設定
│   │  └─ lightTheme.ts            // ライトテーマ設定
│   ├─errors                       // エラー管理
│   │  └─ errorHandler.ts          // エラーハンドラ
│   ├─permissions                  // 権限管理
│   │  └─ permissionList.ts        // 権限リスト
│   └─logger                       // ロギング機能
│      └─ logger.ts                // ログ出力ユーティリティ
└─tests                            // テストコード（ユニット・統合・E2Eなど）
    ├─ home.test.tsx               // ホーム画面テスト
    ├─ login.test.tsx              // ログイン画面テスト
    └─ utils.test.ts               // ユーティリティ関数テスト

---