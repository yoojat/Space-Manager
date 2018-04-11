import React, {Component} from 'react';
import SelectWhen from './presenter';
import moment from 'moment';

class Container extends Component {
  state = {};

  _onChange(event) {
    const datetime = event._d;
    console.log(moment(datetime).format('YYYY-MM-DD HH:mm:ss'));
  }

  render() {
    return <SelectWhen onChange={this._onChange} />;
  }
}

export default Container;
