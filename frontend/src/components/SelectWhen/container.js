import React, {Component} from 'react';
import SelectWhen from './presenter';
import moment from 'moment';
import {scroller} from 'react-scroll';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._onChangeDateHandler = this._onChangeDateHandler.bind(this);
    this._onChangeTimeHandler = this._onChangeTimeHandler.bind(this);
  }

  componentDidMount() {
    // scrollSpy.update();

    this._scrollTo();
    const start_date = moment(new Date()).format('YYYY-MM-DD');
    const start_time = moment(new Date()).format('HH:mm:ss');

    this.props.setSelDateStart(start_date);
    this.props.setSelTimeStart(start_time);
  }

  componentWillReceiveProps(nextProps) {
    let end_datetime;
    if (nextProps.cost_type) {
      const start_datetime = this.props.start_date.concat(
        ' ',
        this.props.start_time
      );
      end_datetime = moment(start_datetime)
        .add(Number(nextProps.cost_type.days) * 24, 'hour')
        .format('YYYY-MM-DD HH:mm:ss');

      this.props.setSelEndDateTime(end_datetime);
    }
  }

  // componentWillUnmount() {
  //   Events.scrollEvent.remove('begin');
  //   Events.scrollEvent.remove('end');
  // }

  _scrollTo = () => {
    scroller.scrollTo('select_when', {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  render() {
    return (
      <SelectWhen
        onChangeDateHandler={this._onChangeDateHandler}
        onChangeTimeHandler={this._onChangeTimeHandler}
        // scrollTo={this._scrollTo}
      />
    );
  }

  _onChangeDateHandler(m) {
    const datetime = m._d;
    const start_date = moment(datetime).format('YYYY-MM-DD');
    this.props.setSelDateStart(start_date);
  }
  _onChangeTimeHandler(m) {
    const datetime = m._d;
    const start_time = moment(datetime).format('HH:mm:ss');
    this.props.setSelTimeStart(start_time);
  }
}

export default Container;
