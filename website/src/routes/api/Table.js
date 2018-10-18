import React, { Fragment } from 'react';
import { NavLink as Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import ComponentApi from '../../components/ComponentApi';

import styles from './shared.module.css';

export default () => (
  <ComponentApi methods={METHODS} name="Table" props={PROPS} />
);

const PROPS = [
  {
    description: (
      <Fragment>
        <p>
          TODO
        </p>
      </Fragment>
    ),
    isRequired: true,
    name: 'children',
    type: 'component',
  },
];

const METHODS = [];