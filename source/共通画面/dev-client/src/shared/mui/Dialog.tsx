// MUIのDialogコンポーネントをラップしたカスタムコンポーネント

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * ダイアログコンポーネントのプロパティ
 */
export interface _DialogProps {
  /**
   * ダイアログの開閉状態
   * trueでダイアログを表示
   */
  _open: boolean;
  /**
   * ダイアログタイトル
   * 省略時はタイトル非表示
   */
  _title?: string;
  /**
   * ダイアログ本文
   * 任意のReactノードを指定可能
   */
  _children?: React.ReactNode;
  /**
   * ダイアログを閉じる時のコールバック
   */
  _onClose: () => void;
  /**
   * アクションボタンのラベル
   * 省略時は"OK"
   */
  _actionLabel?: string;
  /**
   * アクションボタン押下時のコールバック
   * 指定しない場合は_onCloseのみ実行
   */
  _onAction?: () => void;
  /**
   * キャンセルボタンのラベル
   * 省略時は"キャンセル"
   */
  _cancelLabel?: string;
  /**
   * キャンセルボタンを非表示にするか
   * デフォルトはfalse（表示）
   */
  _hideCancel?: boolean;
  /**
   * ダイアログの最大幅（xs/sm/md/lg/xl）
   * 省略時は"sm"
   */
  _maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * フルスクリーン表示にするか
   * デフォルトはfalse
   */
  _fullScreen?: boolean;
  /**
   * ダイアログを閉じる操作（背景クリック・ESC）を無効化するか
   * デフォルトはfalse
   */
  _disableBackdropClick?: boolean;
  /**
   * アクションボタンの色
   * デフォルトは"primary"
   */
  _actionColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /**
   * アクションボタンを非活性にするか
   * デフォルトはfalse
   */
  _actionDisabled?: boolean;
  /**
   * キャンセルボタンを非活性にするか
   * デフォルトはfalse
   */
  _cancelDisabled?: boolean;
  /**
   * アクションボタンのvariant
   * デフォルトは"contained"
   */
  _actionVariant?: 'text' | 'outlined' | 'contained';
  /**
   * キャンセルボタンのvariant
   * デフォルトは"text"
   */
  _cancelVariant?: 'text' | 'outlined' | 'contained';
  /**
   * ダイアログのPaperProps
   * MUI PaperPropsをそのまま渡せます
   */
  _paperProps?: React.ComponentProps<typeof Dialog>['PaperProps'];
  /**
   * ダイアログのTransitionProps
   * MUI TransitionPropsをそのまま渡せます
   */
  _transitionProps?: React.ComponentProps<typeof Dialog>['TransitionProps'];
  /**
   * ダイアログのz-index
   * 省略時はMUIデフォルト
   */
  _zIndex?: number;
  /**
   * ダイアログのID属性
   * テストやアクセシビリティ用途
   */
  _id?: string;
  /**
   * ダイアログ右上に閉じるアイコンボタンを表示するか
   * デフォルトはfalse
   */
  _showCloseIcon?: boolean;
  /**
   * ダイアログが閉じた後に呼ばれるコールバック
   */
  _onExited?: () => void;
  /**
   * DialogContentのprops
   * MUI DialogContentPropsをそのまま渡せます
   */
  _dialogContentProps?: React.ComponentProps<typeof DialogContent>;
  /**
   * DialogActionsのprops
   * MUI DialogActionsPropsをそのまま渡せます
   */
  _dialogActionsProps?: React.ComponentProps<typeof DialogActions>;
  /**
   * DialogTitleのprops
   * MUI DialogTitlePropsをそのまま渡せます
   */
  _dialogTitleProps?: React.ComponentProps<typeof DialogTitle>;
  /**
   * アクションボタンにautoFocusを付与するか
   * デフォルトはfalse
   */
  _autoFocusAction?: boolean;
  /**
   * キャンセルボタンにautoFocusを付与するか
   * デフォルトはfalse
   */
  _autoFocusCancel?: boolean;
}

const CustomDialog: React.FC<_DialogProps> = ({
  _open,
  _title,
  _children,
  _onClose,
  _actionLabel = 'OK',
  _onAction,
  _cancelLabel = 'キャンセル',
  _hideCancel = false,
  _maxWidth = 'sm',
  _fullScreen = false,
  _disableBackdropClick = false,
  _actionColor = 'primary',
  _actionDisabled = false,
  _cancelDisabled = false,
  _actionVariant = 'contained',
  _cancelVariant = 'text',
  _paperProps,
  _transitionProps,
  _zIndex,
  _id,
  _showCloseIcon = false,
  _onExited,
  _dialogContentProps,
  _dialogActionsProps,
  _dialogTitleProps,
  _autoFocusAction = false,
  _autoFocusCancel = false,
}) => {
  // アクションボタン押下時の処理
  const handleAction = () => {
    if (_onAction) _onAction();
    _onClose();
  };

  return (
    <Dialog
      open={_open}
      onClose={_disableBackdropClick ? undefined : _onClose}
      maxWidth={_maxWidth}
      fullScreen={_fullScreen}
      disableEscapeKeyDown={_disableBackdropClick}
      PaperProps={{
        ..._paperProps,
        ...(typeof _zIndex === 'number' ? { style: { ...( _paperProps?.style || {} ), zIndex: _zIndex } } : {}),
      }}
      TransitionProps={{
        ..._transitionProps,
        ...(typeof _onExited === 'function' ? { onExited: _onExited } : {}),
      }}
      id={_id}
    >
      {_title && (
        <DialogTitle {..._dialogTitleProps} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...(_dialogTitleProps?.sx || {}) }}>
          <span>{_title}</span>
          {_showCloseIcon && (
            <IconButton
              aria-label="close"
              onClick={_onClose}
              edge="end"
              size="small"
              sx={{ ml: 1 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent {..._dialogContentProps}>
        {_children}
      </DialogContent>
      <DialogActions {..._dialogActionsProps}>
        {!_hideCancel && (
          <Button
            onClick={_onClose}
            disabled={_cancelDisabled}
            variant={_cancelVariant}
            autoFocus={_autoFocusCancel}
          >
            {_cancelLabel}
          </Button>
        )}
        <Button
          onClick={handleAction}
          variant={_actionVariant}
          color={_actionColor}
          disabled={_actionDisabled}
          autoFocus={_autoFocusAction}
        >
          {_actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;

/**
 * 使用例
 * 
 * // シンプルなダイアログ
 * <CustomDialog
 *   _open={dialogOpen}
 *   _title="確認"
 *   _children="本当に削除しますか？"
 *   _onClose={() => setDialogOpen(false)}
 *   _onAction={handleDelete}
 * />
 * 
 * // カスタマイズ例
 * <CustomDialog
 *   _open={dialogOpen}
 *   _title="エラー"
 *   _children={<span style={{ color: 'red' }}>エラーが発生しました</span>}
 *   _onClose={() => setDialogOpen(false)}
 *   _actionLabel="再試行"
 *   _cancelLabel="閉じる"
 *   _actionColor="error"
 *   _actionVariant="outlined"
 *   _cancelVariant="contained"
 *   _maxWidth="xs"
 *   _fullScreen={false}
 *   _disableBackdropClick={true}
 *   _actionDisabled={isProcessing}
 *   _cancelDisabled={isProcessing}
 *   _paperProps={{ elevation: 8 }}
 *   _zIndex={2000}
 *   _id="error-dialog"
 *   _showCloseIcon
 *   _onExited={() => console.log('closed')}
 *   _dialogContentProps={{ dividers: true }}
 *   _dialogActionsProps={{ sx: { justifyContent: 'flex-end' } }}
 *   _dialogTitleProps={{ sx: { bgcolor: 'error.main', color: 'white' } }}
 *   _autoFocusAction
 * />
 * 
 * // キャンセルボタンにautoFocusを付与
 * <CustomDialog
 *   _open={dialogOpen}
 *   _title="キャンセル確認"
 *   _children="本当にキャンセルしますか？"
 *   _onClose={() => setDialogOpen(false)}
 *   _hideCancel={false}
 *   _autoFocusCancel
 * />
 */
