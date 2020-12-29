import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from 'app';
import './i18n';
// prepare history
const history = createBrowserHistory();

// render react DOM
ReactDOM.render(<App history={history} />, document.getElementById('root'));

export const isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
