import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignupForm from './presenter';

class Container extends Component {
  state = {
    name: '',
    email: '',
    username: '',
    password1: '',
    password2: '',
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
  };
  render() {
    const {name, email, username, password1, password2} = this.state;
    return (
      <SignupForm
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
        nameValue={name}
        emailValue={email}
        usernameValue={username}
        password1Value={password1}
        password2Value={password2}
      />
    );
  }

  _handleInputChange = event => {
    const {target: {value, name}} = event;
    this.setState({
      [name]: value,
    });
  };

  _handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  _handleFacebookLogin = response => {
    const {facebookLogin} = this.props;
    facebookLogin(response.accessToken);
  };
}
export default Container;
