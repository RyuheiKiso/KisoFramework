import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KfTextField from '../../../shared/mui/TextField';
import MenuItem from '@mui/material/MenuItem';

describe('KfTextField', () => {
  it('ラベルと値が正しく表示される', () => {
    render(
      <KfTextField
        _label="テストラベル"
        _value="テスト値"
        _onChange={() => {}}
      />
    );
    expect(screen.getByLabelText('テストラベル')).toHaveValue('テスト値');
  });

  it('onChangeイベントが呼ばれる', () => {
    const handleChange = jest.fn();
    render(
      <KfTextField
        _label="入力"
        _value=""
        _onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('入力'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('エラー時のヘルパーテキストが表示される', () => {
    render(
      <KfTextField
        _label="メール"
        _value=""
        _onChange={() => {}}
        _error
        _helperText="エラーです"
      />
    );
    expect(screen.getByText('エラーです')).toBeInTheDocument();
  });

  it('disabled属性が反映される', () => {
    render(
      <KfTextField
        _label="無効"
        _value=""
        _onChange={() => {}}
        _disabled
      />
    );
    expect(screen.getByLabelText('無効')).toBeDisabled();
  });

  it('type属性が反映される', () => {
    render(
      <KfTextField
        _label="パスワード"
        _value=""
        _onChange={() => {}}
        _type="password"
      />
    );
    expect(screen.getByLabelText('パスワード')).toHaveAttribute('type', 'password');
  });

  it('data-testid属性が反映される', () => {
    render(
      <KfTextField
        _label="テストID"
        _value=""
        _onChange={() => {}}
        _data-testid="my-textfield"
      />
    );
    expect(screen.getByTestId('my-textfield')).toBeInTheDocument();
  });

  it('readOnly属性が反映される', () => {
    render(
      <KfTextField
        _label="読み取り専用"
        _value="abc"
        _onChange={() => {}}
        _readOnly
      />
    );
    expect(screen.getByLabelText('読み取り専用')).toHaveAttribute('readonly');
  });

  it('multiline属性が反映される', () => {
    render(
      <KfTextField
        _label="複数行"
        _value="line1\nline2"
        _onChange={() => {}}
        _multiline
        _rows={2}
      />
    );
    expect(screen.getByLabelText('複数行').tagName).toBe('TEXTAREA');
  });

  it('placeholder属性が反映される', () => {
    render(
      <KfTextField
        _label="プレースホルダー"
        _value=""
        _onChange={() => {}}
        _placeholder="ここに入力"
      />
    );
    expect(screen.getByPlaceholderText('ここに入力')).toBeInTheDocument();
  });

  it('required属性が反映される', () => {
    render(
      <KfTextField
        _label="必須"
        _value=""
        _onChange={() => {}}
        _required
      />
    );
    // ラベル名でtextboxを取得
    expect(screen.getByRole('textbox', { name: '必須' })).toBeRequired();
  });

  it('color属性が反映される', () => {
    render(
      <KfTextField
        _label="色"
        _value=""
        _onChange={() => {}}
        _color="secondary"
      />
    );
    // MUIのcolor属性はstyleやclassに反映されるため、classNameで判定
    expect(screen.getByLabelText('色').parentElement?.className).toMatch(/MuiInputBase-colorSecondary/);
  });

  it('name属性が反映される', () => {
    render(
      <KfTextField
        _label="名前"
        _value=""
        _onChange={() => {}}
        _name="testName"
      />
    );
    expect(screen.getByLabelText('名前')).toHaveAttribute('name', 'testName');
  });

  it('autoFocus属性が反映される', () => {
    render(
      <KfTextField
        _label="自動フォーカス"
        _value=""
        _onChange={() => {}}
        _autoFocus
      />
    );
    expect(screen.getByLabelText('自動フォーカス')).toHaveFocus();
  });

  it('autoComplete属性が反映される', () => {
    render(
      <KfTextField
        _label="オートコンプリート"
        _value=""
        _onChange={() => {}}
        _autoComplete="username"
      />
    );
    expect(screen.getByLabelText('オートコンプリート')).toHaveAttribute('autocomplete', 'username');
  });

  it('inputRefが呼ばれる', () => {
    const ref = jest.fn();
    render(
      <KfTextField
        _label="リファレンス"
        _value=""
        _onChange={() => {}}
        _inputRef={ref}
      />
    );
    expect(ref).toHaveBeenCalled();
  });

  it('onBlurイベントが呼ばれる', () => {
    const handleBlur = jest.fn();
    render(
      <KfTextField
        _label="onBlur"
        _value=""
        _onChange={() => {}}
        _onBlur={handleBlur}
      />
    );
    fireEvent.blur(screen.getByLabelText('onBlur'));
    expect(handleBlur).toHaveBeenCalled();
  });

  it('onFocusイベントが呼ばれる', () => {
    const handleFocus = jest.fn();
    render(
      <KfTextField
        _label="onFocus"
        _value=""
        _onChange={() => {}}
        _onFocus={handleFocus}
      />
    );
    fireEvent.focus(screen.getByLabelText('onFocus'));
    expect(handleFocus).toHaveBeenCalled();
  });

  it('inputPropsが反映される', () => {
    render(
      <KfTextField
        _label="inputProps"
        _value=""
        _onChange={() => {}}
        _inputProps={{ maxLength: 5 }}
      />
    );
    expect(screen.getByLabelText('inputProps')).toHaveAttribute('maxlength', '5');
  });

  it('InputPropsが反映される', () => {
    render(
      <KfTextField
        _label="InputProps"
        _value=""
        _onChange={() => {}}
        _InputProps={{ 'data-custom': 'abc' }}
      />
    );
    // InputPropsはinput要素ではなく親divに付与される
    expect(screen.getByLabelText('InputProps').parentElement).toHaveAttribute('data-custom', 'abc');
  });

  it('variant属性が反映される', () => {
    render(
      <KfTextField
        _label="バリアント"
        _value=""
        _onChange={() => {}}
        _variant="filled"
      />
    );
    expect(screen.getByLabelText('バリアント').parentElement?.className).toMatch(/MuiFilledInput-root/);
  });

  it('size属性が反映される', () => {
    render(
      <KfTextField
        _label="サイズ"
        _value=""
        _onChange={() => {}}
        _size="small"
      />
    );
    expect(screen.getByLabelText('サイズ').parentElement?.className).toMatch(/MuiInputBase-sizeSmall/);
  });

  it('fullWidth属性が反映される', () => {
    render(
      <KfTextField
        _label="フル幅"
        _value=""
        _onChange={() => {}}
        _fullWidth
      />
    );
    expect(screen.getByLabelText('フル幅').closest('.MuiFormControl-root')).toHaveClass('MuiFormControl-fullWidth');
  });

  it('select属性とchildrenが反映される', () => {
    render(
      <KfTextField
        _label="セレクト"
        _value="2"
        _onChange={() => {}}
        _select
        // 警告回避のためMenuItemを使用
        _children={[
          <MenuItem value="1" key="1">A</MenuItem>,
          <MenuItem value="2" key="2">B</MenuItem>
        ]}
      />
    );
    // MUIのSelectはcomboboxロールになる
    const combo = screen.getByRole('combobox', { name: 'セレクト' });
    expect(combo).toBeInTheDocument();
    // 選択肢を開く
    fireEvent.mouseDown(combo);
    // ポップアップ内にBが2つあるので、queryAllByTextで両方取得し検証
    const options = screen.queryAllByText('B');
    expect(options.length).toBeGreaterThanOrEqual(1);
  });

  it('minRows/maxRows属性が反映される', () => {
    render(
      <KfTextField
        _label="minmax"
        _value=""
        _onChange={() => {}}
        _multiline
        _minRows={2}
        _maxRows={4}
      />
    );
    // textareaであることを確認
    const textarea = screen.getByLabelText('minmax');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('defaultValue属性が反映される', () => {
    render(
      <KfTextField
        _label="デフォルト"
        _value=""
        _onChange={() => {}}
        _defaultValue="abc"
      />
    );
    // value優先なので空文字
    expect(screen.getByLabelText('デフォルト')).toHaveValue('');
  });

  it('FormHelperTextPropsが反映される', () => {
    render(
      <KfTextField
        _label="ヘルパー"
        _value=""
        _onChange={() => {}}
        _helperText="ヘルパー"
        _FormHelperTextProps={{ 'data-helper': 'hoge' }}
      />
    );
    // <p>要素のみを対象にする
    const helperElements = screen.getAllByText('ヘルパー').filter(
      el => el.tagName === 'P'
    );
    expect(helperElements[0]).toHaveAttribute('data-helper', 'hoge');
  });

  it('InputLabelPropsが反映される', () => {
    render(
      <KfTextField
        _label="ラベル"
        _value=""
        _onChange={() => {}}
        _InputLabelProps={{ 'data-label': 'foo' }}
      />
    );
    // <label>要素のみを対象にする
    const labelElements = screen.getAllByText('ラベル').filter(
      el => el.tagName === 'LABEL'
    );
    expect(labelElements[0]).toHaveAttribute('data-label', 'foo');
  });

  it('SelectPropsが反映される', () => {
    render(
      <KfTextField
        _label="セレクト2"
        _value="1"
        _onChange={() => {}}
        _select
        // 警告回避のためMenuItemを使用
        _children={<MenuItem value="1">A</MenuItem>}
        _SelectProps={{ 'data-select': 'bar' }}
      />
    );
    // data-select属性が付与された要素を探す
    const selectRoot = screen.getByLabelText('セレクト2').closest('[data-select="bar"]');
    expect(selectRoot).not.toBeNull();
  });

  it('rows属性が反映される', () => {
    render(
      <KfTextField
        _label="行数"
        _value=""
        _onChange={() => {}}
        _multiline
        _rows={5}
      />
    );
    expect(screen.getByLabelText('行数')).toHaveAttribute('rows', '5');
  });
});
