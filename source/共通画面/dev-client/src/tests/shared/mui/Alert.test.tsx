import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KfAlert from '../../../shared/mui/Alert';
import '@testing-library/jest-dom';

describe('KfAlert', () => {
  it('renders with default props', () => {
    render(<KfAlert />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledInfo');
  });

  it('renders with _severity', () => {
    render(<KfAlert _severity="success" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledSuccess');
  });

  it('renders with _title', () => {
    render(<KfAlert _title="タイトル" />);
    expect(screen.getByText('タイトル')).toBeInTheDocument();
  });

  it('renders with _children', () => {
    render(<KfAlert _children="本文" />);
    expect(screen.getByText('本文')).toBeInTheDocument();
  });

  it('renders with _elevation', () => {
    render(<KfAlert _elevation={10} />);
    // elevationはstyleやclassで反映されるため、class名で確認
    expect(screen.getByRole('alert').className).toMatch(/MuiPaper-elevation10/);
  });

  it('renders with _variant', () => {
    render(<KfAlert _variant="outlined" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-outlinedInfo');
  });

  it('calls _onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    // actionで閉じるボタンを明示的に追加
    render(
      <KfAlert
        _onClose={handleClose}
        action={
          <button aria-label="Close" onClick={handleClose}>
            ×
          </button>
        }
      />
    );
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies _sx prop', () => {
    render(<KfAlert _sx={{ color: 'red' }} />);
    expect(screen.getByRole('alert')).toHaveStyle('color: red');
  });

  it('shows error message when child throws (ErrorBoundary)', () => {
    const ErrorChild = () => {
      throw new Error('Test error');
    };
    // console.errorを一時的にモックして抑制
    const originalError = console.error;
    console.error = jest.fn();
    render(
      <KfAlert _children={<ErrorChild />} />
    );
    expect(
      screen.queryByText('アラートの表示中にエラーが発生しました。')
    ).toBeInTheDocument();
    console.error = originalError;
  });
});