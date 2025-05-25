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
  label: string;
  /** 入力値 */
  value: string;
  /** 値変更時のイベントハンドラ */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 入力タイプ（例: 'text', 'password', 'number' など） */
  type?: string;
  /** 無効化フラグ */
  disabled?: boolean;
  /** エラーフラグ */
  error?: boolean;
  /** ヘルパーテキスト */
  helperText?: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 必須入力フラグ */
  required?: boolean;
  /** input要素の追加属性（例: maxLength, min, max など） */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** 自動フォーカス */
  autoFocus?: boolean;
  /** InputProps: MUI Inputコンポーネントへのprops */
  InputProps?: object;
  /** InputLabelProps: MUI InputLabelコンポーネントへのprops */
  InputLabelProps?: object;
  /** FormHelperTextProps: MUI FormHelperTextコンポーネントへのprops */
  FormHelperTextProps?: object;
  /** SelectProps: MUI Selectコンポーネントへのprops */
  SelectProps?: object;
  /** 行数（複数行入力時） */
  multiline?: boolean;
  /** 最小行数（複数行入力時） */
  minRows?: number;
  /** 最大行数（複数行入力時） */
  maxRows?: number;
  /** サイズ（'small' | 'medium'） */
  size?: 'small' | 'medium';
  /** フル幅指定 */
  fullWidth?: boolean;
  /** variant（'outlined' | 'filled' | 'standard'） */
  variant?: 'outlined' | 'filled' | 'standard';
  /** 入力欄のID */
  id?: string;
  /** テスト用ID */
  'data-testid'?: string;
  /** デフォルト値 */
  defaultValue?: string;
  /** 入力不可（readOnly） */
  readOnly?: boolean;
  /** 入力欄の色（'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'） */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** 入力欄の名前属性 */
  name?: string;
  /** 入力完了時のイベントハンドラ */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** フォーカス時のイベントハンドラ */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** 入力欄の参照 */
  inputRef?: React.Ref<HTMLInputElement>;
  /** 入力欄の自動補完属性 */
  autoComplete?: string;
  /** 入力欄の行数（単一行/複数行切替用） */
  rows?: number;
  /** 入力欄のselect属性 */
  select?: boolean;
  /** 入力欄のchildren（select時のoption等） */
  children?: React.ReactNode;
};

/**
 * MUIのTextFieldをラップしたコンポーネント
 * @param props TextFieldの各種プロパティ
 * @returns JSX.Element
 * @example
 * ```tsx
 * <MuiTextField
 *   label="ユーザー名"
 *   value={userName}
 *   onChange={e => setUserName(e.target.value)}
 *   required
 *   error={!!error}
 *   helperText={error}
 *   placeholder="ユーザー名を入力してください"
 *   size="small"
 * />
 * ```
 */
const MuiTextField: React.FC<Props> = ({
  label,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error = false,
  helperText = '',
  placeholder = '',
  required = false,
  inputProps,
  autoFocus = false,
  InputProps,
  InputLabelProps,
  FormHelperTextProps,
  SelectProps,
  multiline = false,
  minRows,
  maxRows,
  size = 'medium',
  fullWidth = true,
  variant = 'outlined',
  id,
  'data-testid': dataTestId,
  defaultValue,
  readOnly,
  color = 'primary',
  name,
  onBlur,
  onFocus,
  inputRef,
  autoComplete,
  rows,
  select = false,
  children,
}) => {
  // TextFieldコンポーネントを返却
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      required={required}
      inputProps={{ ...inputProps, readOnly }}
      autoFocus={autoFocus}
      InputProps={InputProps}
      InputLabelProps={InputLabelProps}
      FormHelperTextProps={FormHelperTextProps}
      SelectProps={SelectProps}
      defaultValue={defaultValue}
      color={color}
      name={name}
      onBlur={onBlur}
      onFocus={onFocus}
      inputRef={inputRef}
      autoComplete={autoComplete}
      rows={rows}
      select={select}
      children={children}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      size={size}
      fullWidth={fullWidth}
      variant={variant}
      id={id}
      data-testid={dataTestId}
    />
  );
};

export default MuiTextField;

/**
 * 使用例:
 * 
 * ```tsx
 * import MuiTextField from './shared/mui/TextField';
 * import React, { useState } from 'react';
 * 
 * const Example = () => {
 *   const [value, setValue] = useState('');
 *   return (
 *     <MuiTextField
 *       label="メールアドレス"
 *       value={value}
 *       onChange={e => setValue(e.target.value)}
 *       required
 *       helperText="有効なメールアドレスを入力してください"
 *       placeholder="sample@example.com"
 *       size="medium"
 *     />
 *   );
 * };
 * ```
 */
