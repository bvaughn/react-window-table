// @flow

export type ColumnRendererProps = {|
  cellData: any,
  columnData?: Object,
  columnIndex: number,
  columnKey: string,
  isScrolling: boolean,
  rowData: any,
  rowIndex: number
|};

export default function DefaultHeaderRenderer({ cellData }: ColumnRendererProps) {
  return cellData;
}