import React, {Component} from 'react';
import SelectCabinet from './presenter';

class Container extends Component {
  state = {
    use_cabinet: false,
  };

  render() {
    return <SelectCabinet />;
  }
}

export default Container;
