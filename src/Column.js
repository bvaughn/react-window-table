// @flow

import ColumnHeaderRenderer from './ColumnHeaderRenderer';
import ColumnRenderer from './ColumnRenderer';

import type {ColumnHeaderRendererProps} from './ColumnHeaderRenderer';
import type {ColumnRendererProps} from './ColumnRenderer';

type DataGetter = ({ columnData: any, key: string, rowData: any }) => any;

type Prop = {|
  children?: React$Element<ColumnRendererProps>,
  className?: string,
  dataGetter?: DataGetter,
  columnData?: Object,
  dataKey: string,
  defaultSortDirection?: "ASC" | "DESC",
  disableSort?: boolean,
  flexGrow?: number,
  flexShrink?: number,
  headerRenderer: React$Element<ColumnHeaderRendererProps>,
  headerAttributes?: any,
  maxWidth?: number,
  minWidth?: number,
  style?: Object,
  width: number,
|};

export default function Column(props: Prop): null {
  return null;
}

Column.defaultProps = {
  children: ColumnRenderer,
  dataGetter: ({ columnData, key, rowData }) => rowData[key],
  defaultSortDirection: "ASC",
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: ColumnHeaderRenderer,
};