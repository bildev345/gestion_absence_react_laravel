import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App /> 
    </HistoryRouter>
  </Provider>
)
