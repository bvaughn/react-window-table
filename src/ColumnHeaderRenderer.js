// @flow

export type ColumnHeaderRendererProps = {|
  additionalAttributes: any,
  columnData?: Object,
  columnKey: string,
  disableSort: boolean,
  label: React$Node,
  sortBy: string,
  sortDirection: 'ASC' | 'DESC'
|};

export default function DefaultHeaderRenderer({ label }: ColumnHeaderRendererProps) {
  return label; // TODO sort indicators and disabled status.
}