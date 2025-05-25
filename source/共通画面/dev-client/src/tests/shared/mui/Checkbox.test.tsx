import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { KfCheckbox, _CheckboxProps } from '../../../shared/mui/Checkbox';

describe('KfCheckbox', () => {
  const defaultProps: _CheckboxProps = {
    _checked: false,
    _onChange: jest.fn(),
  };

  it('ラベルが表示されること', () => {
    render(<KfCheckbox {...defaultProps} _label="テストラベル" />);
    expect(screen.getByText('テストラベル')).toBeInTheDocument();
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
    const checkboxWrapper = checkboxInput.closest('span');
    expect(checkboxWrapper).not.toBeNull();
    // ラベルの直前の兄弟要素がcheckboxWrapperであることを検証
    expect(label.previousElementSibling).toBe(checkboxWrapper);
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
    const label = screen.getByText('styleラベル');
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