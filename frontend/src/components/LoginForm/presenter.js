import React from 'react';
import Ionicon from 'react-ionicons';
import formStyles from 'shared/formStyles.scss';
import PropTypes from 'prop-types';

const LoginForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form}>
      <input
        type="text"
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
        value={context.t('로그인')}
        className={formStyles.button}
      />
    </form>
    <span className={formStyles.divider}>{context.t('또는')}</span>
    <span className={formStyles.facebookLink}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />
      {context.t('페이스북으로')}
      {context.t('로그인')}
    </span>
    <span className={formStyles.forgotLink}>
      {context.t('Forgot password?')}
    </span>
  </div>
);

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default LoginForm;
