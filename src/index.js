import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Iwt from './iwt.js';
import Home from './components/Home.js';

import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import { BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(
        <App/>
,
    document.getElementById('root')
); 