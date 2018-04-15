import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import I18n from 'redux-i18n'; //component
import {ConnectedRouter} from 'react-router-redux'; //연결된 라우터를 불러옴
import store, {history} from 'redux/configureStore'; //생성한 store를 불러들임, 히스토리도 불러옴(라우터를 위해))
import App from 'components/App';
import {translations} from 'translations';

// .env파일에 NODE_PATH=src 를 추가함으로써 베이스 폴더를 src로 인식

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

// ConnectedRouter : 라우터의 히스토리 오브젝트가 미들웨어 히스토리 오브젝트와 같아야함
// I18n : I18n을 위한 translations 파일은 미리 정의 해놓았음
// I18n의 prop : 첫번째는 번역파일(translations, translations.js), 두번째는 원래 언어(initialLang), 세번째는 요청했는데 없을경우 (fallbackLang)
// I18n : function t를 context로 전달
