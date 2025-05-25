// MUIのSelectコンポーネントをラップしたカスタムコンポーネント

import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { SxProps } from '@mui/material/styles';

/**
 * Selectコンポーネント用プロパティ
 */
interface SelectProps {
  /** 選択値（複数選択時は配列） */
  _value: string | number | (string | number)[];
  /** 値が変更されたときのコールバック */
  _onChange: (event: SelectChangeEvent<string | number | (string | number)[]>, child: React.ReactNode) => void;
  /** 選択肢リスト（label: 表示名, value: 値, disabled: 無効化フラグ, icon: アイコン, lang: 言語コード, 任意で説明） */
  _options: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
    icon?: React.ReactNode;
    lang?: string;
    description?: string;
  }>;
  /** プレースホルダー（未選択時の表示、任意） */
  _placeholder?: string;
  /** 無効化フラグ（任意） */
  _disabled?: boolean;
  /** ラベル（任意） */
  _label?: string;
  /** 必須フラグ（任意） */
  _required?: boolean;
  /** エラー表示フラグ（任意） */
  _error?: boolean;
  /** ヘルパーテキスト（任意） */
  _helperText?: string;
  /** Selectの幅（任意、例: '100%'や200など） */
  _width?: string | number;
  /** MenuProps（任意、MUIのSelectのMenuPropsをそのまま渡せる） */
  _menuProps?: object;
  /** SelectProps（任意、MUIのSelectのpropsを追加で渡せる） */
  _selectProps?: object;
  /** 複数選択可否（任意） */
  _multiple?: boolean;
  /** sxスタイル（任意） */
  _sx?: SxProps;
  /** クラス名（任意） */
  _class?: string;
  /** id属性（任意） */
  _id?: string;
  /** name属性（任意） */
  _name?: string;
  /** 自動フォーカス（任意） */
  _autoFocus?: boolean;
  /** 読み取り専用（任意） */
  _readOnly?: boolean;
  /** タブインデックス（任意） */
  _tabIndex?: number;
  /** onBlurイベント（任意） */
  _onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** onFocusイベント（任意） */
  _onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** aria-label属性（任意） */
  _ariaLabel?: string;
  /** aria-describedby属性（任意） */
  _ariaDescribedby?: string;
  /** カスタムMenuItemレンダラー（任意） */
  _renderOption?: (option: SelectProps['_options'][number]) => React.ReactNode;
}

/**
 * MUI Selectをラップしたカスタムセレクト
 */
const CustomSelect: React.FC<SelectProps> = ({
  _value,
  _onChange,
  _options,
  _placeholder,
  _disabled = false,
  _label,
  _required = false,
  _error = false,
  _helperText,
  _width,
  _menuProps,
  _selectProps,
  _multiple = false,
  _sx,
  _class,
  _id,
  _name,
  _autoFocus,
  _readOnly,
  _tabIndex,
  _onBlur,
  _onFocus,
  _ariaLabel,
  _ariaDescribedby,
  _renderOption,
}) => {
  return (
    <FormControl
      fullWidth={_width === undefined}
      style={_width ? { width: _width } : undefined}
      disabled={_disabled}
      error={_error}
      required={_required}
      variant="outlined"
      sx={_sx}
      className={_class}
    >
      {_label && <InputLabel>{_label}</InputLabel>}
      <Select
        value={_value}
        onChange={_onChange}
        displayEmpty={!!_placeholder}
        label={_label}
        MenuProps={_menuProps}
        multiple={_multiple}
        id={_id}
        name={_name}
        autoFocus={_autoFocus}
        inputProps={{
          readOnly: _readOnly,
          tabIndex: _tabIndex,
          'aria-label': _ariaLabel,
          'aria-describedby': _ariaDescribedby,
        }}
        onBlur={_onBlur}
        onFocus={_onFocus}
        {..._selectProps}
      >
        {_placeholder && !_multiple && (
          <MenuItem value="">
            <em>{_placeholder}</em>
          </MenuItem>
        )}
        {_options.map((option) =>
          _renderOption ? (
            <React.Fragment key={option.value}>{_renderOption(option)}</React.Fragment>
          ) : (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              lang={option.lang}
            >
              {option.icon && <span style={{ marginRight: 8 }}>{option.icon}</span>}
              {option.label}
              {option.description && (
                <span style={{ color: '#888', marginLeft: 8, fontSize: 12 }}>
                  {option.description}
                </span>
              )}
            </MenuItem>
          )
        )}
      </Select>
      {_helperText && <FormHelperText>{_helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;

/**
 * 使用例:
 *
 * import CustomSelect from './Select';
 * import HomeIcon from '@mui/icons-material/Home';
 *
 * const options = [
 *   { label: '日本語', value: 'ja', icon: <HomeIcon />, lang: 'ja', description: 'Japanese' },
 *   { label: 'English', value: 'en', lang: 'en', description: 'English' },
 *   { label: 'Français', value: 'fr', disabled: true, lang: 'fr', description: 'French' }
 * ];
 *
 * // 単一選択
 * const [value, setValue] = React.useState('');
 * <CustomSelect
 *   _value={value}
 *   _onChange={e => setValue(e.target.value)}
 *   _options={options}
 *   _placeholder="選択してください"
 *   _label="言語"
 *   _required
 *   _helperText="言語を選択してください"
 *   _error={value === ''}
 *   _width={300}
 *   _id="lang-select"
 *   _name="lang"
 *   _autoFocus
 *   _ariaLabel="言語選択"
 *   _tabIndex={0}
 * />
 *
 * // 複数選択
 * const [multi, setMulti] = React.useState<string[]>([]);
 * <CustomSelect
 *   _value={multi}
 *   _onChange={e => setMulti(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
 *   _options={options}
 *   _label="複数選択"
 *   _multiple
 *   _helperText="複数選択できます"
 *   _readOnly
 * />
 *
 * // カスタムMenuItemレンダリング
 * <CustomSelect
 *   _value={value}
 *   _onChange={e => setValue(e.target.value)}
 *   _options={options}
 *   _label="カスタム"
 *   _renderOption={option => (
 *     <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
 *       <b>{option.label}</b>
 *       {option.description && <span style={{ marginLeft: 8, color: '#888' }}>{option.description}</span>}
 *     </MenuItem>
 *   )}
 * />
 */
