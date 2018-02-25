import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import I18n from 'redux-i18n';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from 'redux/configureStore';
import App from 'components/App';
import {translations} from 'translations';

ReactDOM.render(
  <Provider store={store}>
    <I18n translations={translations} initialLang="kr" fallbackLang="kr">
      <ConnectedRouter history={history}>
        {/*I18n을 위한 translations 파일은 미리 정의 해놓았음 */}
        <App />
      </ConnectedRouter>
    </I18n>
  </Provider>,
  document.getElementById('root')
);
