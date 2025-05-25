import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * テーブルのプロパティ型定義
 */
export interface _TableProps {
  /**
   * テーブルの列名配列
   * @example ['名前', '年齢', '住所']
   */
  _columns: string[];
  /**
   * 行データ配列。各オブジェクトのキーは列名と一致させる
   * @example [{ 名前: '田中', 年齢: 20, 住所: '東京' }]
   */
  _rows: Array<{ [key: string]: React.ReactNode }>;
  /**
   * テーブルに枠線を表示するか
   * @default false
   */
  _bordered?: boolean;
  /**
   * テーブルのサイズ
   * 'small' | 'medium'
   * @default 'medium'
   */
  _size?: 'small' | 'medium';
  /**
   * テーブルの最大高さ（px, %, rem等指定可）
   * @example '400px'
   */
  _maxHeight?: string | number;
  /**
   * テーブルの幅（px, %, rem等指定可）
   * @example '100%'
   */
  _width?: string | number;
  /**
   * 行クリック時のコールバック
   * @param rowData クリックされた行のデータ
   * @param rowIndex 行番号
   */
  _onRowClick?: (rowData: { [key: string]: React.ReactNode }, rowIndex: number) => void;
  /**
   * 選択中の行インデックス
   * @example 1
   */
  _selectedRowIndex?: number;
  /**
   * 行選択時のコールバック
   * @param rowData 選択された行のデータ
   * @param rowIndex 行番号
   */
  _onRowSelect?: (rowData: { [key: string]: React.ReactNode }, rowIndex: number) => void;
  /**
   * ヘッダーを固定するか
   * @default false
   */
  _stickyHeader?: boolean;
  /**
   * 空データ時に表示する要素
   * @example <span>データがありません</span>
   */
  _emptyContent?: React.ReactNode;
  /**
   * セルごとのカスタムレンダラー
   * @param value セルの値
   * @param row 行データ
   * @param rowIndex 行番号
   * @param column 列名
   * @returns レンダリングするReactノード
   */
  _cellRenderer?: (
    value: React.ReactNode,
    row: { [key: string]: React.ReactNode },
    rowIndex: number,
    column: string
  ) => React.ReactNode;
  /**
   * 列ごとの幅指定
   * @example { 名前: 120, 年齢: 60, 住所: 200 }
   */
  _columnWidths?: { [column: string]: number | string };
  /**
   * 列ごとのアラインメント
   * @example { 名前: 'left', 年齢: 'right', 住所: 'center' }
   */
  _columnAlign?: { [column: string]: 'left' | 'center' | 'right' };
  /**
   * 行ごとのクラス名付与
   * @param row 行データ
   * @param rowIndex 行番号
   * @returns クラス名
   */
  _rowClassName?: (row: { [key: string]: React.ReactNode }, rowIndex: number) => string;
  /**
   * 行ごとのID指定
   * @param row 行データ
   * @param rowIndex 行番号
   * @returns 行ID
   */
  _rowId?: (row: { [key: string]: React.ReactNode }, rowIndex: number) => string | number;
  /**
   * テーブルのキャプション（タイトル）
   * @example "ユーザー一覧"
   */
  _caption?: string;
  /**
   * ヘッダーセルのカスタムレンダラー
   * @param column 列名
   * @param colIndex 列番号
   * @returns レンダリングするReactノード
   */
  _headerCellRenderer?: (column: string, colIndex: number) => React.ReactNode;
  /**
   * テーブルのaria-label属性
   * @example "ユーザーテーブル"
   */
  _ariaLabel?: string;
  /**
   * テーブル全体のクラス名
   * @example "my-table"
   */
  _className?: string;
  /**
   * ヘッダー行のstyle
   * @example { background: '#eee' }
   */
  _headerRowStyle?: React.CSSProperties;
  /**
   * ボディ行のstyle
   * @param row 行データ
   * @param rowIndex 行番号
   * @returns CSSプロパティ
   */
  _bodyRowStyle?: (row: { [key: string]: React.ReactNode }, rowIndex: number) => React.CSSProperties;
  /**
   * 行をdisabledにするかどうか
   * @param row 行データ
   * @param rowIndex 行番号
   * @returns trueでdisabled
   */
  _rowDisabled?: (row: { [key: string]: React.ReactNode }, rowIndex: number) => boolean;
  /**
   * テーブルのdenseモード
   * @default false
   */
  _dense?: boolean;
  /**
   * フッター行のデータ
   * @example [{ 名前: '合計', 年齢: 45, 住所: '' }]
   */
  _footerRows?: Array<{ [key: string]: React.ReactNode }>;
  /**
   * hover効果を無効化する
   * @default false
   */
  _disableHover?: boolean;
  /**
   * 各セルのstyle指定
   * @param value セル値
   * @param row 行データ
   * @param rowIndex 行番号
   * @param column 列名
   * @returns CSSプロパティ
   */
  _cellStyle?: (
    value: React.ReactNode,
    row: { [key: string]: React.ReactNode },
    rowIndex: number,
    column: string
  ) => React.CSSProperties;
  /**
   * テーブルのpadding
   * 'normal' | 'checkbox' | 'none'
   * @default 'normal'
   */
  _padding?: 'normal' | 'checkbox' | 'none';
  /**
   * TableHead/TableBody/TableFooterへの追加props
   */
  _headProps?: React.HTMLAttributes<HTMLTableSectionElement>;
  _bodyProps?: React.HTMLAttributes<HTMLTableSectionElement>;
  _footerProps?: React.HTMLAttributes<HTMLTableSectionElement>;
  /**
   * テーブルのaria-describedby属性
   */
  _ariaDescribedBy?: string;
  /**
   * テーブルのaria-labelledby属性
   */
  _ariaLabelledBy?: string;
}

/**
 * MUIのテーブルコンポーネント
 * @param props テーブルプロパティ
 * @returns テーブル要素
 */
const KfTable: React.FC<_TableProps> = ({
  _columns,
  _rows,
  _bordered = false,
  _size = 'medium',
  _maxHeight,
  _width,
  _onRowClick,
  _selectedRowIndex,
  _onRowSelect,
  _stickyHeader = false,
  _emptyContent,
  _cellRenderer,
  _columnWidths,
  _columnAlign,
  _rowClassName,
  _rowId,
  _caption,
  _headerCellRenderer,
  _ariaLabel,
  _className,
  _headerRowStyle,
  _bodyRowStyle,
  _rowDisabled,
  _dense = false,
  _footerRows,
  _disableHover = false,
  _cellStyle,
  _padding = 'normal',
  _headProps,
  _bodyProps,
  _footerProps,
  _ariaDescribedBy,
  _ariaLabelledBy,
}) => (
  <TableContainer
    component={Paper}
    style={{
      ...(!!_maxHeight ? { maxHeight: _maxHeight, overflowY: 'auto' } : {}),
      ...(!!_width ? { width: _width } : {}),
    }}
    className={_className}
  >
    <Table
      size={_dense ? 'small' : _size}
      stickyHeader={_stickyHeader}
      aria-label={_ariaLabel}
      aria-describedby={_ariaDescribedBy}
      aria-labelledby={_ariaLabelledBy}
      padding={_padding}
      sx={_bordered ? { border: 1, borderColor: 'grey.300' } : undefined}
    >
      {_caption && <caption>{_caption}</caption>}
      <TableHead {..._headProps}>
        <TableRow style={_headerRowStyle}>
          {_columns.map((col, colIdx) => (
            <TableCell
              key={col}
              align={_columnAlign?.[col] ?? 'left'}
              sx={{
                ...(_bordered ? { border: 1, borderColor: 'grey.300' } : {}),
                ...(_columnWidths && _columnWidths[col]
                  ? { width: _columnWidths[col], maxWidth: _columnWidths[col] }
                  : {}),
              }}
            >
              {_headerCellRenderer
                ? _headerCellRenderer(col, colIdx)
                : col}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody {..._bodyProps}>
        {_rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={_columns.length} align="center">
              {_emptyContent ?? 'データがありません'}
            </TableCell>
          </TableRow>
        )}
        {_rows.map((row, idx) => {
          const isDisabled = _rowDisabled ? _rowDisabled(row, idx) : false;
          const rowKey = _rowId ? _rowId(row, idx) : idx;
          return (
            <TableRow
              key={rowKey}
              hover={!_disableHover && !!_onRowClick}
              onClick={
                isDisabled
                  ? undefined
                  : _onRowClick
                  ? () => _onRowClick(row, idx)
                  : undefined
              }
              selected={_selectedRowIndex === idx}
              aria-selected={_selectedRowIndex === idx}
              className={_rowClassName ? _rowClassName(row, idx) : undefined}
              sx={_bordered ? { border: 1, borderColor: 'grey.300' } : undefined}
              style={{
                ...(!!_onRowClick && !isDisabled ? { cursor: 'pointer' } : {}),
                ...(_bodyRowStyle ? _bodyRowStyle(row, idx) : {}),
                ...(isDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}),
              }}
              tabIndex={isDisabled ? -1 : 0}
              aria-disabled={isDisabled}
              onDoubleClick={
                !isDisabled && _onRowSelect
                  ? () => _onRowSelect(row, idx)
                  : undefined
              }
            >
              {_columns.map((col) => (
                <TableCell
                  key={col}
                  align={_columnAlign?.[col] ?? 'left'}
                  sx={{
                    ...(_bordered ? { border: 1, borderColor: 'grey.300' } : {}),
                    ...(_columnWidths && _columnWidths[col]
                      ? { width: _columnWidths[col], maxWidth: _columnWidths[col] }
                      : {}),
                  }}
                  style={
                    _cellStyle
                      ? _cellStyle(row[col], row, idx, col)
                      : undefined
                  }
                >
                  {_cellRenderer
                    ? _cellRenderer(row[col], row, idx, col)
                    : row[col]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      {_footerRows && _footerRows.length > 0 && (
        <tfoot {..._footerProps}>
          {_footerRows.map((row, idx) => (
            <TableRow key={idx}>
              {_columns.map((col) => (
                <TableCell
                  key={col}
                  align={_columnAlign?.[col] ?? 'left'}
                  sx={{
                    ...(_bordered ? { border: 1, borderColor: 'grey.300' } : {}),
                    ...(_columnWidths && _columnWidths[col]
                      ? { width: _columnWidths[col], maxWidth: _columnWidths[col] }
                      : {}),
                  }}
                >
                  {row[col]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tfoot>
      )}
    </Table>
  </TableContainer>
);

export default KfTable;

/**
 * 使用例
 *
 * ```tsx
 * import KfTable from './Table';
 *
 * const columns = ['名前', '年齢', '住所'];
 * const rows = [
 *   { id: 1, 名前: '田中', 年齢: 20, 住所: '東京' },
 *   { id: 2, 名前: '佐藤', 年齢: 25, 住所: '大阪' },
 * ];
 * const footerRows = [
 *   { 名前: '合計', 年齢: 45, 住所: '' }
 * ];
 *
 * <KfTable
 *   _columns={columns}
 *   _rows={rows}
 *   _footerRows={footerRows}
 *   _bordered={true}
 *   _size="small"
 *   _dense={true}
 *   _maxHeight="300px"
 *   _width="100%"
 *   _stickyHeader={true}
 *   _selectedRowIndex={1}
 *   _emptyContent={<span>データがありません</span>}
 *   _caption="ユーザー一覧"
 *   _ariaLabel="ユーザーテーブル"
 *   _ariaDescribedBy="desc"
 *   _ariaLabelledBy="label"
 *   _className="my-table"
 *   _columnWidths={{ 名前: 120, 年齢: 60, 住所: 200 }}
 *   _columnAlign={{ 名前: 'left', 年齢: 'right', 住所: 'center' }}
 *   _rowClassName={(row, idx) => idx === 1 ? 'selected-row' : ''}
 *   _rowId={(row) => row.id}
 *   _headerRowStyle={{ background: '#f0f0f0' }}
 *   _bodyRowStyle={(row, idx) => idx % 2 === 0 ? { background: '#fafafa' } : {}}
 *   _rowDisabled={(row, idx) => row['名前'] === '佐藤'}
 *   _headerCellRenderer={(col, idx) => <span style={{ color: 'blue' }}>{col}</span>}
 *   _cellRenderer={(value, row, rowIndex, column) =>
 *     column === '年齢' ? <b>{value}歳</b> : value
 *   }
 *   _cellStyle={(value, row, rowIndex, column) =>
 *     column === '年齢' ? { color: 'red' } : {}
 *   }
 *   _onRowClick={(row, idx) => alert(`${row['名前']}がクリックされました`)}
 *   _onRowSelect={(row, idx) => alert(`${row['名前']}が選択されました`)}
 *   _disableHover={false}
 *   _padding="normal"
 *   _headProps={{ 'data-section': 'head' }}
 *   _bodyProps={{ 'data-section': 'body' }}
 *   _footerProps={{ 'data-section': 'footer' }}
 * />
 * ```
 */
