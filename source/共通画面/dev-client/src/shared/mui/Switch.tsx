// MUIのSwitchコンポーネントをインポート
import React from 'react';
import MuiSwitch from '@mui/material/Switch';

/**
 * Switchコンポーネントのプロパティ
 */
interface SwitchProps {
  /** スイッチのON/OFF状態（制御用） */
  _checked: boolean;
  /** 状態変更時のコールバック */
  _onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /** スイッチを無効化するか（デフォルト: false） */
  _disabled?: boolean;
  /** スイッチのラベル（省略可） */
  _label?: string;
  /** スイッチの色（primary, secondary, default, error, info, success, warning） */
  _color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  /** スイッチのサイズ（small, medium） */
  _size?: 'small' | 'medium';
  /** スイッチの入力名属性 */
  _name?: string;
  /** スイッチのID属性 */
  _id?: string;
  /** スイッチの入力要素に付与する追加クラス名 */
  _className?: string;
  /** スイッチの入力要素に付与する追加style */
  _style?: React.CSSProperties;
  /** スイッチのaria-label属性 */
  _ariaLabel?: string;
  /** スイッチのaria-labelledby属性 */
  _ariaLabelledby?: string;
  /** スイッチのinput要素へのref */
  _inputRef?: React.Ref<HTMLInputElement>;
  /** タブインデックス */
  _tabIndex?: number;
  /** スイッチの配置（start, end, false） */
  _edge?: 'start' | 'end' | false;
  /** 必須入力かどうか */
  _required?: boolean;
  /** 自動フォーカスするか */
  _autoFocus?: boolean;
  /** 読み取り専用かどうか */
  _readOnly?: boolean;
  /** スイッチの値 */
  _value?: unknown;
  /** input要素に渡す追加props */
  _inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** sxプロパティ（MUIのスタイル拡張） */
  _sx?: object;
  /** オフ時のアイコン（省略可） */
  _icon?: React.ReactNode;
  /** オン時のアイコン（省略可） */
  _checkedIcon?: React.ReactNode;
  /** フォーカス時のクラス名 */
  _focusVisibleClassName?: string;
  /** 初期状態でONにするか（非制御用） */
  _defaultChecked?: boolean;
  /** リップル効果を無効化するか */
  _disableRipple?: boolean;
  /** フォーカス時のリップル効果を無効化するか */
  _disableFocusRipple?: boolean;
  /** input要素のカスタムコンポーネント */
  _inputComponent?: React.ElementType;
  /** フォーカスが外れた時のイベント */
  _onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** フォーカス時のイベント */
  _onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** クリック時のイベント */
  _onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  /** キーダウン時のイベント */
  _onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /** キーアップ時のイベント */
  _onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * MUI Switchをラップしたカスタムコンポーネント
 * @param props SwitchProps
 * @returns JSX.Element
 */
const Switch: React.FC<SwitchProps> = ({
  _checked,
  _onChange,
  _disabled = false,
  _label,
  _color = 'primary',
  _size = 'medium',
  _name,
  _id,
  _className,
  _style,
  _ariaLabel,
  _ariaLabelledby,
  _inputRef,
  _tabIndex,
  _edge = false,
  _required,
  _autoFocus,
  _readOnly,
  _value,
  _inputProps,
  _sx,
  _icon,
  _checkedIcon,
  _focusVisibleClassName,
  _defaultChecked,
  _disableRipple,
  _disableFocusRipple,
  _inputComponent,
  _onBlur,
  _onFocus,
  _onClick,
  _onKeyDown,
  _onKeyUp,
}) => (
  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: _disabled ? 'not-allowed' : 'pointer' }}>
    {/* ラベルがある場合は表示 */}
    {_label && <span style={{ marginRight: 8 }}>{_label}</span>}
    <MuiSwitch
      checked={_checked}
      onChange={_onChange}
      disabled={_disabled}
      color={_color}
      size={_size}
      name={_name}
      id={_id}
      className={_className}
      style={_style}
      edge={_edge}
      inputRef={_inputRef}
      tabIndex={_tabIndex}
      required={_required}
      autoFocus={_autoFocus}
      readOnly={_readOnly}
      value={_value}
      inputProps={{
        ..._inputProps,
        'aria-label': _ariaLabel,
        'aria-labelledby': _ariaLabelledby,
      }}
      sx={_sx}
      icon={_icon}
      checkedIcon={_checkedIcon}
      focusVisibleClassName={_focusVisibleClassName}
      defaultChecked={_defaultChecked}
      disableRipple={_disableRipple}
      disableFocusRipple={_disableFocusRipple}
      // inputComponent is not a valid prop for MuiSwitch, so it is removed
      onBlur={_onBlur ? (e => {
        // If the event target is an input, call the handler
        if (e.target instanceof HTMLInputElement) {
          _onBlur(e as React.FocusEvent<HTMLInputElement>);
        }
      }) : undefined}
      onFocus={
        _onFocus
          ? (e => {
              if (e.target instanceof HTMLInputElement) {
                _onFocus(e as React.FocusEvent<HTMLInputElement>);
              }
            })
          : undefined
      }
      onClick={
        _onClick
          ? (e => {
              // Try to find the input element and call the user's handler
              const input = e.currentTarget.querySelector('input');
              if (input) {
                // Create a synthetic event for input if needed
                const event = Object.create(e, {
                  target: { value: input, enumerable: true }
                });
                _onClick(event as React.MouseEvent<HTMLInputElement, MouseEvent>);
              }
            })
          : undefined
      }
      onKeyDown={
        _onKeyDown
          ? (e => {
              if (e.target instanceof HTMLInputElement) {
                _onKeyDown(e as React.KeyboardEvent<HTMLInputElement>);
              }
            })
          : undefined
      }
      onKeyUp={
        _onKeyUp
          ? (e => {
              if (e.target instanceof HTMLInputElement) {
                _onKeyUp(e as React.KeyboardEvent<HTMLInputElement>);
              }
            })
          : undefined
      }
    />
  </label>
);

export default Switch;

/**
 * 使用例
 * 
 * ```tsx
 * import Switch from './Switch';
 * import React, { useRef, useState } from 'react';
 * import CheckIcon from '@mui/icons-material/Check';
 * import CloseIcon from '@mui/icons-material/Close';
 * 
 * const Example = () => {
 *   const [checked, setChecked] = useState(false);
 *   const inputRef = useRef<HTMLInputElement>(null);
 *   return (
 *     <Switch
 *       _checked={checked}
 *       _onChange={(_, v) => setChecked(v)}
 *       _label="有効"
 *       _color="secondary"
 *       _size="small"
 *       _disabled={false}
 *       _name="exampleSwitch"
 *       _id="example-switch"
 *       _ariaLabel="有効スイッチ"
 *       _inputRef={inputRef}
 *       _tabIndex={0}
 *       _edge="start"
 *       _required={true}
 *       _autoFocus={true}
 *       _readOnly={false}
 *       _value="on"
 *       _inputProps={{ 'data-testid': 'switch-input' }}
 *       _sx={{ m: 1 }}
 *       _icon={<CloseIcon />}
 *       _checkedIcon={<CheckIcon />}
 *       _focusVisibleClassName="focus-visible"
 *       _defaultChecked={false}
 *       _disableRipple={false}
 *       _disableFocusRipple={false}
 *       _onBlur={() => console.log('blur')}
 *       _onFocus={() => console.log('focus')}
 *       _onClick={() => console.log('click')}
 *       _onKeyDown={() => console.log('keydown')}
 *       _onKeyUp={() => console.log('keyup')}
 *     />
 *   );
 * };
 * ```
 */
