import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Loading from "components/Loading";
import LoungeSeatAdmin from "components/LoungeSeatAdmin";

const SeatAdmin = (props, context) => {
  const { loading, branches, onBranchRowClick, show_lounge } = props;

  return loading ? (
    <Loading />
  ) : (
    <SeatAdminContainer>
      <SeatAdminContents>
        <ContentItem>
          <SearchBar />
          <SearchButton> 찾기 </SearchButton>
        </ContentItem>
        <ContentItem>
          <BranchFlexLayout is_title={true}>
            <BranchFlexItem>
              <BranchFlexRow number>no</BranchFlexRow>
              <BranchFlexRow branchname>지점명</BranchFlexRow>
              <BranchFlexRow address>주소</BranchFlexRow>
            </BranchFlexItem>
          </BranchFlexLayout>
          <BranchFlexLayout is_contents={true}>
            {branches.map(branch => (
              <BranchRow
                key={branch.id}
                branch={branch}
                onBranchRowClick={onBranchRowClick}
              />
            ))}
          </BranchFlexLayout>
        </ContentItem>

        {show_lounge ? (
          <ContentItem>
            <LoungeSeatAdmin />
          </ContentItem>
        ) : (
          ""
        )}
      </SeatAdminContents>
    </SeatAdminContainer>
  );
};

const BranchRow = (props, context) => {
  const { branch, onBranchRowClick } = props;

  const onClickHandler = () => {
    onBranchRowClick(branch.id);
  };

  return (
    <BranchFlexItem is_content onClick={onClickHandler}>
      <BranchFlexRow number>{branch.branch_num}</BranchFlexRow>
      <BranchFlexRow branchname>{branch.branch_name}</BranchFlexRow>
      <BranchFlexRow address>
        {branch.address} {branch.detail_address}
      </BranchFlexRow>
    </BranchFlexItem>
  );
};

const SeatAdminContainer = styled.div`
  width: 95vw;
  margin-left: auto;
  margin-right: auto;
`;
const SeatAdminContents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SearchBar = styled.input``;

const SearchButton = styled.button``;

const ContentItem = styled.div`
  width: 95%;
  margin-bottom: 15px;
`;

const BranchFlexLayout = styled.div`
  background-color: ${props => (props.is_title ? "#3498db" : "white")};
  ${props => (props.is_contents ? "overflow:scroll; height: 120px;" : "")}
  color: ${props => (props.is_title ? "white" : "")};

  ${breakpoint("mobile")`
  font-size:11px;`}
  ${breakpoint("tablet")`
  font-size: 13px;`}
  ${breakpoint("desktop")`
  font-size:13px;`}


`;

const BranchFlexItem = styled.div`
  display: flex;
  justify-content: center;
  ${props =>
    props.is_content
      ? "&:hover{color :white; background-color:#1abc9c; cursor:pointer;}"
      : ""};
`;

const BranchFlexRow = styled.div`
  padding: 10px 5px;
  flex-basis: ${props =>
    props.number
      ? "50px;"
      : props.branchname
        ? "120px"
        : props.address
          ? "380px"
          : ""};

  text-align: center;
`;

SeatAdmin.propTypes = {};

SeatAdmin.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SeatAdmin;
