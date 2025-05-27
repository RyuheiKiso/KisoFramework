// MUIのAlertコンポーネントをラップした共通アラートコンポーネント
import React from 'react';
import MuiAlert, { AlertProps as MuiAlertProps, AlertColor } from '@mui/material/Alert';

/**
 * 共通アラートコンポーネントのプロパティ
 */
export interface KfAlertProps extends Omit<MuiAlertProps, 'title'> {
  /**
   * アラートの種別（success, info, warning, error）
   * @default 'info'
   */
  _severity?: AlertColor;
  /**
   * アラートのタイトル
   */
  _title?: React.ReactNode;
  /**
   * elevation値（影の深さ）
   * @default 6
   */
  _elevation?: number;
  /**
   * variantの指定（'filled' | 'outlined' | 'standard'）
   * @default 'filled'
   */
  _variant?: 'filled' | 'outlined' | 'standard';
  /**
   * 閉じるボタンを表示する場合のハンドラ
   */
  _onClose?: MuiAlertProps['onClose'];
  /**
   * sxプロパティでスタイルをカスタマイズ
   */
  _sx?: MuiAlertProps['sx'];
  /**
   * アラートの内容
   */
  _children?: React.ReactNode;
}

// ErrorBoundaryを外部に分離
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // 必要に応じてログ出力など
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('KfAlert ErrorBoundary:', error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <MuiAlert severity="error" elevation={6} variant="filled">
          アラートの表示中にエラーが発生しました。
        </MuiAlert>
      );
    }
    return this.props.children;
  }
}

/**
 * 共通アラートコンポーネント
 * @param props KfAlertProps
 * @returns アラート表示
 * @example
 * ```tsx
 * <KfAlert _severity="success" _title="完了" _onClose={() => {}}>
 *   データの保存に成功しました。
 * </KfAlert>
 * <KfAlert _severity="error" _title="エラー">
 *   保存に失敗しました。再度お試しください。
 * </KfAlert>
 * <KfAlert _severity="info">
 *   お知らせがあります。
 * </KfAlert>
 * ```
 */
const KfAlert: React.FC<KfAlertProps> = (props) => {
  // ErrorBoundaryは外部クラスを利用
  const {
    _severity,
    _title,
    _elevation,
    _variant,
    _onClose,
    _sx,
    _children,
    ...rest
  } = props;

  return (
    <ErrorBoundary>
      <MuiAlert
        {...rest}
        severity={_severity ?? 'info'}
        elevation={_elevation ?? 6}
        variant={_variant ?? 'filled'}
        onClose={_onClose}
        sx={_sx}
      >
        {_title && <strong>{_title}</strong>}
        {_children}
      </MuiAlert>
    </ErrorBoundary>
  );
};

export default KfAlert;
