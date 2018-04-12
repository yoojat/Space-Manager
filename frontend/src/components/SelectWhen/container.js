import React, {Component} from 'react';
import SelectWhen from './presenter';
import moment from 'moment';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._onChangeHandler = this._onChangeHandler.bind(this);
  }

  render() {
    return <SelectWhen onChangeHandler={this._onChangeHandler} />;
  }

  _onChangeHandler(m) {
    const datetime = m._d;
    const start_date = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    this.props.setSelWhenStart(start_date);
  }
}

export default Container;
