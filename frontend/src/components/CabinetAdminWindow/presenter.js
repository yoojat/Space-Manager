import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import Loading from "components/Loading";
import styled from "styled-components";

const CabinetAdminWindow = (props, context) => {
  const { loading, title, closeWindow, content } = props;
  return (
    <Container>
      <Overlay>
        <Box>
          <Header>
            <HeaderName>{title}</HeaderName>
            <CloseButton onClick={closeWindow}>
              <Ionicon icon="md-close" fontSize="20px" color="black" />
            </CloseButton>
          </Header>
          <Content id="cabinet_admin_window">
            {loading ? <Loading /> : content}
          </Content>
        </Box>
      </Overlay>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div``;

const Box = styled.div`
  border: 1px solid #e6e6e6;
  background-color: white;
  width: 90vw;
  max-width: $max-card-width;
`;

const Header = styled.div`
  display: flex;
  padding: 14px 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #efefef;
`;

const HeaderName = styled.h4`
  margin-left: 15px;
`;

const CloseButton = styled.span`
  cursor: pointer;
  margin-right: 15px;
`;

const Content = styled.div`
  min-height: 200px;
  overflow: scroll;
  scroll-behavior: smooth;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;
CabinetAdminWindow.propTypes = {};

CabinetAdminWindow.contextTypes = {
  t: PropTypes.func.isRequired
};

export default CabinetAdminWindow;
