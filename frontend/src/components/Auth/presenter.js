import React from 'react';
import styles from './styles.scss';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';
import PropTypes from 'prop-types';

const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.column}>
      <img
        src={require('images/phone.png')}
        alt={context.t('앱을 다운받아보세요!')}
      />
    </div>
    <div className={styles.column}>
      <div className={`${styles.whiteBox} ${styles.formBox}`}>
        <div className={styles.logoBox}>
          <img
            src={require('images/logo_bluedotlounge.png')}
            alt={context.t('로고')}
          />
          <div className={styles.logoText}>
            <div className={styles.logoTitle}>{context.t('블루닷라운지')}</div>
            <div className={styles.logoSubtitle}>
              {context.t('BLUEDOT LOUNGE')}
            </div>
          </div>
        </div>
        {props.action === 'login' && <LoginForm />}
        {props.action === 'signup' && <SignupForm />}
      </div>

      <div className={styles.whiteBox}>
        {props.action === 'login' && (
          <p className={styles.text}>
            {context.t('계정이 없으신가요?  ')}
            <span className={styles.changeLink} onClick={props.changeAction}>
              {context.t('가입하기')}
            </span>
          </p>
        )}
        {props.action === 'signup' && (
          <p className={styles.text}>
            {context.t('계정이 있으신가요? ')}
            <span className={styles.changeLink} onClick={props.changeAction}>
              {context.t('로그인')}
            </span>
          </p>
        )}
      </div>
      <div className={styles.appBox}>
        <span>{context.t('앱을 다운로드하세요')}</span>
        <div className={styles.appstores}>
          <img
            src={require('images/ios.png')}
            alt={context.t('앱스토어에서 다운 받으세요')}
          />
          <img
            src={require('images/android.png')}
            alt={context.t('구글 플레이 스토어에서 다운 받으세요')}
          />
        </div>
      </div>
    </div>
  </main>
);

Auth.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Auth;
