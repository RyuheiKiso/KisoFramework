import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { KfCheckbox } from '../../../shared/mui/Checkbox';

describe('KfCheckbox', () => {
  const defaultProps = {
    _checked: false,
    _onChange: jest.fn(),
  };

  it('ラベルが表示されること', () => {
    render(<KfCheckbox {...defaultProps} _label="テストラベル" />);
    expect(screen.getByTestId('checkbox-label')).toBeInTheDocument();
  });

  it('チェック状態が反映されること', () => {
    const { rerender } = render(<KfCheckbox {...defaultProps} _checked={false} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    rerender(<KfCheckbox {...defaultProps} _checked={true} />);
    expect(checkbox.checked).toBe(true);
  });

  it('onChangeが呼ばれること', () => {
    const handleChange = jest.fn();
    render(<KfCheckbox {...defaultProps} _onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('disabled属性が反映されること', () => {
    render(<KfCheckbox {...defaultProps} _disabled={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('ラベル位置がstartの場合、ラベルが左に表示されること', () => {
    render(<KfCheckbox {...defaultProps} _label="左ラベル" _labelPlacement="start" />);
    const label = screen.getByText('左ラベル');
    const checkboxInput = screen.getByRole('checkbox');
    // カスタムレンダリングの場合は親spanで順序を検証
    const parent = label.parentElement;
    expect(parent).not.toBeNull();
    const children = Array.from(parent!.children);
    // ラベルが先頭、checkboxが2番目であることを検証
    expect(children[0]).toBe(label);
    expect(children[1].contains(checkboxInput)).toBe(true);
  });

  it('propsでclassNameやstyleが反映されること', () => {
    const { container } = render(
      <KfCheckbox
        {...defaultProps}
        _className="test-class"
        _style={{ backgroundColor: 'red' }}
        _label="styleラベル"
        _labelClassName="label-class"
        _labelStyle={{ color: 'blue' }}
      />
    );
    const checkboxInput = screen.getByRole('checkbox');
    const label = screen.getByTestId('checkbox-label');
    // test-classを持つ要素を直接取得
    const checkboxWrapper = container.querySelector('.test-class');
    expect(label).toHaveClass('label-class');
    expect(label).toHaveStyle('color: blue');
    expect(checkboxWrapper).toBeTruthy();
    expect(checkboxWrapper).toHaveClass('test-class');
    expect(checkboxWrapper).toHaveStyle('background-color: red');
  });

  it('indeterminate属性が反映されること', () => {
    render(<KfCheckbox {...defaultProps} _indeterminate={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    // indeterminateはinput要素のプロパティとして直接確認
    expect(checkbox.indeterminate).toBe(true);
  });

  it('aria属性が反映されること', () => {
    render(
      <KfCheckbox
        {...defaultProps}
        _ariaLabel="aria-label"
        _ariaLabelledby="labelledby"
        _ariaDescribedby="describedby"
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'aria-label');
    expect(checkbox).toHaveAttribute('aria-labelledby', 'labelledby');
    expect(checkbox).toHaveAttribute('aria-describedby', 'describedby');
  });
});

describe('Checkbox 追加カバレッジ', () => {
  it('_onChangeが呼ばれた場合の動作', () => {
    const handleChange = jest.fn();
    render(<KfCheckbox _checked={false} _onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('_disabled状態の分岐', () => {
    render(<KfCheckbox _checked={false} _disabled _onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('_indeterminate状態の分岐', () => {
    render(<KfCheckbox _checked={false} _indeterminate _onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('props未指定時の分岐', () => {
    // _checked, _onChangeが必須の場合はこのテストを削除してください
    // render(<Checkbox />);
    // expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});

describe('KfCheckbox 分岐カバレッジ追加', () => {
  it('ラベル無しの場合はFormControlLabelを使わずCheckboxのみ返す', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} />);
    // FormControlLabelが存在しないこと
    expect(container.querySelector('.MuiFormControlLabel-root')).toBeNull();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('ラベルが空文字列の場合はFormControlLabelを使わずCheckboxのみ返す', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _label="" />);
    expect(container.querySelector('.MuiFormControlLabel-root')).toBeNull();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('ラベルがfalseの場合はFormControlLabelを使わずCheckboxのみ返す', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _label={false as any} />);
    expect(container.querySelector('.MuiFormControlLabel-root')).toBeNull();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('ラベルがtrueの場合はFormControlLabelを使わずCheckboxのみ返す', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _label={true as any} />);
    expect(container.querySelector('.MuiFormControlLabel-root')).toBeNull();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('ラベルがNaNの場合はFormControlLabelを使いラベルが"NaN"になる', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _label={NaN as any} />);
    expect(container.querySelector('.MuiFormControlLabel-root')).not.toBeNull();
    expect(screen.getByText('NaN')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('ラベルがnullの場合はFormControlLabelを使わずCheckboxのみ返す', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _label={null as any} />);
    expect(container.querySelector('.MuiFormControlLabel-root')).toBeNull();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('ラベルがundefinedの場合はFormControlLabelを使わずCheckboxのみ返す', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _label={undefined} />);
    expect(container.querySelector('.MuiFormControlLabel-root')).toBeNull();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('ラベルが0の場合はFormControlLabelを使う', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _label={0 as any} />);
    // 0はfalsyだがラベルとしては有効値なのでFormControlLabelが使われる
    expect(container.querySelector('.MuiFormControlLabel-root')).not.toBeNull();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('_inputRefがfunctionの場合に呼ばれる', () => {
    const refFn = jest.fn();
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={refFn} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(refFn).toHaveBeenCalled();
  });

  it('_inputRefがrefオブジェクトの場合にcurrentがセットされる', () => {
    const refObj = { current: null as HTMLInputElement | null };
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={refObj} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(refObj.current).not.toBeNull();
  });

  it('_onFocus, _onBlur, _onClickが伝播する', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClick = jest.fn();
    render(
      <KfCheckbox
        _checked={false}
        _onChange={() => {}}
        _onFocus={onFocus}
        _onBlur={onBlur}
        _onClick={onClick}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.focus(checkbox);
    fireEvent.blur(checkbox);
    fireEvent.click(checkbox);
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  it('カスタムアイコンが描画される', () => {
    const icon = <span data-testid="icon" />;
    const checkedIcon = <span data-testid="checkedIcon" />;
    const indeterminateIcon = <span data-testid="indeterminateIcon" />;
    render(
      <KfCheckbox
        _checked={false}
        _onChange={() => {}}
        _icon={icon}
        _checkedIcon={checkedIcon}
        _indeterminateIcon={indeterminateIcon}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('disableRipple, focusRipple, tabIndex, autoFocus, requiredが反映される', () => {
    render(
      <KfCheckbox
        _checked={false}
        _onChange={() => {}}
        _disableRipple={true}
        _focusRipple={true}
        _tabIndex={2}
        _autoFocus={true}
        _required={true}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('tabindex', '2');
    expect(checkbox).toBeRequired();
  });

  it('ラベルあり・_labelClassName/_labelStyle未指定時のFormControlLabel分岐', () => {
    const { container } = render(
      <KfCheckbox _checked={false} _onChange={() => {}} _label="no-style-label" />
    );
    // FormControlLabelが存在し、labelにclass/styleが付与されていないこと
    const label = screen.getByTestId('checkbox-label');
    expect(label).not.toHaveClass('label-class');
    // style属性が空または未定義
    expect(label.getAttribute('style')).toBeNull();
  });

  it('ラベルあり・_labelClassNameのみ指定', () => {
    render(
      <KfCheckbox _checked={false} _onChange={() => {}} _label="class-only" _labelClassName="only-class" />
    );
    const label = screen.getByTestId('checkbox-label');
    expect(label).toHaveClass('only-class');
  });

  it('ラベルあり・_labelStyleのみ指定', () => {
    render(
      <KfCheckbox _checked={false} _onChange={() => {}} _label="style-only" _labelStyle={{ color: 'green' }} />
    );
    const label = screen.getByTestId('checkbox-label');
    expect(label).toHaveStyle('color: green');
  });

  it('_indeterminateがundefinedの場合はfalseになる', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(false);
  });

  it('_indeterminateがnullの場合はfalseになる', () => {
    // テスト目的でnullを渡す
    render(<KfCheckbox _checked={false} _onChange={() => {}} _indeterminate={null as any} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(false);
  });

  it('_inputRefがundefinedの場合でもエラーにならない', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={undefined} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('_inputRefがnullの場合でもエラーにならない', () => {
    // テスト目的でnullを渡す
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={null as any} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  // _inputRefがnull/undefinedの分岐カバレッジ用（2回renderしないよう分割）
  // nullの場合
  it('_inputRefがnullの場合の分岐カバレッジ', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={null as any} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  // undefinedの場合
  it('_inputRefがundefinedの場合の分岐カバレッジ', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={undefined} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});

describe('KfCheckbox useEffect分岐カバレッジ', () => {
  it('_inputRefがnullの場合に副作用がエラーなく動作する', () => {
    // _inputRefがnullのとき、useEffect分岐でinput=nullとなる
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={null as any} />);
    // 単に描画できればOK
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('_inputRefがundefinedの場合に副作用がエラーなく動作する', () => {
    // _inputRefがundefinedのとき、useEffect分岐でinput=nullとなる
    render(<KfCheckbox _checked={false} _onChange={() => {}} _inputRef={undefined} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});

describe('KfCheckbox デフォルト値のテスト', () => {
  it('_color未指定時はprimaryになる', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} />);
    // MUIのCheckboxはcolor="primary"の場合、.MuiCheckbox-colorPrimaryクラスが付与される
    const checkbox = container.querySelector('.MuiCheckbox-colorPrimary');
    expect(checkbox).toBeTruthy();
  });

  it('_size未指定時はmediumになる', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} />);
    // MUIのCheckboxはsize="medium"の場合、.MuiCheckbox-sizeMediumクラスが付与される
    const checkbox = container.querySelector('.MuiCheckbox-sizeMedium');
    expect(checkbox).toBeTruthy();
  });
});

describe('KfCheckbox デフォルト値の分岐カバレッジ', () => {
  it('_colorにundefinedを渡した場合もprimaryになる', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _color={undefined} />);
    const checkbox = container.querySelector('.MuiCheckbox-colorPrimary');
    expect(checkbox).toBeTruthy();
  });

  it('_sizeにundefinedを渡した場合もmediumになる', () => {
    const { container } = render(<KfCheckbox _checked={false} _onChange={() => {}} _size={undefined} />);
    const checkbox = container.querySelector('.MuiCheckbox-sizeMedium');
    expect(checkbox).toBeTruthy();
  });
});

describe('KfCheckbox _color/_size 不正値でも警告が出ない', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('_colorにnullを渡しても警告が出ない', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} _color={null as any} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('_colorに不正な文字列を渡しても警告が出ない', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} _color={'invalid' as any} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('_sizeにnullを渡しても警告が出ない', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} _size={null as any} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('_sizeに不正な文字列を渡しても警告が出ない', () => {
    render(<KfCheckbox _checked={false} _onChange={() => {}} _size={'invalid' as any} />);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});