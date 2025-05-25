import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import KfButton from '../../../shared/mui/Button';

// TouchRipple の act() 警告のみを抑制
beforeAll(() => {
  const originalConsoleError = console.error;
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    const msg = args.filter((a) => typeof a === 'string').join(' ');
    if (msg.includes('TouchRipple') && msg.includes('not wrapped in act')) {
      return;
    }
    originalConsoleError(...args);
  });
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe('KfButton', () => {
  it('renders children', () => {
    const { getByText } = render(<KfButton _children="テストボタン" />);
    expect(getByText('テストボタン')).toBeInTheDocument();
  });

  it('calls _onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<KfButton _children="クリック" _onClick={handleClick} />);
    act(() => {
      fireEvent.click(getByRole('button'));
    });
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies _variant and _color props', () => {
    const { getByRole } = render(
      <KfButton _children="色" _variant="outlined" _color="secondary" />
    );
    const button = getByRole('button');
    expect(button.className).toMatch(/MuiButton-outlined/);
    expect(button.className).toMatch(/MuiButton-colorSecondary/);
  });

  it('is disabled when _disabled is true', () => {
    const { getByRole } = render(<KfButton _children="無効" _disabled />);
    expect(getByRole('button')).toBeDisabled();
  });

  it('spreads data-* attributes', () => {
    const { getByRole } = render(
      <KfButton _children="data属性" data-test-id="mybutton" />
    );
    expect(getByRole('button')).toHaveAttribute('data-test-id', 'mybutton');
  });

  it('renders start and end icons', () => {
    const { getByText } = render(
      <KfButton
        _children="アイコン"
        _startIcon={<span>左</span>}
        _endIcon={<span>右</span>}
      />
    );
    expect(getByText('左')).toBeInTheDocument();
    expect(getByText('右')).toBeInTheDocument();
  });

  it('sets the button type', () => {
    const { getByRole } = render(<KfButton _children="送信" _type="submit" />);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies className and style', () => {
    const { getByRole } = render(
      <KfButton
        _children="class"
        _className="my-class"
        _style={{ backgroundColor: 'red' }}
      />
    );
    const btn = getByRole('button');
    expect(btn.className).toMatch(/my-class/);
    expect(btn).toHaveStyle('background-color: red');
  });

  it('applies fullWidth', () => {
    const { getByRole } = render(<KfButton _children="full" _fullWidth />);
    expect(getByRole('button').className).toMatch(/MuiButton-fullWidth/);
  });

  it('applies tabIndex', () => {
    const { getByRole } = render(<KfButton _children="tab" _tabIndex={5} />);
    expect(getByRole('button')).toHaveAttribute('tabindex', '5');
  });

  it('applies title', () => {
    const { getByRole } = render(<KfButton _children="title" _title="ヒント" />);
    expect(getByRole('button')).toHaveAttribute('title', 'ヒント');
  });

  it('applies value', () => {
    const { getByRole } = render(<KfButton _children="val" _value="abc" />);
    expect(getByRole('button')).toHaveAttribute('value', 'abc');
  });

  it('applies form and name', () => {
    const { getByRole } = render(
      <KfButton _children="form" _form="myform" _name="myname" />
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('form', 'myform');
    expect(btn).toHaveAttribute('name', 'myname');
  });

  it('applies autoFocus', () => {
    const { getByRole } = render(<KfButton _children="auto" _autoFocus />);
    // autoFocusが効いている場合、ボタンがフォーカスされているはず
    expect(getByRole('button')).toHaveFocus();
  });

  it('applies disableElevation, disableRipple, disableFocusRipple', () => {
    const { getByRole } = render(
      <KfButton
        _children="disable"
        _disableElevation
        _disableRipple
        _disableFocusRipple
      />
    );
    // 属性としては現れないが、MUIの内部propsとして渡される
    // smoke test: should render without error
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('applies edge prop', () => {
    const { getByRole } = render(<KfButton _children="edge" _edge="start" />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('applies aria attributes', () => {
    const { getByRole } = render(
      <KfButton
        _children="aria"
        _ariaLabel="ラベル"
        _ariaControls="menu"
        _ariaHaspopup
        _ariaExpanded
      />
    );
    const btn = getByRole('button');
    expect(btn).toHaveAttribute('aria-label', 'ラベル');
    expect(btn).toHaveAttribute('aria-controls', 'menu');
    expect(btn).toHaveAttribute('aria-haspopup', 'true');
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies id prop', () => {
    const { getByRole } = render(<KfButton _children="id" _id="myid" />);
    expect(getByRole('button')).toHaveAttribute('id', 'myid');
  });

  it('renders with different sizes', () => {
    ['small', 'medium', 'large'].forEach((size) => {
      const { getByRole, unmount } = render(
        <KfButton _children={size} _size={size as any} />
      );
      expect(getByRole('button').className).toMatch(
        new RegExp(`MuiButton-size${size.charAt(0).toUpperCase() + size.slice(1)}`)
      );
      unmount();
    });
  });

  it('renders with different colors', () => {
    ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'].forEach((color) => {
      const { getByRole, unmount } = render(
        <KfButton _children={color} _color={color as any} />
      );
      expect(getByRole('button').className).toMatch(
        new RegExp(`MuiButton-color${color.charAt(0).toUpperCase() + color.slice(1)}`)
      );
      unmount();
    });
  });
});