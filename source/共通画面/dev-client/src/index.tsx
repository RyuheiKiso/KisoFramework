// Reactライブラリをインポート
import React from 'react';
// ReactDOMクライアントをインポート
import ReactDOM from 'react-dom/client';
// CSSファイルをインポート
import './index.css';
// Appコンポーネントをインポート
import App from './App';
// パフォーマンス測定用モジュールをインポート
import reportWebVitals from './reportWebVitals';

// ルート要素を取得し、Reactアプリケーションをマウント
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // ルート要素を取得
);
// アプリケーションを描画
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// パフォーマンス測定を開始（必要に応じてコールバックを渡す）
// 例: reportWebVitals(console.log)
reportWebVitals();
