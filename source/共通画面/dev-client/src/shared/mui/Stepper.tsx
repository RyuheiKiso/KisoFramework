// MUIのStepperコンポーネントをラップしたカスタムコンポーネント

// Reactをインポート
import React from 'react';
// MUIのStepper関連コンポーネントをインポート
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Tooltip from '@mui/material/Tooltip';
import { StepperProps as MuiStepperProps } from '@mui/material/Stepper';
import { StepProps as MuiStepProps } from '@mui/material/Step';
import { StepLabelProps as MuiStepLabelProps } from '@mui/material/StepLabel';
import { StepContentProps as MuiStepContentProps } from '@mui/material/StepContent';

/**
 * ステッパーコンポーネントのプロパティ型
 */
type StepperProps = {
  /** ステップのラベル配列 */
  _steps: string[];
  /** 現在のステップインデックス（0始まり） */
  _activeStep: number;
  /** ステップの内容（各ステップごとに表示する内容。省略可） */
  _stepContents?: React.ReactNode[];
  /** 垂直表示にする場合はtrue（デフォルト: false） */
  _vertical?: boolean;
  /** ステッパーの色（primary, secondaryなど。デフォルト: primary） */
  _color?: MuiStepperProps['color'];
  /** ステッパーのlinear制御（デフォルト: true） */
  _linear?: boolean;
  /** ステップクリック時のコールバック（インデックスを引数に受け取る） */
  _onStepClick?: (stepIndex: number) => void;
  /** ステップラベルのサブラベル（各ステップごとに表示するサブラベル。省略可） */
  _stepSubLabels?: string[];
  /** 各ステップのdisabled状態（省略可） */
  _stepDisabled?: boolean[];
  /** 各ステップの完了状態（省略可） */
  _stepCompleted?: boolean[];
  /** 各ステップのカスタムアイコン（省略可） */
  _stepIcons?: React.ReactNode[];
  /** 各ステップのアイコン色（省略可） */
  _stepIconColors?: string[];
  /** ラッパーdivのstyle（省略可） */
  _wrapperStyle?: React.CSSProperties;
  /** ラッパーdivのclassName（省略可） */
  _wrapperClassName?: string;
  /** 各ステップのツールチップ（省略可） */
  _stepTooltips?: string[];
  /** 各ステップの非表示制御（trueで非表示。省略可） */
  _stepHidden?: boolean[];
  /** 各ステップの非表示理由（省略可） */
  _stepHiddenReasons?: string[];
  /** 各ステップごとのonClick（省略可） */
  _onStepClickEach?: ((stepIndex: number) => void)[];
  /** StepLabelPropsを透過（省略可） */
  _stepLabelProps?: MuiStepLabelProps[];
  /** StepPropsを透過（省略可） */
  _stepProps?: MuiStepProps[];
  /** StepContentPropsを透過（省略可） */
  _stepContentProps?: MuiStepContentProps[];
  /** StepperPropsを透過（省略可） */
  _stepperProps?: Partial<MuiStepperProps>;
  /** 各ステップのaria-label（省略可） */
  _stepAriaLabels?: string[];
  /** 各ステップのdisableRipple（省略可） */
  _stepDisableRipple?: boolean[];
};

/**
 * カスタムステッパーコンポーネント
 * @param props StepperProps
 * @returns JSX.Element
 */
const KfStepper: React.FC<StepperProps> = ({
  _steps,
  _activeStep,
  _stepContents,
  _vertical = false,
  _color = 'primary', // 未使用
  _linear = true,     // 未使用
  _onStepClick,
  _stepSubLabels,
  _stepDisabled,
  _stepCompleted,
  _stepIcons,
  _stepIconColors,
  _wrapperStyle,
  _wrapperClassName,
  _stepTooltips,
  _stepHidden,
  _stepHiddenReasons,
  _onStepClickEach,
  _stepLabelProps,
  _stepProps,
  _stepContentProps,
  _stepperProps,
  _stepAriaLabels,
  _stepDisableRipple,
}) => {
  // 垂直表示かどうかを判定
  const isVertical =
    _vertical && _stepContents && _stepContents.length === _steps.length;

  // JSXを返却
  return (
    // ラッパーdiv
    <div style={_wrapperStyle} className={_wrapperClassName}>
      {/* ステッパー本体 */}
      <Stepper
        activeStep={_activeStep}
        orientation={isVertical ? 'vertical' : 'horizontal'}
        {..._stepperProps}
      >
        {/* ステップごとにループ */}
        {_steps.map((label, index) => {
          // 非表示の場合はnullを返す
          if (_stepHidden && _stepHidden[index]) {
            // 非表示理由があればコメントとして残す
            return null;
          }
          // ステップクリック時のハンドラ
          const handleClick =
            (_onStepClickEach && _onStepClickEach[index])
              ? () => _onStepClickEach[index](index)
              : _onStepClick
                ? () => _onStepClick(index)
                : undefined;
          // アイコン色の適用
          let iconNode =
            _stepIcons && _stepIcons[index] ? _stepIcons[index] : undefined;
          if (iconNode && _stepIconColors && _stepIconColors[index]) {
            iconNode = React.cloneElement(
              iconNode as React.ReactElement<any, any>,
              { style: { color: _stepIconColors[index] } }
            );
          }
          // ラベルノード
          const labelNode = (
            <StepLabel
              onClick={handleClick}
              optional={
                _stepSubLabels && _stepSubLabels[index]
                  ? <span>{_stepSubLabels[index]}</span>
                  : undefined
              }
              icon={iconNode}
              style={handleClick ? { cursor: 'pointer' } : undefined}
              aria-label={
                _stepAriaLabels && _stepAriaLabels[index]
                  ? _stepAriaLabels[index]
                  : undefined
              }
              {...(_stepLabelProps && _stepLabelProps[index])}
            >
              {label}
            </StepLabel>
          );
          // ステップ要素を返す
          return (
            <Step
              key={label}
              disabled={_stepDisabled ? _stepDisabled[index] : false}
              completed={_stepCompleted ? _stepCompleted[index] : undefined}
              {...(_stepProps && _stepProps[index])}
            >
              {_stepTooltips && _stepTooltips[index]
                ? <Tooltip title={_stepTooltips[index]}>{labelNode}</Tooltip>
                : labelNode}
              {isVertical && _stepContents && (
                <StepContent
                  {...(_stepContentProps && _stepContentProps[index])}
                >
                  {_stepContents[index]}
                </StepContent>
              )}
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default KfStepper;

/**
 * 使用例:
 * 
 * import KfStepper from './Stepper';
 * import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 * 
 * function Example() {
 *   // ステップラベル
 *   const steps = ['入力', '確認', '完了'];
 *   // ステップごとの内容
 *   const contents = [
 *     <div>入力フォーム</div>,
 *     <div>確認画面</div>,
 *     <div>完了メッセージ</div>
 *   ];
 *   // サブラベル
 *   const subLabels = ['Step1', 'Step2', 'Step3'];
 *   // 各ステップのdisabled状態
 *   const disabled = [false, false, false];
 *   // 各ステップの完了状態
 *   const completed = [true, false, false];
 *   // カスタムアイコン
 *   const icons = [<CheckCircleIcon color="success" />, null, null];
 *   // カスタムアイコン色
 *   const iconColors = ['green', '', ''];
 *   // 各ステップのツールチップ
 *   const tooltips = ['入力してください', '内容を確認', '完了です'];
 *   // 各ステップの非表示制御
 *   const hidden = [false, false, false];
 *   // 各ステップの非表示理由
 *   const hiddenReasons = ['', '', ''];
 *   // 各ステップごとのonClick
 *   const onStepClickEach = [
 *     (i: number) => alert(`Step${i + 1} clicked`),
 *     undefined,
 *     undefined
 *   ];
 *   // aria-label
 *   const ariaLabels = ['入力ステップ', '確認ステップ', '完了ステップ'];
 *   // disableRipple
 *   const disableRipple = [false, false, false];
 *   // アクティブステップ
 *   const [activeStep, setActiveStep] = React.useState(0);
 * 
 *   return (
 *     <KfStepper
 *       _steps={steps}
 *       _activeStep={activeStep}
 *       _stepContents={contents}
 *       _vertical={true}
 *       _stepSubLabels={subLabels}
 *       _onStepClick={setActiveStep}
 *       _stepDisabled={disabled}
 *       _stepCompleted={completed}
 *       _stepIcons={icons}
 *       _stepIconColors={iconColors}
 *       _stepTooltips={tooltips}
 *       _stepHidden={hidden}
 *       _stepHiddenReasons={hiddenReasons}
 *       _onStepClickEach={onStepClickEach}
 *       _stepAriaLabels={ariaLabels}
 *       _stepDisableRipple={disableRipple}
 *       _wrapperStyle={{ margin: 20 }}
 *       _linear={false}
 *     />
 *   );
 * }
 */
