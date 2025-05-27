// MUIのCheckboxコンポーネントをインポート
import React, { useRef, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

/**
 * MuiCheckboxコンポーネントのプロパティ
 */
export interface _CheckboxProps {
  /** チェック状態（true: チェック, false: 未チェック） */
  _checked: boolean;
  /** チェック状態変更時のコールバック関数 */
  _onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /** 無効化フラグ（true: 無効, false: 有効） */
  _disabled?: boolean;
  /** ラベルテキスト */
  _label?: React.ReactNode;
  /** チェックボックスの色（primary, secondary, default, error, info, success, warning） */
  _color?: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  /** チェックボックスのサイズ（small, medium） */
  _size?: 'small' | 'medium';
  /** チェックボックスのid属性 */
  _id?: string;
  /** チェックボックスのname属性 */
  _name?: string;
  /** チェックボックスのvalue属性 */
  _value?: string | number;
  /** ラベルのclassName */
  _labelClassName?: string;
  /** チェックボックスのclassName */
  _className?: string;
  /** チェックボックスのstyle */
  _style?: React.CSSProperties;
  /** ラベルのstyle */
  _labelStyle?: React.CSSProperties;
  /** チェックボックスのinputProps */
  _inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** チェックボックスのaria-label属性（アクセシビリティ用） */
  _ariaLabel?: string;
  /** チェックボックスのaria-labelledby属性（アクセシビリティ用） */
  _ariaLabelledby?: string;
  /** チェックボックスのaria-describedby属性（アクセシビリティ用） */
  _ariaDescribedby?: string;
  /** フォーカス時のコールバック */
  _onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** フォーカスアウト時のコールバック */
  _onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** クリック時のコールバック */
  _onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** ラベルの位置（'start': 左, 'end': 右） */
  _labelPlacement?: 'end' | 'start';
  /** indeterminate状態（true: 中間状態, false: 通常） */
  _indeterminate?: boolean;
  /** チェック時のアイコン（ReactNode） */
  _icon?: React.ReactNode;
  /** チェック済み時のアイコン（ReactNode） */
  _checkedIcon?: React.ReactNode;
  /** indeterminate時のアイコン（ReactNode） */
  _indeterminateIcon?: React.ReactNode;
  /** Rippleエフェクトの有効/無効 */
  _disableRipple?: boolean;
  /** Rippleエフェクトの色 */
  _focusRipple?: boolean;
  /** tabIndex属性 */
  _tabIndex?: number;
  /** 自動フォーカス */
  _autoFocus?: boolean;
  /** 必須属性 */
  _required?: boolean;
  /** input要素のref */
  _inputRef?: React.Ref<HTMLInputElement>;
}

/**
 * MUIのCheckboxをラップしたカスタムコンポーネント
 */
export const KfCheckbox: React.FC<_CheckboxProps> = ({
  _checked,
  _onChange,
  _disabled = false,
  _label,
  _color = 'primary',
  _size = 'medium',
  _id,
  _name,
  _value,
  _labelClassName,
  _className,
  _style,
  _labelStyle,
  _inputProps,
  _ariaLabel,
  _ariaLabelledby,
  _ariaDescribedby,
  _onFocus,
  _onBlur,
  _onClick,
  _labelPlacement = 'end',
  _indeterminate = false,
  _icon,
  _checkedIcon,
  _indeterminateIcon,
  _disableRipple,
  _focusRipple,
  _tabIndex,
  _autoFocus,
  _required,
  _inputRef,
}) => {
  // indeterminate制御用ref
  const innerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let input: HTMLInputElement | null = null;
    if (innerInputRef.current) {
      input = innerInputRef.current;
    } 
    if (input) {
      if (typeof _indeterminate === 'boolean') {
        input.indeterminate = _indeterminate;
      } else {
        input.indeterminate = false;
      }
    }
  }, [_indeterminate, _inputRef]);

  // _color, _size の値が不正な場合はデフォルト値にフォールバック
  const allowedColors = ['primary', 'secondary', 'default', 'error', 'info', 'success', 'warning'];
  const allowedSizes = ['small', 'medium'];
  const safeColor =
    allowedColors.includes(_color as any) ? _color : 'primary';
  const safeSize =
    allowedSizes.includes(_size as any) ? _size : 'medium';

  const checkboxNode = (
    <Checkbox
      checked={_checked}
      onChange={_onChange}
      disabled={_disabled}
      color={safeColor as any}
      size={safeSize as any}
      id={_id}
      name={_name}
      value={_value}
      className={_className}
      style={_style}
      inputProps={{
        ..._inputProps,
        ...(typeof _ariaLabel !== 'undefined' && { 'aria-label': _ariaLabel }),
        ...(typeof _ariaLabelledby !== 'undefined' && { 'aria-labelledby': _ariaLabelledby }),
        ...(typeof _ariaDescribedby !== 'undefined' && { 'aria-describedby': _ariaDescribedby }),
        ...(typeof _tabIndex !== 'undefined' && { tabIndex: _tabIndex }),
        ...(typeof _required !== 'undefined' && { required: _required }),
        // onFocus/onBlurはundefinedの場合は渡さない
        ...(typeof _onFocus === 'function' && { onFocus: _onFocus }),
        ...(typeof _onBlur === 'function' && { onBlur: _onBlur }),
      }}
      inputRef={(el: HTMLInputElement) => {
        innerInputRef.current = el;
        if (typeof _inputRef === 'function') {
          _inputRef(el);
        } else if (_inputRef && typeof _inputRef !== 'function' && 'current' in _inputRef) {
          (_inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }
      }}
      // onClickはundefinedの場合は渡さない
      {...(_onClick ? { onClick: _onClick } : {})}
      indeterminate={_indeterminate}
      icon={_icon}
      checkedIcon={_checkedIcon}
      indeterminateIcon={_indeterminateIcon}
      disableRipple={_disableRipple}
      focusRipple={_focusRipple}
      autoFocus={_autoFocus}
      // inputRefはinputProps.refで制御
    />
  );

  // ラベルがnull/undefined/空文字/false/trueの場合はFormControlLabelを使わずCheckboxのみ返す
  if (
    _label !== null &&
    _label !== undefined &&
    _label !== '' &&
    _label !== false &&
    _label !== true
  ) {
    // NaNの場合は文字列化して渡す
    const labelContent =
      typeof _label === 'number' && isNaN(_label) ? String(_label) : _label;
    const labelNode = (
      <span
        className={_labelClassName || undefined}
        style={_labelStyle || undefined}
        data-testid="checkbox-label"
      >
        {labelContent}
      </span>
    );
    if (_labelPlacement === 'start') {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {labelNode}
          {checkboxNode}
        </span>
      );
    }
    return (
      <FormControlLabel
        control={checkboxNode}
        label={labelNode}
        labelPlacement={_labelPlacement}
      />
    );
  }
  return checkboxNode;
};

/**
 * 使用例
 * 
 * ```tsx
 * import { KfCheckbox } from './Checkbox';
 * import CheckIcon from '@mui/icons-material/Check';
 * import RemoveIcon from '@mui/icons-material/Remove';
 * 
 * // チェックボックスの状態管理
 * const [checked, setChecked] = React.useState(false);
 * 
 * <KfCheckbox
 *   _checked={checked}
 *   _onChange={(_, v) => setChecked(v)}
 *   _label="利用規約に同意する"
 *   _color="secondary"
 *   _size="small"
 *   _id="agree"
 *   _name="agreement"
 *   _value="yes"
 *   _labelClassName="checkbox-label"
 *   _className="checkbox-input"
 *   _style={{ marginRight: 8 }}
 *   _labelStyle={{ fontWeight: 'bold' }}
 *   _inputProps={{ tabIndex: 0 }}
 *   _ariaLabel="利用規約同意"
 *   _labelPlacement="start"
 *   _onFocus={() => console.log('フォーカス')}
 *   _onBlur={() => console.log('フォーカスアウト')}
 *   _onClick={() => alert('クリック')}
 *   _indeterminate={false}
 *   _icon={<RemoveIcon />}
 *   _checkedIcon={<CheckIcon />}
 *   _indeterminateIcon={<RemoveIcon />}
 *   _disableRipple={true}
 *   _focusRipple={false}
 *   _tabIndex={0}
 *   _autoFocus={false}
 *   _required={true}
 *   // _inputRef={ref => {/* 任意のref処理 */ /*}}
 * ```
 */