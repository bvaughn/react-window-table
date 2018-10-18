// @flow

import type {ColumnRendererProps} from './ColumnRenderer';
import type {RowEventHandler} from './Table';

type Props = {|
  children: Array<React$Element<ColumnRendererProps>>,
  className: string,
  index: number,
  isScrolling: boolean,
  rowData: any,
  rowEvents?: { [eventName: string]: RowEventHandler },
  style: Object,
|};

export default function Row(props: Props) {
  return 'Row';
}