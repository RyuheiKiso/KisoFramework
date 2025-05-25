// MUIのCircularProgressをラップしたコンポーネント

import React, { JSX } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type ProgressProps = {
  /**
   * サイズ（ピクセル単位）
   * @default 40
   */
  _size?: number;
  /**
   * 色
   * @default 'primary'
   * 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning'
   */
  _color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
  /**
   * 太さ
   * @default 3.6
   */
  _thickness?: number;
  /**
   * 表示/非表示
   * @default true
   */
  _visible?: boolean;
  /**
   * 進捗値（0-100）。指定時は determinate モード
   */
  _value?: number;
  /**
   * モード（determinate: 進捗値指定, indeterminate: 無限ループ）
   * @default 'indeterminate'
   */
  _variant?: 'determinate' | 'indeterminate';
  /**
   * スタイル上書き
   */
  _style?: React.CSSProperties;
  /**
   * クラス名
   */
  _className?: string;
  /**
   * aria-label属性
   */
  _ariaLabel?: string;
  /**
   * data-testid属性
   */
  _testId?: string;
  /**
   * id属性
   */
  _id?: string;
  /**
   * role属性
   */
  _role?: string;
  /**
   * tabIndex属性
   */
  _tabIndex?: number;
  /**
   * onClickイベント
   */
  _onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /**
   * onMouseEnterイベント
   */
  _onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  /**
   * onMouseLeaveイベント
   */
  _onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  /**
   * onFocusイベント
   */
  _onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  /**
   * onBlurイベント
   */
  _onBlur?: React.FocusEventHandler<HTMLSpanElement>;
  /**
   * title属性（ツールチップ用）
   */
  _title?: string;
  /**
   * aria-valuenow属性（アクセシビリティ用）
   */
  _ariaValueNow?: number;
  /**
   * aria-valuemin属性（アクセシビリティ用）
   */
  _ariaValueMin?: number;
  /**
   * aria-valuemax属性（アクセシビリティ用）
   */
  _ariaValueMax?: number;
  /**
   * aria-busy属性（アクセシビリティ用）
   */
  _ariaBusy?: boolean;
  /**
   * aria-live属性（アクセシビリティ用）
   */
  _ariaLive?: 'off' | 'polite' | 'assertive';
  /**
   * sxプロパティ（MUI独自のスタイル指定）
   */
  _sx?: any;
  /**
   * disableShrinkプロパティ（アニメーション制御）
   * @default false
   */
  _disableShrink?: boolean;
  /**
   * ラッパー要素のstyle
   */
  _wrapperStyle?: React.CSSProperties;
  /**
   * ラッパー要素のclassName
   */
  _wrapperClassName?: string;
  /**
   * ラッパー要素のタグ種別（span/div/section等）
   * @default 'span'
   */
  _wrapperTag?: keyof JSX.IntrinsicElements;
  /**
   * ローディング時に表示するテキスト（アクセシビリティ用）
   */
  _loadingText?: string;
  /**
   * aria-describedby属性
   */
  _ariaDescribedBy?: string;
  /**
   * aria-labelledby属性
   */
  _ariaLabelledBy?: string;
  /**
   * CircularProgressの後ろに表示する子要素
   */
  children?: React.ReactNode;
};

const Progress: React.FC<ProgressProps> = ({
  _size = 40,
  _color = 'primary',
  _thickness = 3.6,
  _visible = true,
  _value,
  _variant,
  _style,
  _className,
  _ariaLabel,
  _testId,
  _id,
  _role,
  _tabIndex,
  _onClick,
  _onMouseEnter,
  _onMouseLeave,
  _onFocus,
  _onBlur,
  _title,
  _ariaValueNow,
  _ariaValueMin,
  _ariaValueMax,
  _ariaBusy,
  _ariaLive,
  _sx,
  _disableShrink = false,
  _wrapperStyle,
  _wrapperClassName,
  _wrapperTag = 'span',
  _loadingText,
  _ariaDescribedBy,
  _ariaLabelledBy,
  children,
}) => {
  // 非表示の場合はnullを返す
  if (!_visible) return null;
  const Wrapper = _wrapperTag as any;
  return (
    <Wrapper
      style={_wrapperStyle}
      className={_wrapperClassName}
    >
      <CircularProgress
        size={_size}
        color={_color}
        thickness={_thickness}
        value={_value}
        variant={_variant ?? (_value !== undefined ? 'determinate' : 'indeterminate')}
        style={_style}
        className={_className}
        aria-label={_ariaLabel}
        data-testid={_testId}
        id={_id}
        role={_role}
        tabIndex={_tabIndex}
        onClick={_onClick}
        onMouseEnter={_onMouseEnter}
        onMouseLeave={_onMouseLeave}
        onFocus={_onFocus}
        onBlur={_onBlur}
        title={_title}
        aria-valuenow={_ariaValueNow}
        aria-valuemin={_ariaValueMin}
        aria-valuemax={_ariaValueMax}
        aria-busy={_ariaBusy}
        aria-live={_ariaLive}
        sx={_sx}
        disableShrink={_disableShrink}
        aria-describedby={_ariaDescribedBy}
        aria-labelledby={_ariaLabelledBy}
      />
      {_loadingText && (
        <span style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
          {_loadingText}
        </span>
      )}
      {children}
    </Wrapper>
  );
};

export default Progress;

/**
 * 使用例:
 * 
 * // indeterminate（無限ループ）で表示
 * <Progress />
 * 
 * // determinate（進捗値指定）で表示
 * <Progress _value={60} _variant="determinate" />
 * 
 * // サイズ・色・太さ・非表示
 * <Progress _size={60} _color="secondary" _thickness={5} _visible={false} />
 * 
 * // スタイルやクラス名、aria-labelの指定
 * <Progress _className="my-progress" _style={{margin: 8}} _ariaLabel="読み込み中" />
 * 
 * // テストIDやID、role、tabIndex、onClickイベントの指定
 * <Progress
 *   _testId="progress-test"
 *   _id="progress1"
 *   _role="progressbar"
 *   _tabIndex={0}
 *   _onClick={() => alert('clicked!')}
 * />
 * 
 * // マウスイベントやフォーカスイベント、title属性の指定
 * <Progress
 *   _onMouseEnter={() => console.log('enter')}
 *   _onMouseLeave={() => console.log('leave')}
 *   _onFocus={() => console.log('focus')}
 *   _onBlur={() => console.log('blur')}
 *   _title="進捗中"
 * />
 * 
 * // アクセシビリティ属性やMUIのsx、アニメーション制御
 * <Progress
 *   _ariaValueNow={50}
 *   _ariaValueMin={0}
 *   _ariaValueMax={100}
 *   _ariaBusy={true}
 *   _ariaLive="polite"
 *   _sx={{ color: 'green' }}
 *   _disableShrink={true}
 * />
 * 
 * // ラッパー要素のstyle/className/tag指定
 * <Progress
 *   _wrapperStyle={{ display: 'inline-block', background: '#eee' }}
 *   _wrapperClassName="progress-wrapper"
 *   _wrapperTag="div"
 * />
 * 
 * // ローディングテキスト（スクリーンリーダー用）を追加
 * <Progress _loadingText="読み込み中です" />
 * 
 * // aria-describedby/aria-labelledby/子要素の追加
 * <Progress
 *   _ariaDescribedBy="desc"
 *   _ariaLabelledBy="label"
 * >
 *   <span id="desc">追加説明</span>
 *   <span id="label">進捗バー</span>
 * </Progress>
 */
