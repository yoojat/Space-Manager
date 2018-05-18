import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { history } from "redux/configureStore"; //생성한 store를 불러들임, 히스토리도 불러옴(라우터를 위해))

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-35%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class ReactModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (this.props.autoRedirect) {
      setTimeout(() => {
        this.props.history.push(this.props.linkButtonUrl);
      }, 3000);
    }
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    if (this.props.autoRedirect) {
      this.props.history.push(this.props.linkButtonUrl);
    }
  }

  render() {
    const { title, content, linkButtonUrl, linkButtonContext } = this.props;

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel={title ? title : ""}
        >
          <h2
            ref={subtitle => (this.subtitle = subtitle)}
            style={{ color: "tomato" }}
          >
            {title ? title : "주목해주세요!"}
          </h2>
          <div>{content ? content : ""}</div>
          {linkButtonUrl ? (
            <Link to={linkButtonUrl}>
              <button>{linkButtonContext ? linkButtonContext : "click"}</button>
            </Link>
          ) : (
            ""
          )}
          <Link to="/">
            <button>첫화면으로 돌아가기</button>
          </Link>
        </Modal>
      </div>
    );
  }
}

export default ReactModal;
