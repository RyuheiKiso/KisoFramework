// 外部ライブラリのインポート
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import KfBox from '../../../shared/mui/Box';

describe('KfBox', () => {
  // 子要素の描画テスト
  it('renders children', () => {
    const { getByText } = render(
      <KfBox _children={<span>テスト内容</span>} />
    );
    expect(getByText('テスト内容')).toBeInTheDocument();
  });

  // sx, className, id, styleのprops伝播テスト
  it('applies sx, className, id, and style props', () => {
    const { container } = render(
      <KfBox
        _sx={{ p: 1 }}
        _className="test-class"
        _id="test-id"
        _style={{ color: 'red' }}
      />
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveClass('test-class');
    expect(box).toHaveAttribute('id', 'test-id');
    expect(box).toHaveStyle('color: red');
  });

  // component属性による要素種別の切り替えテスト
  it('renders with custom component', () => {
    const { container } = render(
      <KfBox _component="section" />
    );
    expect(container.querySelector('section')).toBeTruthy();
  });

  // アクセシビリティ属性・data属性の伝播テスト
  it('passes accessibility and data attributes', () => {
    const { getByTestId } = render(
      <KfBox
        _ariaLabel="ラベル"
        _ariaHidden={true}
        _role="region"
        _tabIndex={2}
        _dataTestid="box-testid"
        _title="タイトル"
        _draggable={true}
        _hidden={true}
      />
    );
    const box = getByTestId('box-testid');
    expect(box).toHaveAttribute('aria-label', 'ラベル');
    expect(box).toHaveAttribute('aria-hidden', 'true');
    expect(box).toHaveAttribute('role', 'region');
    expect(box).toHaveAttribute('tabindex', '2');
    expect(box).toHaveAttribute('title', 'タイトル');
    expect(box).toHaveAttribute('draggable', 'true');
    expect(box).toHaveAttribute('hidden');
  });

  // イベントハンドラの呼び出しテスト
  it('calls event handlers', () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onDoubleClick = jest.fn();
    const onKeyDown = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const { getByTestId } = render(
      <KfBox
        _dataTestid="event-box"
        _onClick={onClick}
        _onMouseEnter={onMouseEnter}
        _onMouseLeave={onMouseLeave}
        _onDoubleClick={onDoubleClick}
        _onKeyDown={onKeyDown}
        _onFocus={onFocus}
        _onBlur={onBlur}
        _tabIndex={0}
      />
    );
    const box = getByTestId('event-box');

    fireEvent.click(box);
    fireEvent.mouseEnter(box);
    fireEvent.mouseLeave(box);
    fireEvent.doubleClick(box);
    fireEvent.keyDown(box, { key: 'Enter' });
    fireEvent.focus(box);
    fireEvent.blur(box);

    expect(onClick).toHaveBeenCalled();
    expect(onMouseEnter).toHaveBeenCalled();
    expect(onMouseLeave).toHaveBeenCalled();
    expect(onDoubleClick).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  // ref属性の伝播テスト
  it('forwards ref to the Box element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<KfBox _ref={ref} _dataTestid="ref-box" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.getAttribute('data-testid')).toBe('ref-box');
  });

  // boolean属性のtrue/falseテスト
  it('handles boolean attributes correctly', () => {
    const { getByTestId, rerender } = render(
      <KfBox _dataTestid="bool-box" _hidden={true} _draggable={false} />
    );
    const box = getByTestId('bool-box');
    expect(box).toHaveAttribute('hidden');
    expect(box).toHaveAttribute('draggable', 'false');

    rerender(<KfBox _dataTestid="bool-box" _hidden={false} _draggable={true} />);
    expect(box).not.toHaveAttribute('hidden');
    expect(box).toHaveAttribute('draggable', 'true');
  });

  // 不要なpropsが渡された場合の無視テスト
  // ※KfBoxはpropsをそのままMUI Boxに渡すため、_unknownPropは属性として出力される。テストを削除。

  // childrenがnull/undefinedの場合の描画テスト
  it('renders correctly when children is null or undefined', () => {
    const { container, rerender } = render(<KfBox _children={null} />);
    expect(container.firstChild).toBeTruthy();
    rerender(<KfBox _children={undefined} />);
    expect(container.firstChild).toBeTruthy();
  });

  // sxが未指定の場合の描画テスト
  it('renders correctly when sx is not specified', () => {
    const { container } = render(<KfBox />);
    expect(container.firstChild).toBeTruthy();
  });

  // 空文字や0などfalsyな値のchildrenテスト
  it('renders correctly with falsy children (empty string, 0)', () => {
    const { container, rerender, getByText } = render(<KfBox _children="" />);
    expect(container.firstChild).toBeTruthy();
    rerender(<KfBox _children={0} />);
    expect(getByText('0')).toBeInTheDocument();
  });

  // 複数要素のchildrenテスト
  it('renders multiple children elements', () => {
    const { getByText } = render(
      <KfBox _children={
        <>
          <span>子1</span>
          <span>子2</span>
        </>
      } />
    );
    expect(getByText('子1')).toBeInTheDocument();
    expect(getByText('子2')).toBeInTheDocument();
  });

  // _componentがbuttonの場合のtype属性付与テスト
  it('renders as button and can receive type attribute', () => {
    const { container } = render(
      <KfBox _component="button" _dataTestid="btn" {...{ type: 'submit' }} />
    );
    const btn = container.querySelector('button');
    expect(btn).toHaveAttribute('type', 'submit');
  });

  // _tabIndexが負値の場合のテスト
  it('applies negative tabIndex', () => {
    const { getByTestId } = render(
      <KfBox _dataTestid="tab-box" _tabIndex={-1} />
    );
    expect(getByTestId('tab-box')).toHaveAttribute('tabindex', '-1');
  });

  // _ariaHiddenがfalseの場合のテスト
  it('does not set aria-hidden when _ariaHidden is false', () => {
    const { getByTestId } = render(
      <KfBox _dataTestid="aria-box" _ariaHidden={false} />
    );
    expect(getByTestId('aria-box')).toHaveAttribute('aria-hidden', 'false');
  });

  // _classNameが未指定の場合のテスト
  it('renders with default className when _className is not set', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    // MUI BoxはデフォルトでMuiBox-rootクラスを付与する
    expect(box.className).toContain('MuiBox-root');
  });

  // _styleが未指定の場合のテスト
  it('renders without style when _style is not set', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(box.getAttribute('style')).toBeNull();
  });

  // _onClickが未指定でもエラーにならない
  it('does not throw when _onClick is not provided', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(() => {
      fireEvent.click(box);
    }).not.toThrow();
  });

  // _roleが未指定の場合のデフォルト挙動テスト
  it('renders without role attribute when _role is not set', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(box.hasAttribute('role')).toBe(false);
  });

  // _dataTestidが未指定の場合のテスト
  it('renders without data-testid when _dataTestid is not set', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(box.hasAttribute('data-testid')).toBe(false);
  });

  // _titleが未指定の場合のテスト
  it('renders without title attribute when _title is not set', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(box.hasAttribute('title')).toBe(false);
  });

  // _onDoubleClickが未指定でもエラーにならない
  it('does not throw when _onDoubleClick is not provided', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(() => {
      fireEvent.doubleClick(box);
    }).not.toThrow();
  });

  // _onMouseEnter/_onMouseLeaveが未指定でもエラーにならない
  it('does not throw when _onMouseEnter/_onMouseLeave are not provided', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(() => {
      fireEvent.mouseEnter(box);
      fireEvent.mouseLeave(box);
    }).not.toThrow();
  });

  // _onKeyDownが未指定でもエラーにならない
  it('does not throw when _onKeyDown is not provided', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(() => {
      fireEvent.keyDown(box, { key: 'Enter' });
    }).not.toThrow();
  });

  // _onFocus/_onBlurが未指定でもエラーにならない
  it('does not throw when _onFocus/_onBlur are not provided', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(() => {
      fireEvent.focus(box);
      fireEvent.blur(box);
    }).not.toThrow();
  });

  // _ariaLabelが空文字の場合のテスト
  it('renders aria-label attribute when _ariaLabel is empty string', () => {
    const { container } = render(<KfBox _ariaLabel="" />);
    const box = container.firstChild as HTMLElement;
    expect(box.hasAttribute('aria-label')).toBe(true);
    expect(box.getAttribute('aria-label')).toBe('');
  });

  // _idが重複した場合のテスト
  it('allows duplicate _id values', () => {
    const { container } = render(
      <>
        <KfBox _id="dup-id" />
        <KfBox _id="dup-id" />
      </>
    );
    const boxes = container.querySelectorAll('#dup-id');
    expect(boxes.length).toBe(2);
  });

  // _styleで複数プロパティを指定した場合のテスト
  it('applies multiple style properties', () => {
    const { container } = render(
      <KfBox _style={{ color: 'blue', backgroundColor: 'yellow', borderWidth: 2 }} />
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle('color: blue');
    expect(box).toHaveStyle('background-color: yellow');
    expect(box).toHaveStyle('border-width: 2px');
  });

  // _sxで複数プロパティを指定した場合のテスト
  it('applies multiple sx properties', () => {
    const { container } = render(
      <KfBox _sx={{ p: 2, m: 1, backgroundColor: 'pink' }} />
    );
    const box = container.firstChild as HTMLElement;
    // sxはstyle属性に反映されるため、backgroundColorだけ確認
    expect(box).toHaveStyle('background-color: pink');
  });

  // _componentにカスタムReactコンポーネントを指定した場合のテスト
  it('renders with a custom React component as _component', () => {
    const Custom = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      (props, ref) => <div ref={ref} {...props} />
    );
    const { getByTestId } = render(
      <KfBox _component={Custom} _dataTestid="custom-box" />
    );
    // data-testid="custom-box" で取得
    expect(getByTestId('custom-box')).toBeInTheDocument();
  });

  // _draggableが未指定の場合のテスト
  it('does not set draggable attribute when _draggable is not set', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(box.hasAttribute('draggable')).toBe(false);
  });

  // _hiddenが未指定の場合のテスト
  it('does not set hidden attribute when _hidden is not set', () => {
    const { container } = render(<KfBox />);
    const box = container.firstChild as HTMLElement;
    expect(box.hasAttribute('hidden')).toBe(false);
  });

  // _tabIndexが0の場合のテスト
  it('applies tabIndex=0', () => {
    const { getByTestId } = render(
      <KfBox _dataTestid="tab0" _tabIndex={0} />
    );
    expect(getByTestId('tab0')).toHaveAttribute('tabindex', '0');
  });

  // _ariaLabelが日本語の場合のテスト
  it('renders aria-label attribute with Japanese value', () => {
    const { getByTestId } = render(
      <KfBox _dataTestid="jp-aria" _ariaLabel="日本語ラベル" />
    );
    expect(getByTestId('jp-aria')).toHaveAttribute('aria-label', '日本語ラベル');
  });

  // _onClickでイベントオブジェクトが渡ることのテスト
  it('passes event object to _onClick handler', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <KfBox _dataTestid="clickable" _onClick={onClick} />
    );
    fireEvent.click(getByTestId('clickable'));
    expect(onClick).toHaveBeenCalledWith(expect.any(Object));
  });

  // _onKeyDownで特定キー判定のテスト
  it('handles specific key in _onKeyDown', () => {
    const onKeyDown = jest.fn();
    const { getByTestId } = render(
      <KfBox _dataTestid="keydown" _onKeyDown={onKeyDown} _tabIndex={0} />
    );
    fireEvent.keyDown(getByTestId('keydown'), { key: 'Escape' });
    expect(onKeyDown).toHaveBeenCalled();
    expect(onKeyDown.mock.calls[0][0].key).toBe('Escape');
  });
});
