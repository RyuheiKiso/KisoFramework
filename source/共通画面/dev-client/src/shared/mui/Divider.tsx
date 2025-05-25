// MUIのDividerコンポーネントをインポート
import Divider from '@mui/material/Divider';
import React from 'react';

/**
 * DividerProps型
 * MUI Dividerの主なプロパティを_付きで提供
 */
type DividerProps = {
  /** Dividerの方向（horizontal: 横, vertical: 縦） */
  _orientation?: 'horizontal' | 'vertical';
  /** flexItemを有効にするか（親がflexの場合に使用） */
  _flexItem?: boolean;
  /** Dividerのバリアント（fullWidth: 全幅, inset: 端寄せ, middle: 中央寄せ） */
  _variant?: 'fullWidth' | 'inset' | 'middle';
  /** Divider内に表示する子要素 */
  _children?: React.ReactNode;
  /** カスタムクラス名 */
  _className?: string;
  /** インラインスタイル */
  _style?: React.CSSProperties;
  /** 色（primary, secondary, inherit, custom colorも可） */
  _color?: 'primary' | 'secondary' | 'inherit' | string;
  /** lightスタイルを適用するか（薄い線） */
  _light?: boolean;
  /** role属性（アクセシビリティ用） */
  _role?: string;
  /** aria-label属性（アクセシビリティ用） */
  _ariaLabel?: string;
  /** aria-orientation属性（アクセシビリティ用） */
  _ariaOrientation?: 'horizontal' | 'vertical';
  /** sxプロパティ（MUIのスタイル拡張） */
  _sx?: object;
  /** ref（参照用） */
  _ref?: React.Ref<any>;
  /** absolute位置指定（親要素に対して絶対配置） */
  _absolute?: boolean;
  /** textAlign（子要素のテキスト位置: center, right, left） */
  _textAlign?: 'center' | 'right' | 'left';
  /** 不透明度 */
  _opacity?: number;
  /** データ属性（任意のdata-*属性を付与可能） */
  [key: `data-${string}`]: any;
  /** コンポーネントのタグ種別（div, hr, li など） */
  _component?: React.ElementType;
  /** システムプロパティ: id属性 */
  _id?: string;
  /** タブインデックス */
  _tabIndex?: number;
  /** イベント: クリック時 */
  _onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** イベント: マウスオーバー時 */
  _onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  /** イベント: フォーカス時 */
  _onFocus?: React.FocusEventHandler<HTMLDivElement>;
};

/**
 * CustomDividerコンポーネント
 * MUI Dividerをラップし、プロパティ名の先頭に_を付与
 * @param props DividerProps
 * @returns Dividerコンポーネント
 */
const KfDivider: React.FC<DividerProps> = ({
  _orientation,
  _flexItem,
  _variant,
  _children,
  _className,
  _style,
  _color,
  _light,
  _role,
  _ariaLabel,
  _ariaOrientation,
  _sx,
  _ref,
  _absolute,
  _textAlign,
  _opacity,
  _component,
  _id,
  _tabIndex,
  _onClick,
  _onMouseOver,
  _onFocus,
  ...dataProps // data-*属性用
}) => {
  return (
    <Divider
      orientation={_orientation}
      flexItem={_flexItem}
      variant={_variant}
      className={_className}
      style={{ ..._style, opacity: _opacity }}
      color={_color}
      light={_light}
      role={_role}
      aria-label={_ariaLabel}
      aria-orientation={_ariaOrientation}
      sx={{ ..._sx, textAlign: _textAlign }}
      ref={_ref}
      absolute={_absolute}
      {...(_component ? { component: _component } : {})}
      id={_id}
      tabIndex={_tabIndex}
      onClick={_onClick}
      onMouseOver={_onMouseOver}
      onFocus={_onFocus}
      {...dataProps}
    >
      {_children}
    </Divider>
  );
};

export default KfDivider;

/**
 * 使用例
 * 
 * import KfDivider from './Divider';
 * 
 * // 横方向のDivider（デフォルト）
 * <KfDivider />
 * 
 * // テキスト付き、縦方向、insetバリアント
 * <KfDivider
 *   _orientation="vertical"
 *   _variant="inset"
 *   _children="OR"
 *   _className="my-divider"
 *   _style={{ margin: '8px' }}
 * />
 * 
 * // primary色、lightスタイル、flexItem有効
 * <KfDivider
 *   _color="primary"
 *   _light
 *   _flexItem
 * />
 * 
 * // absolute配置、テキスト右寄せ、カスタムdata属性
 * <KfDivider
 *   _absolute
 *   _textAlign="right"
 *   data-testid="divider-test"
 * />
 * 
 * // 不透明度を指定
 * <KfDivider
 *   _opacity={0.5}
 * />
 * 
 * // componentをliタグに変更し、idとイベントを付与
 * <KfDivider
 *   _component="li"
 *   _id="divider-li"
 *   _onClick={() => alert('clicked')}
 * />
 */
