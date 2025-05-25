// MUIのBoxコンポーネントをインポート
import Box from '@mui/material/Box';
import React from 'react';

/**
 * CustomBox用プロパティ型
 */
type BoxProps = {
  /** 子要素 */
  _children?: React.ReactNode;
  /** sxプロパティ（スタイル指定） */
  _sx?: object;
  /** レンダリングする要素（例: 'div', 'span'など） */
  _component?: React.ElementType;
  /** クラス名 */
  _className?: string;
  /** id属性 */
  _id?: string;
  /** onClickイベントハンドラ */
  _onClick?: React.MouseEventHandler<HTMLElement>;
  /** ref属性 */
  _ref?: React.Ref<HTMLElement>;
  /** role属性 */
  _role?: string;
  /** tabIndex属性 */
  _tabIndex?: number;
  /** aria-label属性 */
  _ariaLabel?: string;
  /** aria-hidden属性 */
  _ariaHidden?: boolean;
  /** style属性（インラインスタイル） */
  _style?: React.CSSProperties;
  /** title属性（ツールチップ） */
  _title?: string;
  /** data-testid属性（テスト用） */
  _dataTestid?: string;
  /** draggable属性 */
  _draggable?: boolean;
  /** hidden属性 */
  _hidden?: boolean;
  /** onMouseEnterイベントハンドラ */
  _onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  /** onMouseLeaveイベントハンドラ */
  _onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  /** onDoubleClickイベントハンドラ */
  _onDoubleClick?: React.MouseEventHandler<HTMLElement>;
  /** onKeyDownイベントハンドラ */
  _onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /** onFocusイベントハンドラ */
  _onFocus?: React.FocusEventHandler<HTMLElement>;
  /** onBlurイベントハンドラ */
  _onBlur?: React.FocusEventHandler<HTMLElement>;
  // 必要に応じて他のプロパティも追加可能
};

/**
 * MUI Boxのラッパーコンポーネント
 * @param _children 子要素
 * @param _sx スタイル
 * @param _component レンダリングする要素
 * @param _class クラス名
 * @param _id id属性
 * @param _onClick クリックイベント
 * @param _ref ref属性
 * @param _role role属性
 * @param _tabIndex tabIndex属性
 * @param _ariaLabel aria-label属性
 * @param _ariaHidden aria-hidden属性
 * @param _style style属性
 * @param _title title属性
 * @param _dataTestid data-testid属性
 * @param _draggable draggable属性
 * @param _hidden hidden属性
 * @param _onMouseEnter onMouseEnterイベント
 * @param _onMouseLeave onMouseLeaveイベント
 * @param _onDoubleClick onDoubleClickイベント
 * @param _onKeyDown onKeyDownイベント
 * @param _onFocus onFocusイベント
 * @param _onBlur onBlurイベント
 */
const CustomBox: React.FC<BoxProps> = ({
  _children,
  _sx,
  _component,
  _className,
  _id,
  _onClick,
  _ref,
  _role,
  _tabIndex,
  _ariaLabel,
  _ariaHidden,
  _style,
  _title,
  _dataTestid,
  _draggable,
  _hidden,
  _onMouseEnter,
  _onMouseLeave,
  _onDoubleClick,
  _onKeyDown,
  _onFocus,
  _onBlur,
  ...rest
}) => {
  return (
    <Box
      sx={_sx}
      {...(_component ? { component: _component } : {})}
      className={_className}
      id={_id}
      onClick={_onClick}
      ref={_ref}
      role={_role}
      tabIndex={_tabIndex}
      aria-label={_ariaLabel}
      aria-hidden={_ariaHidden}
      style={_style}
      title={_title}
      data-testid={_dataTestid}
      draggable={_draggable}
      hidden={_hidden}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
      onDoubleClick={_onDoubleClick}
      onKeyDown={_onKeyDown}
      onFocus={_onFocus}
      onBlur={_onBlur}
      {...rest}
    >
      {_children}
    </Box>
  );
};

export default CustomBox;

/**
 * 使用例:
 * 
 * import CustomBox from './Box';
 * 
 * <CustomBox
 *   _sx={{ p: 2, backgroundColor: 'lightblue', borderRadius: 2 }}
 *   _component="section"
 *   _className="my-section"
 *   _id="main-section"
 *   _onClick={() => alert('クリックされました')}
 *   _role="region"
 *   _tabIndex={0}
 *   _ariaLabel="メインセクション"
 *   _title="セクションの説明"
 *   _dataTestid="main-section-box"
 *   _draggable={false}
 *   _hidden={false}
 *   _onMouseEnter={() => console.log('マウスが乗りました')}
 *   _onMouseLeave={() => console.log('マウスが離れました')}
 *   _onDoubleClick={() => alert('ダブルクリック')}
 *   _onKeyDown={e => { if (e.key === 'Enter') alert('Enter押下'); }}
 *   _onFocus={() => console.log('フォーカス')}
 *   _onBlur={() => console.log('フォーカス外れ')}
 * >
 *   <p>ここに内容を記載</p>
 * </CustomBox>
 */
