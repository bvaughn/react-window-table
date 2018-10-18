import React, { PureComponent } from 'react';
import { Column, Table } from 'react-window-table';
import CodeBlock from '../../components/CodeBlock';
import ProfiledExample from '../../components/ProfiledExample';

import CODE from '../../code/Table.js';

import styles from './shared.module.css';

const items = new Array(500).fill(true).map((_, index) => ({
  foo: index,
  bar: index.toString()
}));

class Item extends PureComponent {
  render() {
    const { index, style } = this.props;

    return (
      <div
        className={index % 2 ? styles.ListItemOdd : styles.ListItemEven}
        style={style}
      >
        Item {index}
      </div>
    );
  }
}

export default function() {
  return (
    <div className={styles.ExampleWrapper}>
      <h1 className={styles.ExampleHeader}>Basic List</h1>
      <div className={styles.Example}>
        <ProfiledExample
          className={styles.ExampleDemo}
          sandbox="table"
        >
          <Table
            headerHeight={30}
            height={300}
            itemCount={items.length}
            itemGetter={index => items[index]}
            rowHeight={30}
            width="100%"
          >
            <Column />
          </Table>
        </ProfiledExample>
        <div className={styles.ExampleCode}>
          <CodeBlock value={CODE} />
        </div>
      </div>
    </div>
  );
}
