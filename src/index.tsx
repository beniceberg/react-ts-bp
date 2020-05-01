import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { store } from '@store';
import { history } from '@reducers';
import './index.css';

render(<App {...{ store, history }} />, document.getElementById('app'));
