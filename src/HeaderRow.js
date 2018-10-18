// @flow

import type {HeaderEventHandler} from './Table';

type Props = {|
  additionalAttributes: any,
  columns: Array<React$Element<Column>>,
  style: Object,
|};

export default function HeaderRow(props: Props) {
  // TODO Custom merge additionalAttributes.className and additionalAttributes.style

  return 'Header';
}