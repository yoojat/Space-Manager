import React, {Component} from 'react';
import SelectCabinet from './presenter';
import {scroller, animateScroll as scroll} from 'react-scroll';

class Container extends Component {
  state = {
    use_cabinet: false,
    is_first: true,
  };

  _cabinetSetClickHandler = sel_cabinet_set_id => {
    this.props.setSelCabinetSetId(sel_cabinet_set_id);
    this.props.getCabinetSet(sel_cabinet_set_id);
  };

  _yesClickHandler = () => {
    this.setState({
      ...this.state,
      use_cabinet: true,
      is_first: false,
    });
    if (this.props.all_info_setup) {
      this._setAllInfoNotSetup();
    }
    scroll.scrollToBottom({
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  _noClickHandler = () => {
    this.setState({
      ...this.state,
      use_cabinet: false,
      is_first: false,
    });
    this._setAllInfoSetup();
    if (!this.props.all_info_setup) {
      this._setAllInfoSetup();
    }
  };

  _scrollTo = () => {
    scroller.scrollTo('select_cabinet', {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  componentDidMount() {
    this._scrollTo();
  }

  _setAllInfoSetup = () => {
    this.props.setAllInfoSetup();
  };

  _setAllInfoNotSetup = () => {
    this.props.setAllInfoNotSetup();
  };

  render() {
    return (
      <SelectCabinet
        {...this.state}
        yesClickHandler={this._yesClickHandler}
        noClickHandler={this._noClickHandler}
        sel_branch={this.props.sel_branch}
        cabinetSetClickHandler={this._cabinetSetClickHandler}
        sel_cabinet_set_id={this.props.sel_cabinet_set_id}
        sel_cabinet_set={this.props.sel_cabinet_set}
        cabinets_loading={this.state.cabinets_loading}
      />
    );
  }
}

export default Container;
