import React from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

/**
 * Typographyコンポーネントのプロパティ
 * 
 * `_`で始まるプロパティはラップ用の独自拡張です。
 * 
 * @property _children 表示するテキストや要素
 * @property _variant テキストのバリアント（例: 'h1', 'body1' など）
 * @property _color テキストの色
 * @property _align テキストのアライメント
 * @property _fontWeight テキストの太さ
 * @property _style テキストの追加スタイル
 * @property _className 追加のクラス名
 * @property _gutterBottom 下部に余白を追加するか
 * @property _noWrap テキストを折り返さず省略記号を付けるか
 * @property _paragraph 段落として表示するか
 * @property _component ルート要素のHTMLタグやカスタムコンポーネント
 * @property _sx sxプロパティ（MUIのスタイル拡張）
 */
export interface TypographyProps extends Omit<MuiTypographyProps, 'children' | 'variant' | 'color' | 'align' | 'style' | 'className' | 'gutterBottom' | 'noWrap' | 'paragraph' | 'component' | 'sx'> {
  /**
   * 表示するテキストや要素
   */
  _children?: React.ReactNode;
  /**
   * テキストのバリアント（例: 'h1', 'body1' など）
   */
  _variant?: MuiTypographyProps['variant'];
  /**
   * テキストの色
   */
  _color?: MuiTypographyProps['color'];
  /**
   * テキストのアライメント
   */
  _align?: MuiTypographyProps['align'];
  /**
   * テキストを太字にするか
   */
  _fontWeight?: React.CSSProperties['fontWeight'];
  /**
   * テキストのスタイル
   */
  _style?: React.CSSProperties;
  /**
   * 追加のクラス名
   */
  _className?: string;
  /**
   * 下部に余白を追加するか
   */
  _gutterBottom?: boolean;
  /**
   * テキストを折り返さず省略記号を付けるか
   */
  _noWrap?: boolean;
  /**
   * 段落として表示するか
   */
  _paragraph?: boolean;
  /**
   * ルート要素のHTMLタグやカスタムコンポーネント
   */
  _component?: MuiTypographyProps['component'];
  /**
   * sxプロパティ（MUIのスタイル拡張）
   */
  _sx?: MuiTypographyProps['sx'];
  // ...他のMuiTypographyPropsも利用可能
}

/**
 * アプリ共通のTypographyコンポーネント
 * 
 * MUIのTypographyをラップし、型補完とコメントを充実させたものです。
 * 
 * @example
 * ```tsx
 * import Typography from './Typography';
 * 
 * // 見出しとして利用
 * <Typography _variant="h4" _color="primary" _fontWeight="bold" _gutterBottom>
 *   タイトル
 * </Typography>
 * 
 * // 通常テキスト
 * <Typography _variant="body1" _style={{ marginTop: 8 }} _noWrap>
 *   本文テキスト
 * </Typography>
 * ```
 * 
 * @param props TypographyProps
 * @returns Typography要素
 */
const Typography: React.FC<TypographyProps> = ({
  _children,
  _variant,
  _color,
  _align,
  _fontWeight,
  _style,
  _className,
  _gutterBottom,
  _noWrap,
  _paragraph,
  _component,
  _sx,
  ...props
}) => {
  // _fontWeightを_styleにマージ
  const mergedStyle = _fontWeight ? { ..._style, fontWeight: _fontWeight } : _style;
  return (
    <MuiTypography
      variant={_variant}
      color={_color}
      align={_align}
      style={mergedStyle}
      className={_className}
      gutterBottom={_gutterBottom}
      noWrap={_noWrap}
      paragraph={_paragraph}
      {...(_component ? { component: _component } : {})}
      sx={_sx}
      {...props}
    >
      {_children}
    </MuiTypography>
  );
};

export default Typography;

// ---------------------------------------------
// 使用例
// 
// import Typography from './Typography';
//
// <Typography _variant="h5" _color="secondary" _fontWeight="bold" _gutterBottom>
//   サンプル見出し
// </Typography>
//
// <Typography _variant="body2" _style={{ marginTop: 12 }} _noWrap>
//   サンプル本文
// </Typography>
