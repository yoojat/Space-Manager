import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SimpleProfile from "components/SimpleProfile";
import breakpoint from "styled-components-breakpoint";
import MembershipInfo from "components/MembershipInfo";
import MembershipLogInfo from "components/MembershipLogInfo";
import CabinetInfo from "components/CabinetInfo";
import CabinetLogInfo from "components/CabinetLogInfo";
import Loading from "components/Loading";
import RegistWindow from "components/RegistWindow";
import SuperMembership from "components/SuperMembership";

const MemberDetail = (props, context) => {
  const {
    loading,
    detail_view_loading,
    now_view_user_memberships,
    now_view_user_membership_logs,
    now_view_member_cabinets,
    cabinet_historys,
    seeing_regist_window
  } = props;

  return loading ? (
    <Loading />
  ) : detail_view_loading ? (
    <Loading />
  ) : (
    <Fragment>
      <BackGround>
        <BackGroundImage />
        <ContentContainer>
          <LeftSection>
            <SimpleProfile />
          </LeftSection>
          <RightSection>
            <MembershipInfoContainer>
              <div style={{ marginBottom: "10px" }}>[ 멤버쉽 정보 ]</div>
              <MembershipInfoContent>
                <LeftMembershipInfo>
                  <MembershipInfo
                    now_view_user_memberships={now_view_user_memberships}
                  />
                </LeftMembershipInfo>
                <RightMembershipInfo>
                  <MembershipLogInfo
                    now_view_user_membership_logs={
                      now_view_user_membership_logs
                    }
                  />
                </RightMembershipInfo>
              </MembershipInfoContent>
              <div style={{ marginBottom: "10px" }}>[ 사물함 정보 ]</div>
              <MembershipInfoContent>
                <LeftMembershipInfo>
                  <CabinetInfo
                    now_view_member_cabinets={now_view_member_cabinets}
                  />
                </LeftMembershipInfo>
                <RightMembershipInfo>
                  <CabinetLogInfo cabinet_historys={cabinet_historys} />
                </RightMembershipInfo>
              </MembershipInfoContent>
            </MembershipInfoContainer>
          </RightSection>
        </ContentContainer>
      </BackGround>
      {seeing_regist_window ? (
        <RegistWindow content={<SuperMembership />} />
      ) : (
        ""
      )}
    </Fragment>
  );
};

MemberDetail.propTypes = {};

MemberDetail.contextTypes = {
  t: PropTypes.func.isRequired
};

export default MemberDetail;

const background_image = require("images/royal_back.jpg");

const ContentContainer = styled.div`
  margin-top: 60px;
  margin-left: 30px;
  display: flex;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  flex-wrap: wrap;
  color: #a1a1a1;
`;

const BackGround = styled.div`
  margin-top: 30px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  position: relative;
`;
const BackGroundImage = styled.div`
  background-image: url(${background_image});
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: 0px -155px;
  position: absolute;
  z-index: -1;
`;

const LeftSection = styled.div`
  max-width: 320px;
`;
const RightSection = styled.div`
  ${breakpoint("mobile")`
  margin-top: 20px;
  padding-left: 0px;`};

  ${breakpoint("tablet")`
  margin-top: 40px;
  padding-left: 20px;`};

  ${breakpoint("desktop")`
  margin-top: 140px;
  padding-left: 20px;`};
`;

const MembershipInfoContainer = styled.div``;

const LeftMembershipInfo = styled.div`
  min-width: 300px;
  margin: 15px;
`;
const RightMembershipInfo = styled.div`
  min-width: 300px;
  margin: 15px;
`;

const MembershipInfoContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
