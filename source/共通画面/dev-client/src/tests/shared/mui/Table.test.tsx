import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KfTable, { _TableProps } from '../../../shared/mui/Table';

describe('KfTable', () => {
  const columns = ['名前', '年齢', '住所'];
  const rows = [
    { id: 1, 名前: '田中', 年齢: 20, 住所: '東京' },
    { id: 2, 名前: '佐藤', 年齢: 25, 住所: '大阪' },
  ];

  it('renders table headers and rows', () => {
    render(<KfTable _columns={columns} _rows={rows} />);
    columns.forEach(col => {
      expect(screen.getByText(col)).toBeInTheDocument();
    });
    rows.forEach(row => {
      expect(screen.getByText(row['名前'] as string)).toBeInTheDocument();
      expect(screen.getByText(row['年齢'].toString())).toBeInTheDocument();
      expect(screen.getByText(row['住所'] as string)).toBeInTheDocument();
    });
  });

  it('renders empty content when no rows', () => {
    render(<KfTable _columns={columns} _rows={[]} _emptyContent={<span>データなし</span>} />);
    expect(screen.getByText('データなし')).toBeInTheDocument();
  });

  it('calls _onRowClick when a row is clicked', () => {
    const handleClick = jest.fn();
    render(<KfTable _columns={columns} _rows={rows} _onRowClick={handleClick} />);
    fireEvent.click(screen.getByText('田中').closest('tr')!);
    expect(handleClick).toHaveBeenCalledWith(rows[0], 0);
  });

  it('applies _selectedRowIndex', () => {
    render(<KfTable _columns={columns} _rows={rows} _selectedRowIndex={1} />);
    const trs = screen.getAllByRole('row');
    // 1つ目はヘッダー行なので2つ目以降
    expect(trs[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('renders footer rows', () => {
    const footerRows = [{ 名前: '合計', 年齢: 45, 住所: '' }];
    render(<KfTable _columns={columns} _rows={rows} _footerRows={footerRows} />);
    expect(screen.getByText('合計')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('disables row when _rowDisabled returns true', () => {
    render(
      <KfTable
        _columns={columns}
        _rows={rows}
        _rowDisabled={(row) => row['名前'] === '佐藤'}
        _onRowClick={jest.fn()}
      />
    );
    const trs = screen.getAllByRole('row');
    // 1つ目はヘッダー、2つ目が田中、3つ目が佐藤
    expect(trs[2]).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with custom cell renderer', () => {
    render(
      <KfTable
        _columns={columns}
        _rows={rows}
        _cellRenderer={(value, row, rowIndex, column) =>
          column === '年齢' ? <b>{value}歳</b> : value
        }
      />
    );
    expect(screen.getByText('20歳')).toBeInTheDocument();
    expect(screen.getByText('25歳')).toBeInTheDocument();
  });

  it('renders with custom header cell renderer', () => {
    render(
      <KfTable
        _columns={columns}
        _rows={rows}
        _headerCellRenderer={(col) => <span data-testid="header">{col}</span>}
      />
    );
    expect(screen.getAllByTestId('header').length).toBe(columns.length);
  });
});
