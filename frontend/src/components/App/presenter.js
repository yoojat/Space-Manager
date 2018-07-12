import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { history } from "redux/configureStore"; //생성한 store를 불러들임, 히스토리도 불러옴(라우터를 위해))
import "./styles.scss";
import Footer from "components/Footer";
import Auth from "components/Auth";
import Navigation from "components/Navigation";
import LoungeFeed from "components/LoungeFeed";
import MyInfo from "components/MyInfo";
import Main from "components/Main";
import EnrollMembership from "components/EnrollMembership";
import ExtendMembership from "components/ExtendMembership";
import RegistCabinet from "components/RegistCabinet";
import EnrollCabinetOnly from "components/EnrollCabinetOnly";
import EnrollExtendChoice from "components/EnrollExtendChoice";

//app에서 모든 route를 관리
//리액트에서는 하나의 컴포터넌트를 리턴하는 것이 아니라, array를 리턴할수도 있음
const App = props => {
  const { now_using, isLoggedIn, userid, my_memberships } = props;
  return (
    <BrowserRouter>
      <Fragment>
        {isLoggedIn && userid ? (
          <Fragment>
            <Navigation />
            <PrivateRoutes
              now_using={now_using}
              userid={userid}
              my_memberships={my_memberships}
            />
          </Fragment>
        ) : props.isLoggedIn ? null : (
          <PublicRoutes />
        )}
        <Footer />
      </Fragment>
    </BrowserRouter>
    // 로그인 상태이고 회원정보까지 불러온 상태라면(userid가 있는 상태) 네비게이션(메뉴바), 회원 전용창 보여줌
    // 로그인 상태이고 회원정보까지 불러오지 않은 상태면 null
    // 로그인도 하지 않은 상태라면 회원가입창
    // now_using 정보가 있다면 좌석창으로
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

// 로그인했을 때 보여지는 컴포넌트
const PrivateRoutes = props => {
  const { now_using, my_memberships } = props;

  // if (now_using) {
  //   history.push("/현재 이용하고 있는 좌석으로 이동");
  //   //now_using의 데이터를 활용해서 해당 지점, 열람실로 이동
  //   return null;
  // }

  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/allocation" component={LoungeFeed} />
      {/* <Route exact path="/" component={Branches} /> */}
      <Route path={`/myinfo`} component={MyInfo} />

      <Route
        path="/membership"
        component={
          my_memberships
            ? my_memberships.length
              ? EnrollExtendChoice
              : EnrollMembership
            : EnrollMembership
        }
      />
      <Route path="/enroll" component={EnrollMembership} />
      <Route path="/extend" component={ExtendMembership} />
      <Route path="/cabinet" component={RegistCabinet} />
      <Route path="/enrollcabinet" component={EnrollCabinetOnly} />
    </div>
  );
};

PrivateRoutes.propTypes = {
  userid: PropTypes.number.isRequired
  // now_using에 대한 데이터 타입 추가줄 것 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
};

//로그인을 하지 않았을때 보여지는 컴포넌트
const PublicRoutes = props => (
  <Switch>
    <Route exact path="" component={Auth} />
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => "password"} />
  </Switch>
);

export default App;
