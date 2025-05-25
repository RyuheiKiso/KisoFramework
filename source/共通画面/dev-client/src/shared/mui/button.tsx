// MUIのButtonコンポーネントをインポート
import React from 'react';
import Button from '@mui/material/Button';

/**
 * 共通MUIボタンのプロパティ型
 */
export interface MuiButtonProps {
  /** ボタンに表示する内容（テキストや要素） */
  _children: React.ReactNode;
  /** クリック時のイベントハンドラ */
  _onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** ボタンのバリアント（'contained', 'outlined', 'text'） */
  _variant?: 'contained' | 'outlined' | 'text';
  /** ボタンの色（'primary', 'secondary', 'inherit', 'success', 'error', 'info', 'warning'） */
  _color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'info' | 'warning';
  /** ボタンの無効化（trueで非活性） */
  _disabled?: boolean;
  /** ボタンのサイズ（'small', 'medium', 'large'） */
  _size?: 'small' | 'medium' | 'large';
  /** ボタンの幅を親要素いっぱいに広げるか */
  _fullWidth?: boolean;
  /** ボタンの型（'button', 'submit', 'reset'） */
  _type?: 'button' | 'submit' | 'reset';
  /** ボタンの開始アイコン（左側） */
  _startIcon?: React.ReactNode;
  /** ボタンの終了アイコン（右側） */
  _endIcon?: React.ReactNode;
  /** ボタンに付与する追加クラス名 */
  _className?: string;
  /** ボタンのスタイル（インラインCSS） */
  _style?: React.CSSProperties;
  /** aria-label属性（アクセシビリティ用ラベル） */
  _ariaLabel?: string;
  /** aria-controls属性（制御対象ID） */
  _ariaControls?: string;
  /** aria-haspopup属性（ポップアップ有無） */
  _ariaHaspopup?: boolean;
  /** aria-expanded属性（展開状態） */
  _ariaExpanded?: boolean;
  /** ボタンの自動フォーカス（初期表示時に自動でフォーカス） */
  _autoFocus?: boolean;
  /** ボタンのID属性 */
  _id?: string;
  /** ボタンのname属性 */
  _name?: string;
  /** ボタンのform属性（フォームIDを指定） */
  _form?: string;
  /** ボタンのvalue属性 */
  _value?: string | number | readonly string[];
  /** ボタンのtitle属性（ツールチップ等） */
  _title?: string;
  /** ボタンのedge属性（アイコンボタン用：'start' | 'end' | false） */
  _edge?: 'start' | 'end' | false;
  /** ボタンのdisableElevation属性（影の無効化） */
  _disableElevation?: boolean;
  /** ボタンのdisableFocusRipple属性（フォーカス時のリップル無効化） */
  _disableFocusRipple?: boolean;
  /** ボタンのdisableRipple属性（リップルエフェクト無効化） */
  _disableRipple?: boolean;
  /** ボタンのtabIndex属性（タブ移動順） */
  _tabIndex?: number;
  /** ボタンのデータ属性（data-*） */
  [dataAttr: `data-${string}`]: any;
  /** その他のButtonProps（MUI Buttonの全プロパティを許容） */
  [key: string]: any;
}

/**
 * 共通MUIボタンコンポーネント
 * @param props MuiButtonProps
 * @returns MUIボタン
 */
const MuiButton: React.FC<MuiButtonProps> = (props) => {
  return (
    <Button
      variant={props._variant || 'contained'}
      color={props._color || 'primary'}
      onClick={props._onClick}
      disabled={props._disabled}
      size={props._size}
      fullWidth={props._fullWidth}
      type={props._type}
      startIcon={props._startIcon}
      endIcon={props._endIcon}
      tabIndex={props._tabIndex}
      className={props._className}
      style={props._style}
      aria-label={props._ariaLabel}
      aria-controls={props._ariaControls}
      aria-haspopup={props._ariaHaspopup}
      aria-expanded={props._ariaExpanded}
      autoFocus={props._autoFocus}
      id={props._id}
      name={props._name}
      form={props._form}
      value={props._value}
      title={props._title}
      disableElevation={props._disableElevation}
      disableFocusRipple={props._disableFocusRipple}
      disableRipple={props._disableRipple}
      // Spread only data-* attributes and other valid props
      {...Object.keys(props)
        .filter(
          (key) =>
            key.startsWith('data-') &&
            Object.prototype.hasOwnProperty.call(props, key)
        )
        .reduce((acc, key) => {
          acc[key] = props[key];
          return acc;
        }, {} as Record<string, any>)}
    >
      {props._children}
    </Button>
  );
};

export default MuiButton;
