import React, {Component} from 'react';
import SelectCabinetEach from './presenter';
import {animateScroll as scroll} from 'react-scroll';

class Container extends Component {
  state = {
    loading: true,
    sel_cabinet_set: null,
    sel_cabinets: [],
  };

  _scrollTo = () => {
    // scroller.scrollTo('show_cabinet', {
    //   duration: 1500,
    //   delay: 100,
    //   smooth: true,
    //   offset: 50,
    // });
    scroll.scrollToBottom({
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };
  _valueCheck = (cabinets, cabinet) => {
    for (let i = 0, len = cabinets.length; i < len; i++) {
      if (cabinets[i].id === cabinet.id) {
        return true;
      }
    }
    return false;
  };
  _onCabinetClick = cabinet => {
    // console.log(this.props);
    //현재 해당 캐비넷 아이디가 들어가 있지 않으면
    if (!this._valueCheck(this.props.sel_cabinets, cabinet)) {
      this.props.setSelCabinet(cabinet);

      if (!this.props.all_info_setup) {
        this.props.setAllInfoSetup();
      }
      this.setState({
        ...this.state,
        sel_cabinets: [...this.state.sel_cabinets, cabinet],
      });
      //현재 해당 캐비넷에 아이디가 들어가 있으면
    } else {
      this.props.unsetSelCabinet(cabinet);
      const new_sel_cabinets = [this.state.sel_cabinets];
      const index = new_sel_cabinets.indexOf(cabinet);
      new_sel_cabinets.splice(index, 1);
      this.setState({
        ...this.state,
        sel_cabinets: new_sel_cabinets,
      });
    }
    // alert(cabinet_id);
  };

  componentDidMount() {
    const {sel_cabinet_set} = this.props;

    if (sel_cabinet_set) {
      this.setState({loading: false, sel_cabinet_set});
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   loading: true,
    // });
  }

  componentDidUpdate() {
    // this._scrollTo();

    //기존 스테이트에 있는 상태
    if (this.state.sel_cabinet_set) {
      //새로 프롭스를 받고 그 프롭스가 현재 스테이트와 다르다면 loading=false, 스테이트를 새 프롭으로 변경
      if (this.state.sel_cabinet_set.id !== this.props.sel_cabinet_set.id) {
        if (this.state.loading) {
          this.setState({
            loading: false,
            sel_cabinet_set: this.props.sel_cabinet_set,
          });
        }
      } else {
        //불러온 캐비넷 세트가 같다면
        if (this.state.loading) {
          this.setState({
            ...this.state,
            loading: false,
          });
        }
      }
    } else if (this.props.sel_cabinet_set) {
      //기존스테이트에 없는상태
      if (this.state.loading) {
        this.setState({
          loading: false,
          sel_cabinet_set: this.props.sel_cabinet_set,
        });
      }
    }
  }

  render() {
    const {sel_cabinet_set, sel_cabinets} = this.props;

    return (
      <SelectCabinetEach
        sel_cabinet_set={sel_cabinet_set}
        loading={this.state.loading}
        sel_cabinets={sel_cabinets}
        onCabinetClick={this._onCabinetClick}
      />
    );
  }
}

export default Container;
