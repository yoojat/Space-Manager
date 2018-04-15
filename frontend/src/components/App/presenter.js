import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import './styles.scss';
import Footer from 'components/Footer';
import Auth from 'components/Auth';
import Navigation from 'components/Navigation';
import LoungeFeed from 'components/LoungeFeed';
import Membership from 'components/Membership';
// import ChangePassword from 'components/ChangePassword';
import RegistMembership from 'components/RegistMembership';
//app에서 모든 route를 관리
//리액트에서는 하나의 컴포터넌트를 리턴하는 것이 아니라, array를 리턴할수도 있음
const App = props => {
  return (
    <BrowserRouter>
      <div>
        {props.isLoggedIn ? <Navigation /> : null}
        {props.isLoggedIn ? (
          <PrivateRoutes pathname={props.pathname} />
        ) : (
          <PublicRoutes />
        )}

        <Footer />
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  // is_staff: PropTypes.bool.isRequired,
  // is_superuser: PropTypes.bool.isRequired,
};

// 로그인했을 때 보여지는 컴포넌트
const PrivateRoutes = props => (
  <div>
    <Route exact path="/" render={() => '메인페이지'} />
    <Route path="/allocation" component={LoungeFeed} />
    {/* <Route exact path="/" component={Branches} /> */}
    <Route path="/myinfo" component={Membership} />
    <Route path="/membership" component={RegistMembership}>
      {/* <Route exact path="/changePassword" component={ChangePassword} /> */}
    </Route>
  </div>
);

//로그인을 하지 않았을때 보여지는 컴포넌트
const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => 'password'} />
  </Switch>
);

export default App;
