import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SearchBar from './SearchBar';
import ClickableList from './ClickableList';
import CheckboxList from './CheckboxList';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
import GifDetail from './GifDetail';
import Container from './Container';

import './bootstrap-3.3.7-dist/bootstrap-3.3.7-dist/css/bootstrap.min.css';


ReactDOM.render(<Container />, document.getElementById('root'));
registerServiceWorker();
