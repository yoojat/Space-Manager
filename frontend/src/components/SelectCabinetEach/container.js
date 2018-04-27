import React, {Component} from 'react';
import SelectCabinetEach from './presenter';

class Container extends Component {
  state = {loading: true, sel_cabinet_set: null};

  componentDidMount() {
    const {sel_cabinet_set} = this.props;
    if (sel_cabinet_set) {
      this.setState({loading: false, sel_cabinet_set});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
    });
  }

  componentDidUpdate() {
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
    const {sel_cabinet_set} = this.props;

    return (
      <SelectCabinetEach
        sel_cabinet_set={sel_cabinet_set}
        loading={this.state.loading}
      />
    );
  }
}

export default Container;
