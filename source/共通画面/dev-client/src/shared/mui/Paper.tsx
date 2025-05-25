// MUIのPaperコンポーネントをラップした共通コンポーネント
import React from 'react';
import Paper from '@mui/material/Paper';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * 共通Paperコンポーネントのプロパティ
 */
export interface CommonPaperProps {
  /**
   * Paperの子要素
   */
  _children?: React.ReactNode;
  /**
   * Paperの高さ（影の強さ）
   * 0～24の整数値を指定
   * @default 1
   */
  _elevation?: number;
  /**
   * 追加のクラス名
   */
  _className?: string;
  /**
   * スタイルオブジェクト
   */
  _style?: React.CSSProperties;
  /**
   * sxプロパティ（MUI推奨のスタイル指定方法）
   */
  _sx?: SxProps<Theme>;
  /**
   * 角丸を無効化する
   * @default false
   */
  _square?: boolean;
  /**
   * Paperのvariant
   * 'elevation' または 'outlined'
   * @default 'elevation'
   */
  _variant?: 'elevation' | 'outlined';
  /**
   * PaperのHTMLタグやカスタムコンポーネント
   * 例: 'section', 'div', カスタムReactコンポーネント
   */
  _component?: React.ElementType;
  /**
   * タブ移動の順序を制御する
   */
  _tabIndex?: number;
  /**
   * aria-label属性
   */
  _ariaLabel?: string;
  /**
   * aria-labelledby属性
   */
  _ariaLabelledby?: string;
  /**
   * role属性
   */
  _role?: string;
  /**
   * id属性
   */
  _id?: string;
  /**
   * クリックイベントハンドラ
   */
  _onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * マウスオーバーイベントハンドラ
   */
  _onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * マウスアウトイベントハンドラ
   */
  _onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * ref属性
   */
  _ref?: React.Ref<HTMLDivElement>;
  /**
   * Paperの色（MUI v5以降）
   * 例: 'primary', 'secondary', 'default', 'inherit'
   */
  _color?: 'primary' | 'secondary' | 'default' | 'inherit' | string;
  /**
   * その他Paperのprops
   */
  [key: string]: any;
}

/**
 * 共通Paperコンポーネント
 * @param props CommonPaperProps
 * @returns Paperコンポーネント
 */
const CommonPaper: React.FC<CommonPaperProps> = ({
  _children,
  _elevation = 1,
  _className,
  _style,
  _sx,
  _square = false,
  _variant = 'elevation',
  _component,
  _tabIndex,
  _ariaLabel,
  _ariaLabelledby,
  _role,
  _id,
  _onClick,
  _onMouseEnter,
  _onMouseLeave,
  _ref,
  _color,
  ...rest
}) => {
  // Paperコンポーネントをそのまま返却
  return (
    <Paper
      elevation={_elevation}
      className={_className}
      style={_style}
      sx={_sx}
      square={_square}
      variant={_variant}
      {...(_component ? { component: _component } : {})}
      tabIndex={_tabIndex}
      aria-label={_ariaLabel}
      aria-labelledby={_ariaLabelledby}
      role={_role}
      id={_id}
      onClick={_onClick}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
      ref={_ref}
      color={_color}
      {...rest}
    >
      {_children}
    </Paper>
  );
};

export default CommonPaper;

/**
 * 使用例:
 *
 * // 基本的な使い方
 * <CommonPaper _children={<div>内容</div>} />
 *
 * // elevation, variant, style, classNameなどを指定
 * <CommonPaper _elevation={3} _variant="outlined" _style={{ padding: 16 }} _className="my-paper">
 *   <span>カスタム内容</span>
 * </CommonPaper>
 *
 * // sxプロパティでスタイル指定
 * <CommonPaper _sx={{ m: 2, p: 2, bgcolor: 'grey.100' }}>
 *   <p>sxによるスタイル</p>
 * </CommonPaper>
 *
 * // sectionタグとして利用し、aria属性も付与
 * <CommonPaper _component="section" _ariaLabel="セクション" _tabIndex={0}>
 *   <h2>セクションタイトル</h2>
 *   <p>説明文</p>
 * </CommonPaper>
 *
 * // クリックイベントを利用
 * <CommonPaper _onClick={() => alert('クリックされました')}>
 *   <div>クリック可能なPaper</div>
 * </CommonPaper>
 *
 * // refやonMouseEnter/onMouseLeaveを利用
 * const paperRef = React.useRef<HTMLDivElement>(null);
 * <CommonPaper
 *   _ref={paperRef}
 *   _onMouseEnter={() => console.log('マウスオーバー')}
 *   _onMouseLeave={() => console.log('マウスアウト')}
 * >
 *   <div>マウスイベント対応Paper</div>
 * </CommonPaper>
 *
 * // colorプロパティを利用（MUI v5以降）
 * <CommonPaper _color="primary">
 *   <div>色付きPaper</div>
 * </CommonPaper>
 *
 */