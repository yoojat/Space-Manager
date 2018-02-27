import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from './presenter';

class Container extends Component {
  state = {
    username: '',
    password: '',
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    usernameLogin: PropTypes.func.isRequired,
  };
  render() {
    const {username, password} = this.state;
    return (
      <LoginForm
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
        usernameValue={username}
        passwordValue={password}
      />
    );
  }
  _handleInputChange = event => {
    const {target: {value, name}} = event;
    // const value = event.target.value
    // const name = event.target.name
    this.setState({
      [name]: value,
      // username : value 혹은
      // password : value 를 뜻함
    });
  };

  _handleSubmit = event => {
    const {usernameLogin} = this.props;
    const {username, password} = this.state;
    event.preventDefault(); //폼 전송의 기본적인 기능을 제한함
    usernameLogin(username, password);
    //redux action
  };
  _handleFacebookLogin = response => {
    const {facebookLogin} = this.props; //api action을 받아옴
    facebookLogin(response.accessToken); //facebook login component로 받은 response로 콜백
    // response.accessToken을 활용하여 facebookLogin api acion 을 실행
  };
}
export default Container;
