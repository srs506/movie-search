import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/milligram/dist/milligram.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
