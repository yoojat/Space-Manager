import React, { Component } from "react";
import CabinetChoice from "./presenter";

class Container extends Component {
  state = { loading: true };

  _onCabinetClick = sel_cabinet => {
    const { setSelCabinet, sel_cabinets, unsetSelCabinet } = this.props;
    //스테이트에 있는 사물함들(sel_cabinets) 중 선태한 사물함이 있는 지 확인
    const searched_cabinet = sel_cabinets.find(
      cabinet => cabinet.id === sel_cabinet.id
    );
    if (!searched_cabinet) {
      //스테이트 있는 사물함들(sel_cabinets) 중 선택한 사물함이 없다면 스테이트에 사물함을 올림
      setSelCabinet(sel_cabinet);
    } else {
      unsetSelCabinet(sel_cabinet);
    }
  };

  componentWillReceiveProps(nextProps) {
    const {
      sel_cabinets,
      setAllInfoSetup,
      setAllInfoNotSetup,
      my_cabinets,
      sel_cabinet_set
    } = nextProps;
    if (sel_cabinets.length) {
      setAllInfoSetup();
    } else {
      setAllInfoNotSetup();
    }
    if (sel_cabinet_set && my_cabinets) {
      if (this.state.loading) {
        this.setState({
          ...this.state,
          loading: false
        });
      }
    }
  }

  componentDidMount() {
    const { sel_cabinet_set, my_cabinets } = this.props;
    if (sel_cabinet_set && my_cabinets) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { sel_cabinet_set, sel_cabinets, my_cabinets } = this.props;
    return (
      <CabinetChoice
        sel_cabinet_set={sel_cabinet_set}
        loading={this.state.loading}
        onCabinetClick={this._onCabinetClick}
        sel_cabinets={sel_cabinets}
        my_cabinets={my_cabinets}
      />
    );
  }
}
export default Container;
