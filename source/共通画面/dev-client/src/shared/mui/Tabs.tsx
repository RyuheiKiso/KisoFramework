// MUIのTabsコンポーネントをラップしたカスタムコンポーネント

import React from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';

/**
 * タブ情報の型
 */
export interface TabItem {
  /** タブのラベル（表示名） */
  _label: string;
  /** タブの値（ユニークな値） */
  _value: string | number;
  /** タブが無効かどうか（省略時はfalse） */
  _disabled?: boolean;
  /** タブに付与するアイコン（任意） */
  _icon?: React.ReactNode;
  /** タブのaria-label（アクセシビリティ用、任意） */
  _ariaLabel?: string;
  /** タブの追加クラス名（任意） */
  _className?: string;
  /** タブのid属性（任意） */
  _id?: string;
  /** タブのstyle属性（任意） */
  _style?: React.CSSProperties;
  /** タブの追加props（任意） */
  _TabProps?: Partial<TabProps>;
}

/**
 * Tabsコンポーネントのプロパティ
 */
export interface MuiTabsProps {
  /** 選択中のタブの値 */
  _value: string | number;
  /**
   * タブ変更時のコールバック
   * @param event イベントオブジェクト
   * @param value 選択されたタブの値
   */
  _onChange: (event: React.SyntheticEvent, value: string | number) => void;
  /** タブのリスト */
  _tabs: TabItem[];
  /** タブの下に表示する子要素（任意） */
  _children?: React.ReactNode;
  /** Tabsコンポーネントの追加クラス名（任意） */
  _className?: string;
  /** Tabsのvariant（標準: 'standard', 'scrollable', 'fullWidth'） */
  _variant?: 'standard' | 'scrollable' | 'fullWidth';
  /** Tabsのorientation（標準: 'horizontal', 'vertical'） */
  _orientation?: 'horizontal' | 'vertical';
  /** Tabsの色（標準: 'primary', 'secondary'） */
  _color?: 'primary' | 'secondary';
  /** Tabsのaria-label（アクセシビリティ用、任意） */
  _ariaLabel?: string;
  /** Tabsのインジケータ表示有無（任意） */
  _hideIndicator?: boolean;
  /** Tabsの中央寄せ（任意, variantがstandard時のみ有効） */
  _centered?: boolean;
  /** スクロールボタンの表示方法（任意, scrollable時のみ有効） */
  _scrollButtons?: 'auto' | 'desktop' | false;
  /** モバイルでスクロールボタンを許可（任意, scrollable時のみ有効） */
  _allowScrollButtonsMobile?: boolean;
  /** フォーカス移動時に選択状態を追従させる（任意） */
  _selectionFollowsFocus?: boolean;
  /** Tabsのid属性（任意） */
  _id?: string;
  /** Tabsのstyle属性（任意） */
  _style?: React.CSSProperties;
  /** Tabs全体に追加で渡すprops（任意） */
  _TabsProps?: Partial<TabsProps>;
  /** 各Tabに共通で渡すprops（任意） */
  _tabProps?: Partial<TabProps>;
  /**
   * タブクリック時のコールバック（任意）
   * @param event クリックイベント
   * @param tab タブ情報
   */
  _onTabClick?: (event: React.MouseEvent, tab: TabItem) => void;
}

/**
 * MUI Tabsラッパーコンポーネント
 */
const MuiTabs: React.FC<MuiTabsProps> = ({
  _value,
  _onChange,
  _tabs,
  _children,
  _className,
  _variant = 'standard',
  _orientation = 'horizontal',
  _color = 'primary',
  _ariaLabel,
  _hideIndicator,
  _centered,
  _scrollButtons,
  _allowScrollButtonsMobile,
  _selectionFollowsFocus,
  _id,
  _style,
  _TabsProps,
  _tabProps,
  _onTabClick,
}) => {
  return (
    <div>
      <Tabs
        value={_value}
        onChange={_onChange}
        className={_className}
        variant={_variant}
        orientation={_orientation}
        textColor={_color}
        indicatorColor={_color}
        aria-label={_ariaLabel}
        TabIndicatorProps={_hideIndicator ? { style: { display: 'none' } } : undefined}
        scrollButtons={
          _scrollButtons === 'desktop'
            ? true
            : _scrollButtons === false
              ? undefined
              : _scrollButtons
        }
        allowScrollButtonsMobile={_allowScrollButtonsMobile}
        selectionFollowsFocus={_selectionFollowsFocus}
        id={_id}
        style={_style}
        {..._TabsProps}
      >
        {_tabs.map((tab) => {
          const tabProps: any = {
            key: tab._value,
            label: tab._label,
            value: tab._value,
            disabled: tab._disabled,
            'aria-label': tab._ariaLabel,
            className: tab._className,
            id: tab._id,
            style: tab._style,
            ..._tabProps,
            ...tab._TabProps,
            onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              tab._TabProps?.onClick?.(e as React.MouseEvent<HTMLDivElement, MouseEvent>);
              _tabProps?.onClick?.(e as React.MouseEvent<HTMLDivElement, MouseEvent>);
              _onTabClick?.(e, tab);
            },
          };
          if (tab._icon !== undefined && tab._icon !== null) {
            tabProps.icon = tab._icon;
          }
          return <Tab {...tabProps} />;
        })}
      </Tabs>
      {_children}
    </div>
  );
};

export default MuiTabs;

/**
 * 使用例
 * 
 * ```tsx
 * import MuiTabs, { TabItem } from './Tabs';
 * import HomeIcon from '@mui/icons-material/Home';
 * import SettingsIcon from '@mui/icons-material/Settings';
 * 
 * // タブリストの定義
 * const tabList: TabItem[] = [
 *   { _label: 'ホーム', _value: 'home', _icon: <HomeIcon />, _id: 'tab-home' },
 *   { _label: '設定', _value: 'settings', _icon: <SettingsIcon />, _disabled: true, _TabProps: { sx: { color: 'red' } } },
 *   { _label: 'プロフィール', _value: 'profile' },
 * ];
 * 
 * // 選択状態の管理
 * const [selected, setSelected] = React.useState<string | number>('home');
 * 
 * // タブクリック時の処理
 * const handleTabClick = (e: React.MouseEvent, tab: TabItem) => {
 *   console.log('クリックされたタブ:', tab._label);
 * };
 * 
 * // コンポーネントの利用
 * <MuiTabs
 *   _value={selected}
 *   _onChange={(_, v) => setSelected(v)}
 *   _tabs={tabList}
 *   _variant="scrollable"
 *   _color="secondary"
 *   _ariaLabel="メインタブ"
 *   _centered={false}
 *   _scrollButtons="auto"
 *   _allowScrollButtonsMobile={true}
 *   _selectionFollowsFocus={true}
 *   _id="main-tabs"
 *   _style={{ marginBottom: 8 }}
 *   _TabsProps={{ sx: { backgroundColor: '#f0f0f0' } }}
 *   _tabProps={{ sx: { fontWeight: 'bold' } }}
 *   _onTabClick={handleTabClick}
 * >
 *   <div>タブの下に表示する内容</div>
 * </MuiTabs>
 * ```
 */
