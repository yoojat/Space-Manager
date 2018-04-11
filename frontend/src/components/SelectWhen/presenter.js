import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import {DatetimePicker} from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import moment from 'moment';

class SelectWhen extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment(),
    };
  }

  handleChange = moment => {
    this.setState({
      moment,
    });
  };

  render() {
    return (
      <DatetimePicker moment={this.state.moment} onChange={this.handleChange} />
    );
  }
}
SelectWhen.propTypes = {};

export default SelectWhen;
