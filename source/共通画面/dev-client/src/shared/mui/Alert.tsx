// MUIのAlertコンポーネントをラップした共通アラートコンポーネント
import React from 'react';
import MuiAlert, { AlertProps as MuiAlertProps, AlertColor } from '@mui/material/Alert';

/**
 * 共通アラートコンポーネントのプロパティ
 */
export interface AlertProps extends Omit<MuiAlertProps, 'title'> {
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

/**
 * 共通アラートコンポーネント
 * @param props AlertProps
 * @returns アラート表示
 * @example
 * ```tsx
 * <Alert _severity="success" _title="完了" _onClose={() => {}}>
 *   データの保存に成功しました。
 * </Alert>
 * <Alert _severity="error" _title="エラー">
 *   保存に失敗しました。再度お試しください。
 * </Alert>
 * <Alert _severity="info">
 *   お知らせがあります。
 * </Alert>
 * ```
 */
const Alert: React.FC<AlertProps> = ({
  _severity = 'info',
  _title,
  _children,
  _elevation = 6,
  _variant = 'filled',
  _onClose,
  _sx,
  ...rest
}) => {
  return (
    <MuiAlert
      severity={_severity}
      elevation={_elevation}
      variant={_variant}
      onClose={_onClose}
      sx={_sx}
      {...rest}
    >
      {_title && <strong>{_title}</strong>}
      {_children}
    </MuiAlert>
  );
};

export default Alert;
