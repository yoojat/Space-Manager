import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import './styles.scss';
import Footer from 'components/Footer';
import Auth from 'components/Auth';
import Navigation from 'components/Navigation';
import SuperuserNavigation from 'components/SuperuserNavigation';
import Branches from 'components/Branches';

//app에서 모든 route를 관리
//리액트에서는 하나의 컴포터넌트를 리턴하는 것이 아니라, array를 리턴할수도 있음
const App = props => {
  return [
    props.isLoggedIn ? (
      props.is_superuser ? (
        <SuperuserNavigation key={1} />
      ) : (
        <Navigation key={1} />
      )
    ) : null,
    props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
    <Footer key={3} />,
  ];
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  // is_staff: PropTypes.bool.isRequired,
  // is_superuser: PropTypes.bool.isRequired,
};

// 로그인했을 때 보여지는 컴포넌트
const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={Branches} />
    <Route exact path="/explore" render={() => 'explore'} />
  </Switch>
);

//로그인을 하지 않았을때 보여지는 컴포넌트
const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => 'password'} />
  </Switch>
);

export default App;
