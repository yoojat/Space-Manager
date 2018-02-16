import React from 'react';
import Ionicon from 'react-ionicons';
import formStyles from 'shared/formStyles.scss';
import PropTypes from 'prop-types';

const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>
      {context.t('친구들의 사진과 동영상을 보고 싶다면 가입하세요!')}
    </h3>
    <button className={formStyles.button}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />{' '}
      {context.t('페이스북으로 로그인')}
    </button>
    <span className={formStyles.divider}>or</span>
    <form className={formStyles.form}>
      <input
        type="email"
        placeholder={context.t('이메일')}
        className={formStyles.textInput}
      />
      <input
        type="text"
        placeholder={context.t('이름')}
        className={formStyles.textInput}
      />
      <input
        type="username"
        placeholder={context.t('아이디')}
        className={formStyles.textInput}
      />
      <input
        type="password"
        placeholder={context.t('비밀번호')}
        className={formStyles.textInput}
      />
      <input
        type="submit"
        value={context.t('가입하기')}
        className={formStyles.button}
      />
    </form>
    <p className={formStyles.terms}>
      {context.t('가입함으로써')}{' '}
      <span> {context.t('약관 및 개인정보정책')}</span>.
      {context.t('에 동의하게 됩니다')}{' '}
    </p>
  </div>
);

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default SignupForm;
