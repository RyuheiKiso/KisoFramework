// MUIのTextFieldコンポーネントをラップしたコンポーネント

import React from 'react';
import TextField from '@mui/material/TextField';

/**
 * TextFieldコンポーネントのProps型
 * @property label ラベル
 * @property value 入力値
 * @property onChange 値変更時のイベントハンドラ
 * @property type 入力タイプ（例: 'text', 'password', 'number' など）
 * @property disabled 無効化フラグ
 * @property error エラーフラグ
 * @property helperText ヘルパーテキスト
 * @property placeholder プレースホルダー
 * @property required 必須入力フラグ
 * @property inputProps input要素の追加属性（例: maxLength, min, max など）
 * @property autoFocus 自動フォーカス
 * @property InputProps MUI Inputコンポーネントへのprops
 * @property InputLabelProps MUI InputLabelコンポーネントへのprops
 * @property FormHelperTextProps MUI FormHelperTextコンポーネントへのprops
 * @property SelectProps MUI Selectコンポーネントへのprops
 * @property multiline 行数（複数行入力時）
 * @property minRows 最小行数（複数行入力時）
 * @property maxRows 最大行数（複数行入力時）
 * @property size サイズ（'small' | 'medium'）
 * @property fullWidth フル幅指定
 * @property variant variant（'outlined' | 'filled' | 'standard'）
 * @property id 入力欄のID
 * @property data-testid テスト用ID
 * @property defaultValue デフォルト値
 * @property readOnly 入力不可（readOnly）
 * @property color 入力欄の色（'primary' | 'secondary' など）
 * @property name 入力欄の名前属性
 * @property onBlur 入力完了時のイベントハンドラ
 * @property onFocus フォーカス時のイベントハンドラ
 * @property inputRef 入力欄の参照
 * @property autoComplete 入力欄の自動補完属性
 * @property rows 入力欄の行数（単一行/複数行切替用）
 * @property select 入力欄のselect属性
 * @property children 入力欄のchildren（select時のoption等）
 */
type Props = {
  /** ラベル */
  _label: string;
  /** 入力値 */
  _value: string;
  /** 値変更時のイベントハンドラ */
  _onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 入力タイプ（例: 'text', 'password', 'number' など） */
  _type?: string;
  /** 無効化フラグ */
  _disabled?: boolean;
  /** エラーフラグ */
  _error?: boolean;
  /** ヘルパーテキスト */
  _helperText?: string;
  /** プレースホルダー */
  _placeholder?: string;
  /** 必須入力フラグ */
  _required?: boolean;
  /** input要素の追加属性（例: maxLength, min, max など） */
  _inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** 自動フォーカス */
  _autoFocus?: boolean;
  /** InputProps: MUI Inputコンポーネントへのprops */
  _InputProps?: object;
  /** InputLabelProps: MUI InputLabelコンポーネントへのprops */
  _InputLabelProps?: object;
  /** FormHelperTextProps: MUI FormHelperTextコンポーネントへのprops */
  _FormHelperTextProps?: object;
  /** SelectProps: MUI Selectコンポーネントへのprops */
  _SelectProps?: object;
  /** 行数（複数行入力時） */
  _multiline?: boolean;
  /** 最小行数（複数行入力時） */
  _minRows?: number;
  /** 最大行数（複数行入力時） */
  _maxRows?: number;
  /** サイズ（'small' | 'medium'） */
  _size?: 'small' | 'medium';
  /** フル幅指定 */
  _fullWidth?: boolean;
  /** variant（'outlined' | 'filled' | 'standard'） */
  _variant?: 'outlined' | 'filled' | 'standard';
  /** 入力欄のID */
  _id?: string;
  /** テスト用ID */
  '_data-testid'?: string;
  /** デフォルト値 */
  _defaultValue?: string;
  /** 入力不可（readOnly） */
  _readOnly?: boolean;
  /** 入力欄の色（'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'） */
  _color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** 入力欄の名前属性 */
  _name?: string;
  /** 入力完了時のイベントハンドラ */
  _onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** フォーカス時のイベントハンドラ */
  _onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** 入力欄の参照 */
  _inputRef?: React.Ref<HTMLInputElement>;
  /** 入力欄の自動補完属性 */
  _autoComplete?: string;
  /** 入力欄の行数（単一行/複数行切替用） */
  _rows?: number;
  /** 入力欄のselect属性 */
  _select?: boolean;
  /** 入力欄のchildren（select時のoption等） */
  _children?: React.ReactNode;
};

/**
 * MUIのTextFieldをラップしたコンポーネント
 * @param props TextFieldの各種プロパティ
 * @returns JSX.Element
 * @example
 * ```tsx
 * <MuiTextField
 *   _label="ユーザー名"
 *   _value={userName}
 *   _onChange={e => setUserName(e.target.value)}
 *   _required
 *   _error={!!error}
 *   _helperText={error}
 *   _placeholder="ユーザー名を入力してください"
 *   _size="small"
 * />
 * ```
 */
const KfTextField: React.FC<Props> = ({
  _label,
  _value,
  _onChange,
  _type = 'text',
  _disabled = false,
  _error = false,
  _helperText = '',
  _placeholder = '',
  _required = false,
  _inputProps,
  _autoFocus = false,
  _InputProps,
  _InputLabelProps,
  _FormHelperTextProps,
  _SelectProps,
  _multiline = false,
  _minRows,
  _maxRows,
  _size = 'medium',
  _fullWidth = true,
  _variant = 'outlined',
  _id,
  '_data-testid': _dataTestId,
  _defaultValue,
  _readOnly,
  _color = 'primary',
  _name,
  _onBlur,
  _onFocus,
  _inputRef,
  _autoComplete,
  _rows,
  _select = false,
  _children,
}) => {
  // Fragmentがchildrenに渡された場合は配列に変換
  let children = _children;
  if (React.isValidElement(_children) && _children.type === React.Fragment) {
    const fragment = _children as React.ReactElement<{ children?: React.ReactNode }>;
    children = React.Children.toArray(fragment.props.children);
  } else if (_children === null || _children === undefined) {
    children = undefined;
  } else if (Array.isArray(_children) && _children.length === 0) {
    children = undefined;
  }
  // inputProps生成: _inputProps/_readOnlyの有無で分岐
  let inputProps;
  if (_inputProps && typeof _readOnly !== 'undefined') {
    inputProps = { ..._inputProps, readOnly: _readOnly };
  } else if (_inputProps) {
    inputProps = { ..._inputProps };
  } else if (typeof _readOnly !== 'undefined') {
    inputProps = { readOnly: _readOnly };
  } else {
    inputProps = undefined;
  }
  // valueとdefaultValueの同時指定を避ける
  const textFieldProps: any = {
    label: _label,
    onChange: _onChange,
    type: _type,
    disabled: _disabled,
    error: _error,
    helperText: _helperText,
    placeholder: _placeholder,
    required: _required,
    inputProps,
    autoFocus: _autoFocus,
    InputProps: _InputProps,
    InputLabelProps: _InputLabelProps,
    FormHelperTextProps: _FormHelperTextProps,
    SelectProps: _SelectProps,
    color: _color,
    name: _name,
    onBlur: _onBlur,
    onFocus: _onFocus,
    inputRef: _inputRef,
    autoComplete: _autoComplete,
    rows: _rows,
    select: _select,
    children: children,
    multiline: _multiline,
    minRows: _minRows,
    maxRows: _maxRows,
    size: _size,
    fullWidth: _fullWidth,
    variant: _variant,
    id: _id,
    'data-testid': _dataTestId,
  };
  if (typeof _value !== 'undefined' && _value !== null) {
    textFieldProps.value = _value;
  } else if (typeof _defaultValue !== 'undefined') {
    textFieldProps.defaultValue = _defaultValue;
  }
  // valueもdefaultValueも未指定の場合は両方渡さない
  return <TextField {...textFieldProps} />;
};

export default KfTextField;

/**
 * 使用例:
 * 
 * ```tsx
 * import KfTextField from './shared/mui/TextField';
 * import React, { useState } from 'react';
 * 
 * const Example = () => {
 *   const [value, setValue] = useState('');
 *   return (
 *     <KfTextField
 *       _label="メールアドレス"
 *       _value={value}
 *       _onChange={e => setValue(e.target.value)}
 *       _required
 *       _helperText="有効なメールアドレスを入力してください"
 *       _placeholder="sample@example.com"
 *       _size="medium"
 *     />
 *   );
 * };
 * ```
 */
