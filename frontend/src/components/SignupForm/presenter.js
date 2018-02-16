import React from 'react';
import formStyles from 'shared/formStyles.scss';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>
      {context.t('친구들의 사진과 동영상을 보고 싶다면 가입하세요!')}
    </h3>
    <FacebookLogin
      appId="146333736050975"
      autoLoad={true}
      fields="name,email,picture"
      callback={props.handleFacebookLogin}
      cssClass={formStyles.facebookSignupLogin}
      icon="fa fa-facebook-official"
      textButton={context.t('Facebook으로 로그인')}
    />
    <span className={formStyles.divider}>or</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="email"
        placeholder={context.t('이메일')}
        className={formStyles.textInput}
        value={props.emailValue}
        onChange={props.handleInputChange}
        name="email"
      />
      <input
        type="text"
        placeholder={context.t('이름')}
        className={formStyles.textInput}
        value={props.nameValue}
        onChange={props.handleInputChange}
        name="name"
      />
      <input
        type="username"
        placeholder={context.t('아이디')}
        className={formStyles.textInput}
        value={props.usernameValue}
        onChange={props.handleInputChange}
        name="username"
      />
      <input
        type="password"
        placeholder={context.t('비밀번호')}
        className={formStyles.textInput}
        value={props.password1Value}
        onChange={props.handleInputChange}
        name="password1"
      />
      <input
        type="password"
        placeholder={context.t('비밀번호 확인')}
        className={formStyles.textInput}
        value={props.password2Value}
        onChange={props.handleInputChange}
        name="password2"
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

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  password1Value: PropTypes.string.isRequired,
  password2Value: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default SignupForm;
