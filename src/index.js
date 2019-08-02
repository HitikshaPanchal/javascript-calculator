import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Calculator from './App';

ReactDOM.render(<Calculator />, document.getElementById('root'));

serviceWorker.unregister();
