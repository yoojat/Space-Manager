import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import moment from 'moment';
import InputMoment from 'input-moment';

class SelectWhen extends Component {
  state = {
    m: moment(),
  };

  handleChange = m => {
    this.setState({m});
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };

  render() {
    return (
      <div className="app">
        <form>
          <div className="input">
            <input type="text" value={this.state.m.format('llll')} readOnly />
          </div>
          <InputMoment
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
          />
        </form>
      </div>
    );
  }
}
SelectWhen.propTypes = {};

export default SelectWhen;
