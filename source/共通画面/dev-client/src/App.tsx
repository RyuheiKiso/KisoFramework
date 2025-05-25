// Reactライブラリをインポート
import React from 'react';
// ロゴ画像をインポート
import logo from './logo.svg';
// CSSファイルをインポート
import './App.css';

/**
 * アプリケーションのメインコンポーネント
 * @returns JSX要素
 */
function App() {
  // JSXを返却
  return (
    <div className="App">
      {/* ヘッダー部分 */}
      <header className="App-header">
        {/* ロゴ画像を表示 */}
        <img src={logo} className="App-logo" alt="logo" />
        {/* 説明文を表示 */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* React公式サイトへのリンク */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// Appコンポーネントをエクスポート
export default App;
