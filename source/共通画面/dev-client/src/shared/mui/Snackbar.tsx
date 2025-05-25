// MUIのSnackbarをラップした共通コンポーネント

import React from 'react';
// MUIのSnackbarとAlertをインポート
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

/**
 * Alertのラッパーコンポーネント
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * 共通Snackbarコンポーネントのプロパティ
 * @property _open スナックバーの表示状態
 * @property _message 表示するメッセージ
 * @property _severity アラートの種類（success, info, warning, error）
 * @property _autoHideDuration 自動で閉じるまでの時間（ミリ秒）
 * @property _onClose 閉じる時のコールバック
 * @property _anchorOrigin スナックバーの表示位置
 * @property _action スナックバーに表示する追加アクション
 * @property _alertProps Alertコンポーネントに渡す追加プロパティ
 * @property _snackbarProps Snackbarコンポーネントに渡す追加プロパティ
 */
export interface SnackbarProps {
  /** スナックバーの表示状態 */
  _open: boolean;
  /** 表示するメッセージ */
  _message: string;
  /** アラートの種類（success, info, warning, error） */
  _severity?: 'success' | 'info' | 'warning' | 'error';
  /** 自動で閉じるまでの時間（ミリ秒） */
  _autoHideDuration?: number;
  /** 閉じる時のコールバック */
  _onClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  /** スナックバーの表示位置 */
  _anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  /** スナックバーに表示する追加アクション */
  _action?: React.ReactNode;
  /** Alertコンポーネントに渡す追加プロパティ */
  _alertProps?: Partial<AlertProps>;
  /** Snackbarコンポーネントに渡す追加プロパティ */
  _snackbarProps?: Partial<React.ComponentProps<typeof Snackbar>>;
}

/**
 * 共通Snackbarコンポーネント
 * @param props SnackbarProps
 * @returns JSX.Element
 */
const CommonSnackbar: React.FC<SnackbarProps> = ({
  _open,
  _message,
  _severity = 'info',
  _autoHideDuration = 3000,
  _onClose,
  _anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  _action,
  _alertProps,
  _snackbarProps,
}) => {
  return (
    <Snackbar
      open={_open}
      autoHideDuration={_autoHideDuration}
      onClose={_onClose}
      anchorOrigin={_anchorOrigin}
      action={_action}
      {..._snackbarProps}
    >
      <Alert
        onClose={_onClose}
        severity={_severity}
        sx={{ width: '100%' }}
        {..._alertProps}
      >
        {_message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;

/**
 * 使用例
 * 
 * ```tsx
 * import React, { useState } from 'react';
 * import CommonSnackbar from './Snackbar';
 * 
 * const Example = () => {
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Show Snackbar</button>
 *       <CommonSnackbar
 *         _open={open}
 *         _message="保存しました"
 *         _severity="success"
 *         _autoHideDuration={4000}
 *         _onClose={() => setOpen(false)}
 *         _anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
 *         _action={<button onClick={() => setOpen(false)}>閉じる</button>}
 *       />
 *     </>
 *   );
 * };
 * ```
 */