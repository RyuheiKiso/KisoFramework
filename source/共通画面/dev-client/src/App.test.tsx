// Reactライブラリをインポート
import React from 'react';
// テスト用ユーティリティをインポート
import { render, screen } from '@testing-library/react';
// Appコンポーネントをインポート
import App from './App';

// 'learn react'リンクが描画されているかテスト
test('renders learn react link', () => {
  // Appコンポーネントを描画
  render(<App />);
  // 'learn react'テキストを取得
  const linkElement = screen.getByText(/learn react/i);
  // 要素が存在することを検証
  expect(linkElement).toBeInTheDocument();
});
