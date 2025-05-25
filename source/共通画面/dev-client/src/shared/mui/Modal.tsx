// MUIのModalコンポーネントをインポート
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

/**
 * Modalコンポーネントのプロパティ
 */
interface _ModalProps {
  /**
   * モーダルの開閉状態
   */
  _open: boolean;
  /**
   * モーダルを閉じるときのコールバック
   */
  _onClose: () => void;
  /**
   * モーダル内に表示する内容
   */
  _children: React.ReactNode;
  /**
   * モーダルのスタイル（Boxコンポーネントのsxプロパティに渡す）
   * 例: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', ... }
   */
  _sx?: object;
  /**
   * モーダルのクラス名
   */
  _className?: string;
  /**
   * モーダルのID
   */
  _id?: string;
  /**
   * モーダルのaria-labelledby属性
   */
  _ariaLabelledby?: string;
  /**
   * モーダルのaria-describedby属性
   */
  _ariaDescribedby?: string;
  /**
   * モーダルのBackdropComponentをカスタマイズ
   */
  _BackdropComponent?: React.ElementType<import('@mui/material/Backdrop').BackdropProps>;
  /**
   * モーダルのBackdropProps
   */
  _BackdropProps?: object;
  /**
   * モーダルのtransitionDuration
   */
  _transitionDuration?: number | { appear?: number; enter?: number; exit?: number };
  /**
   * バックドロップクリックでモーダルを閉じるかどうか
   * falseの場合、バックドロップクリックで閉じなくなる
   * @default false
   */
  /**
   * バックドロップクリックでモーダルを閉じるかどうか
   * falseの場合、バックドロップクリックで閉じなくなる
   * @default false
   */
  _disableBackdropClick?: boolean;
  /**
   * Escapeキーでモーダルを閉じるかどうか
   * falseの場合、Escapeキーで閉じなくなる
   * @default false
   */
  _disableEscapeKeyDown?: boolean;
  /**
   * モーダルをアンマウントせずにDOMに残すか
   * trueの場合、非表示時もDOMに残る
   * @default false
   */
  _keepMounted?: boolean;
  /**
   * モーダルをレンダリングするコンテナ
   * 例: () => document.getElementById('modal-root')
   */
  _container?: Element | (() => Element | null) | null;
  /**
   * モーダルのPaperProps
   */
  _PaperProps?: object;
  /**
   * モーダルのstyle属性
   */
  _style?: React.CSSProperties;
  /**
   * モーダル表示時に自動でフォーカスを当てるか
   * @default true
   */
  _disableAutoFocus?: boolean;
  /**
   * フォーカスをモーダル内に強制するか
   * @default true
   */
  _disableEnforceFocus?: boolean;
  /**
   * モーダルを閉じたときに元の要素へフォーカスを戻すか
   * @default true
   */
  _disableRestoreFocus?: boolean;
  /**
   * バックドロップを非表示にするか
   * @default false
   */
  _hideBackdrop?: boolean;
  /**
   * モーダルを閉じた後にフォーカスを当てる要素
   */
  _focusAfterClose?: Element | null;
  /**
   * トランジション後にモーダルを開くか
   * @default true
   */
  _openAfterTransition?: boolean;
  /**
   * バックドロップクリック時のコールバック
   */
  _onBackdropClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /**
   * トランジション開始時のコールバック
   */
  _onTransitionEnter?: () => void;
  /**
   * トランジション終了時のコールバック
   */
  _onTransitionExited?: () => void;
}

/**
 * MUIのModalラッパーコンポーネント
 * @param _open モーダルの開閉状態
 * @param _onClose モーダルを閉じるコールバック
 * @param _children モーダル内の内容
 * @param _sx モーダルのスタイル
 * @param _className モーダルのクラス名
 * @param _id モーダルのID
 * @param _ariaLabelledby aria-labelledby属性
 * @param _ariaDescribedby aria-describedby属性
 * @param _BackdropComponent BackdropComponent
 * @param _BackdropProps BackdropProps
 * @param _transitionDuration トランジション時間
 * @param _disableBackdropClick バックドロップクリックで閉じるか
 * @param _disableEscapeKeyDown Escapeキーで閉じるか
 * @param _keepMounted 非表示時もDOMに残すか
 * @param _container レンダリング先コンテナ
 * @param _PaperProps PaperProps
 * @param _style style属性
 * @param _disableAutoFocus 自動フォーカス無効
 * @param _disableEnforceFocus フォーカス強制無効
 * @param _disableRestoreFocus フォーカス復元無効
 * @param _hideBackdrop バックドロップ非表示
 * @param _focusAfterClose 閉じた後にフォーカスする要素
 * @param _openAfterTransition トランジション後に開く
 * @param _onBackdropClick バックドロップクリック時コールバック
 * @param _onTransitionEnter トランジション開始時コールバック
 * @param _onTransitionExited トランジション終了時コールバック
 */
const KfModal: React.FC<_ModalProps> = ({
  _open,
  _onClose,
  _children,
  _sx,
  _className,
  _id,
  _ariaLabelledby,
  _ariaDescribedby,
  _BackdropComponent,
  _BackdropProps,
  _transitionDuration,
  _disableBackdropClick,
  _disableEscapeKeyDown,
  _keepMounted,
  _container,
  _PaperProps,
  _style,
  _disableAutoFocus,
  _disableEnforceFocus,
  _disableRestoreFocus,
  _hideBackdrop,
  // _focusAfterClose,
  // _openAfterTransition,
  _onBackdropClick,
  _onTransitionEnter,
  _onTransitionExited,
}) => {
  return (
    <Modal
      open={_open}
      BackdropComponent={_BackdropComponent}
      BackdropProps={_transitionDuration ? { ..._BackdropProps, transitionDuration: _transitionDuration } : _BackdropProps}
      closeAfterTransition
      disableEnforceFocus={_disableEnforceFocus}
      disableAutoFocus={_disableAutoFocus}
      disableRestoreFocus={_disableRestoreFocus}
      hideBackdrop={_hideBackdrop}
      // focusAfterClose and openAfterTransition are not valid props for MUI Modal
      keepMounted={_keepMounted}
      container={_container}
      className={_className}
      id={_id}
      aria-labelledby={_ariaLabelledby}
      aria-describedby={_ariaDescribedby}
      disableEscapeKeyDown={_disableEscapeKeyDown}
      onTransitionEnter={_onTransitionEnter}
      onTransitionExited={_onTransitionExited}
      onClose={(event, reason) => {
        if (_disableBackdropClick && reason === 'backdropClick') {
          return;
        }
        if (_onBackdropClick && reason === 'backdropClick') {
          _onBackdropClick(event as React.MouseEvent<HTMLDivElement, MouseEvent>);
        }
        _onClose();
      }}
    >
      <Box sx={_sx} style={_style} {..._PaperProps}>
        {_children}
      </Box>
    </Modal>
  );
};

export default KfModal;

/**
 * 使用例:
 * 
 * ```tsx
 * import KfModal from './Modal';
 * 
 * function Example() {
 *   const [open, setOpen] = React.useState(false);
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Open Modal</button>
 *       <KfModal
 *         _open={open}
 *         _onClose={() => setOpen(false)}
 *         _sx={{
 *           position: 'absolute',
 *           top: '50%',
 *           left: '50%',
 *           transform: 'translate(-50%, -50%)',
 *           bgcolor: 'background.paper',
 *           boxShadow: 24,
 *           p: 4,
 *         }}
 *         _ariaLabelledby="modal-title"
 *         _ariaDescribedby="modal-description"
 *         _disableBackdropClick={true}
 *         _disableEscapeKeyDown={false}
 *         _keepMounted={true}
 *         _hideBackdrop={false}
 *         _disableAutoFocus={false}
 *         _disableEnforceFocus={false}
 *         _disableRestoreFocus={false}
 *         _onBackdropClick={() => alert('Backdrop clicked!')}
 *         _onTransitionEnter={() => console.log('Transition enter')}
 *         _onTransitionExited={() => console.log('Transition exited')}
 *         _style={{ borderRadius: 8 }}
 *       >
 *         <h2 id="modal-title">タイトル</h2>
 *         <p id="modal-description">ここに内容を記載します。</p>
 *       </KfModal>
 *     </>
 *   );
 * }
 * ```
 */