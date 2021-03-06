import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from 'app';
import 'app/i18n';

// use history mode browser
const history = createBrowserHistory();

// render react DOM
ReactDOM.render(<App history={history} />, document.getElementById('root'));
