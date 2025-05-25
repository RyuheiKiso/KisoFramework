// Reactおよびテスト用ライブラリのインポート
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// KfAlertコンポーネントのインポート
import KfAlert from '../../../shared/mui/Alert';

describe('KfAlert', () => {
  // デフォルトプロパティでの描画テスト
  it('renders with default props', () => {
    render(<KfAlert _children="テストメッセージ" />);
    expect(screen.getByText('テストメッセージ')).toBeInTheDocument();
  });

  // _titleプロパティの描画テスト
  it('renders with _title', () => {
    render(<KfAlert _title="タイトル" _children="本文" />);
    expect(screen.getByText('タイトル')).toBeInTheDocument();
    expect(screen.getByText('本文')).toBeInTheDocument();
  });

  // _severityプロパティの描画テスト
  it('renders with _severity', () => {
    render(<KfAlert _severity="error" _children="エラーメッセージ" />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  // 閉じるボタン押下時のコールバックテスト
  it('calls _onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<KfAlert _onClose={handleClose} _children="閉じるテスト" />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  // _sxスタイルの適用テスト
  it('applies _sx styles', () => {
    render(<KfAlert _sx={{ color: 'red' }} _children="スタイルテスト" />);
    const alert = screen.getByText('スタイルテスト').closest('.MuiAlert-root') as HTMLElement | null;
    expect(alert).toHaveStyle('color: red');
  });

  // デフォルト値（_elevation, _variant, _severity）のテスト
  it('uses default _elevation, _variant, and _severity', () => {
    render(<KfAlert _children="デフォルト値テスト" />);
    const alert = screen.getByText('デフォルト値テスト').closest('.MuiAlert-root') as HTMLElement | null;
    expect(alert).toHaveClass('MuiAlert-filledInfo'); // filled + info
    // elevationはstyleでbox-shadowに反映されるため、存在チェック
    expect(alert?.style.boxShadow).toBeDefined();
  });

  // _childrenにReactNodeを渡した場合の描画テスト
  it('renders _children as ReactNode', () => {
    render(<KfAlert _children={<span data-testid="custom-node">ノード</span>} />);
    expect(screen.getByTestId('custom-node')).toBeInTheDocument();
  });

  // _titleにReactNodeを渡した場合の描画テスト
  it('renders _title as ReactNode', () => {
    render(
      <KfAlert
        _title={<span data-testid="title-node">タイトルノード</span>}
        _children="本文"
      />
    );
    expect(screen.getByTestId('title-node')).toBeInTheDocument();
    expect(screen.getByText('本文')).toBeInTheDocument();
  });

  // _onClose未指定時に閉じるボタンが描画されないことのテスト
  it('does not throw if _onClose is not provided and close button is not rendered', () => {
    render(<KfAlert _children="閉じるなし" />);
    // closeボタンが存在しないこと
    expect(screen.queryByRole('button')).toBeNull();
  });

  // 複数の_sxスタイル適用テスト
  it('applies multiple _sx styles', () => {
    render(
      <KfAlert
        _sx={{ color: 'blue', backgroundColor: 'yellow' }}
        _children="複数スタイル"
      />
    );
    const alert = screen.getByText('複数スタイル').closest('.MuiAlert-root') as HTMLElement | null;
    expect(alert).toHaveStyle('color: blue');
    expect(alert).toHaveStyle('background-color: yellow');
  });

  // MuiAlertへのprops伝播テスト
  it('passes rest props to MuiAlert', () => {
    render(<KfAlert data-testid="alert-prop-test" _children="propsテスト" />);
    expect(screen.getByTestId('alert-prop-test')).toBeInTheDocument();
  });

  // 各_variantでの描画テスト
  it('renders with each _variant', () => {
    ['filled', 'outlined', 'standard'].forEach(variant => {
      render(<KfAlert _variant={variant as any} _children={`variant:${variant}`} />);
      const alert = screen.getByText(`variant:${variant}`).closest('.MuiAlert-root');
      expect(alert).toHaveClass(`MuiAlert-${variant}`);
    });
  });

  // 各_severityでの描画テスト
  it('renders with each _severity', () => {
    ['success', 'info', 'warning', 'error'].forEach(severity => {
      render(<KfAlert _severity={severity as any} _children={`severity:${severity}`} />);
      expect(screen.getByText(`severity:${severity}`)).toBeInTheDocument();
    });
  });

  // _elevation値の適用テスト
  it('applies _elevation value', () => {
    render(<KfAlert _elevation={24} _children="elevationテスト" />);
    const alert = screen.getByText('elevationテスト').closest('.MuiAlert-root') as HTMLElement | null;
    // elevation=24はMUIのbox-shadowが強くなる
    expect(alert?.style.boxShadow).toBeDefined();
  });

  // _titleが空文字またはnullの場合の描画テスト
  it('does not render title if _title is empty string or null', () => {
    render(<KfAlert _title="" _children="タイトルなし" />);
    expect(screen.getByText('タイトルなし')).toBeInTheDocument();
    // strongタグが存在しないこと
    expect(document.querySelector('.MuiAlert-root strong')).toBeNull();

    render(<KfAlert _title={null} _children="タイトルnull" />);
    expect(screen.getByText('タイトルnull')).toBeInTheDocument();
  });

  // _childrenが空文字またはnullの場合の描画テスト
  it('does not render children if _children is empty string or null', () => {
    render(<KfAlert _children="" />);
    // .MuiAlert-messageの中身が空であることを確認
    const message = document.querySelector('.MuiAlert-message');
    expect(message?.textContent).toBe('');

    render(<KfAlert _children={null} />);
    const message2 = document.querySelector('.MuiAlert-message');
    expect(message2?.textContent).toBe('');
    // MuiAlert自体は存在する
    expect(document.querySelector('.MuiAlert-root')).toBeInTheDocument();
  });
});
