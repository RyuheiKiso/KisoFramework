// MUIのToggleButtonコンポーネントをラップしたカスタムコンポーネント
import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import type { ToggleButtonProps as MuiToggleButtonProps } from '@mui/material/ToggleButton';

/**
 * ToggleButtonコンポーネントのプロパティ
 */
export interface KfToggleButtonProps {
  /** ボタンの値 */
  _value: any;
  /** 選択状態 */
  _selected?: boolean;
  /** 状態変更時のコールバック */
  _onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  /** 無効化フラグ */
  _disabled?: boolean;
  /** サイズ（small, medium, large） */
  _size?: 'small' | 'medium' | 'large';
  /** 色（standard, primary, secondary, error, info, success, warning） */
  _color?: MuiToggleButtonProps['color'];
  /** 子要素（表示内容） */
  _children?: React.ReactNode;
  /** 追加クラス名 */
  _className?: string;
  /** style属性 */
  _style?: React.CSSProperties;
  /** id属性 */
  _id?: string;
  /** aria-label属性 */
  _ariaLabel?: string;
  /** aria-labelledby属性 */
  _ariaLabelledby?: string;
  /** aria-describedby属性 */
  _ariaDescribedby?: string;
  /** tabIndex属性 */
  _tabIndex?: number;
  /** onClickイベント */
  _onClick?: React.MouseEventHandler<HTMLElement>;
  /** onFocusイベント */
  _onFocus?: React.FocusEventHandler<HTMLElement>;
  /** onBlurイベント */
  _onBlur?: React.FocusEventHandler<HTMLElement>;
  /** sxプロパティ（MUI独自のスタイル指定） */
  _sx?: MuiToggleButtonProps['sx'];
  /** ボタンのtype属性 */
  _type?: 'button' | 'submit' | 'reset';
  /** ボタンのname属性 */
  _name?: string;
  /** ボタンのform属性 */
  _form?: string;
  /** ボタンのtitle属性（ツールチップ等） */
  _title?: string;
  /** ボタンのdisableRipple属性（リップル効果無効） */
  _disableRipple?: boolean;
  /** ボタンのdisableFocusRipple属性（フォーカス時リップル無効） */
  _disableFocusRipple?: boolean;
  /** ボタンのautoFocus属性 */
  _autoFocus?: boolean;
  /** ボタンのref属性 */
  _ref?: React.Ref<HTMLButtonElement>;
  /** ボタンのdata-*属性 */
  [dataAttr: `data-${string}`]: any;
  /** ボタンのedge属性（アイコンボタン用: 'start' | 'end' | false） */
  _edge?: 'start' | 'end' | false;
  /** ボタンのfullWidth属性（親要素いっぱいに広げる） */
  _fullWidth?: boolean;
  /** ボタンのfocusVisibleClassName属性 */
  _focusVisibleClassName?: string;
  /** ボタンのaria-pressed属性 */
  _ariaPressed?: boolean;
  /** ボタンのrole属性 */
  _role?: string;
  /** ボタンのinputProps属性 */
  _inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** その他のToggleButtonProps */
  [key: string]: any;
}

/**
 * MUI ToggleButtonラッパー
 * @param props KfToggleButtonProps
 * @returns ToggleButton
 * @example
 * ```tsx
 * import KfToggleButton from './ToggleButton';
 * import FormatBoldIcon from '@mui/icons-material/FormatBold';
 * 
 * const [selected, setSelected] = React.useState(false);
 * 
 * <KfToggleButton
 *   _value="bold"
 *   _selected={selected}
 *   _onChange={(_, v) => setSelected(!selected)}
 *   _color="primary"
 *   _size="medium"
 *   _ariaLabel="太字"
 *   _children={<FormatBoldIcon />}
 *   _className="my-toggle"
 *   _style={{ margin: 4 }}
 *   _id="toggle-bold"
 *   _tabIndex={0}
 *   _title="太字切替"
 *   _disableRipple={false}
 *   _autoFocus={false}
 *   _edge="start"
 *   _fullWidth={false}
 *   _focusVisibleClassName="focus-visible"
 *   _ariaPressed={selected}
 *   _role="button"
 *   _inputProps={{ 'data-testid': 'toggle-input' }}
 * />
 * ```
 */
const KfToggleButton: React.FC<KfToggleButtonProps> = ({
  _value,
  _selected,
  _onChange,
  _disabled,
  _size,
  _color,
  _children,
  _className,
  _style,
  _id,
  _ariaLabel,
  _ariaLabelledby,
  _ariaDescribedby,
  _tabIndex,
  _onClick,
  _onFocus,
  _onBlur,
  _sx,
  _type,
  _name,
  _form,
  _title,
  _disableRipple,
  _disableFocusRipple,
  _autoFocus,
  _ref,
  _edge,
  _fullWidth,
  _focusVisibleClassName,
  _ariaPressed,
  _role,
  _inputProps,
  ...rest
}) => (
  <ToggleButton
    value={_value}
    selected={_selected}
    onChange={_onChange}
    disabled={_disabled}
    size={_size}
    color={_color}
    className={_className}
    style={_style}
    id={_id}
    aria-label={_ariaLabel}
    aria-labelledby={_ariaLabelledby}
    aria-describedby={_ariaDescribedby}
    tabIndex={_tabIndex}
    onClick={_onClick}
    onFocus={_onFocus}
    onBlur={_onBlur}
    sx={_sx}
    title={_title}
    disableRipple={_disableRipple}
    disableFocusRipple={_disableFocusRipple}
    autoFocus={_autoFocus}
    focusVisibleClassName={_focusVisibleClassName}
    aria-pressed={_ariaPressed}
    role={_role}
    // data-*属性のみ展開
    {...Object.keys(rest)
      .filter(
        (key) =>
          key.startsWith('data-') &&
          Object.prototype.hasOwnProperty.call(rest, key)
      )
      .reduce((acc, key) => {
        acc[key] = rest[key];
        return acc;
      }, {} as Record<string, any>)}
    // その他のpropsも展開
    {...rest}
    {...(_ref ? { ref: _ref } : {})}
  >
    {_children}
  </ToggleButton>
);

export default KfToggleButton;

/**
 * 使用例:
 * 
 * import KfToggleButton from './ToggleButton';
 * import FormatBoldIcon from '@mui/icons-material/FormatBold';
 * 
 * const [selected, setSelected] = React.useState(false);
 * 
 * <KfToggleButton
 *   _value="bold"
 *   _selected={selected}
 *   _onChange={(_, v) => setSelected(!selected)}
 *   _color="primary"
 *   _size="medium"
 *   _ariaLabel="太字"
 *   _children={<FormatBoldIcon />}
 *   _className="my-toggle"
 *   _style={{ margin: 4 }}
 *   _id="toggle-bold"
 *   _tabIndex={0}
 *   _title="太字切替"
 *   _disableRipple={false}
 *   _autoFocus={false}
 *   _edge="start"
 *   _fullWidth={false}
 *   _focusVisibleClassName="focus-visible"
 *   _ariaPressed={selected}
 *   _role="button"
 *   _inputProps={{ 'data-testid': 'toggle-input' }}
 * />
 */
