import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Nav } from './components/Nav';
import { SubMenu } from './components/SubMenu';

// Routes
import TableExample from './routes/examples/Table';
import TableApi from './routes/api/Table';

import styles from './App.module.css';

export default function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Nav title="react-window-table">
          <SubMenu
            isActiveDark={true}
            items={EXAMPLE_ROUTES}
            title="Examples"
          />
          <SubMenu isActiveDark={false} items={API_ROUTES} title="API" />
        </Nav>
        <main className={styles.Main}>
          <Route
            exact
            path="/"
            render={() => <Redirect to={EXAMPLE_ROUTES[0].path} />}
          />

          {EXAMPLE_ROUTES.map(({ component, path }) => (
            <Route key={path} path={path} component={component} />
          ))}

          {API_ROUTES.map(({ component, path }) => (
            <Route key={path} path={path} component={component} />
          ))}
        </main>
      </div>
    </Router>
  );
}

const EXAMPLE_ROUTES = [
  {
    path: '/examples/table',
    title: 'Table',
    component: TableExample,
  },
];

const API_ROUTES = [
  {
    path: '/api/Table',
    title: 'Table',
    component: TableApi,
  },
];
