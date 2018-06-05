import React, { Component } from "react";
import ReactDOM from "react-dom";
import store from "redux/configureStore"; //생성한 store를 불러들임, 히스토리도 불러옴(라우터를 위해))
import { Provider } from "react-redux";
import styles from "./styles.scss";

class UdemyModal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement("div");
    this.modalTarget.className = styles.modal;
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    ReactDOM.render(
      <Provider store={store}>
        <div>{this.props.children}</div>
      </Provider>,
      this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}
export default UdemyModal;
