import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styled from "styled-components";

const LoungeSeatAdmin = (props, context) => {
  const { sel_branch_for_seat_man, loading } = props;
  return loading ? (
    <Loading />
  ) : (
    <div>
      <LoungeContainer>
        <TitleHeader>
          선택하신 지점은 {sel_branch_for_seat_man.branch_name} 입니다
        </TitleHeader>
        <ContentContainer>
          <Content>
            <LoungeImg
              src={sel_branch_for_seat_man.lounge_img}
              alt={sel_branch_for_seat_man.branch_name}
            />
            {sel_branch_for_seat_man.rooms.map(room => {
              return (
                <ClickableArea
                  id={room.id}
                  width={room.width}
                  height={room.height}
                  left={room.left}
                  top={room.top}
                />
              );
            })}
          </Content>
        </ContentContainer>
      </LoungeContainer>
    </div>
  );
};

const LoungeContainer = styled.div`
  background-color: white;
  border: 1.4px solid #e4e4e4;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`;
const TitleHeader = styled.div`
  text-align: center;
  font-size: 13px;
  margin-top: 22px;
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
`;
const Content = styled.div`
  max-width: 300px;
  position: relative;
  width: 90vw;
`;
const LoungeImg = styled.img`
  width: 100%;
`;

const RoomArea = styled.div`
  position: absolute;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

const ClickableArea = (props, context) => {
  const { id } = props;
  const width = `${props.width}%`;
  const height = `${props.height}%`;
  const left = `${props.left}%`;
  const top = `${props.top}%`;
  const onAreaClick = () => {
    console.log(id);
  };

  return (
    <RoomArea style={{ width, height, left, top }} onClick={onAreaClick} />
  );
};

LoungeSeatAdmin.propTypes = {};

LoungeSeatAdmin.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoungeSeatAdmin;
