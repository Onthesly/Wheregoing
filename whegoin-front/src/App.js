import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import About from './pages/About';
import EmailSignUp from './pages/EmailSignUp';
import FindPassword from './pages/FindPassword';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import MyProfile from './pages/MyProfile';
import UserAgreements from './pages/UserAgreements';
import UserPolicy from './pages/UserPolicy';
import Wg from './pages/Wg';

import WgResult from './pages/WgResult';
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import MyplanDetail from './pages/MyplanDetail';

import ScrollTop from './components/ScrollTopmain';
import { LoadingIndicator } from './components/loading';

function App() {
  console.log('앱부분', localStorage.getItem('loginstate'));

  // useEffect(() => {
  //   localStorage.setItem('id', 1);
  //   localStorage.setItem('email', '11111@naver.com');
  //   localStorage.setItem('name', '아아아아');
  //   localStorage.setItem('loginstate', true);
  // }, []);
  return (
    <>
      {/* <ScrollTop/> */}
      <Navigation></Navigation>
      <LoadingIndicator />
      <Route path="/" exact={true} component={Homepage} />
      <Route path="/about" exact={true} component={About} />
      <Route path="/emailSignUp" exact={true} component={EmailSignUp} />
      <Route path="/findPassword" exact={true} component={FindPassword} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/myPage" exact={true} component={MyPage} />
      <Route path="/myProfile" exact={true} component={MyProfile} />
      <Route path="/userAgreements" exact={true} component={UserAgreements} />
      <Route path="/userPolicy" exact={true} component={UserPolicy} />
      <Route path="/wg/:cityname" exact={true} component={Wg} />
      <Route path="/wgResult" exact={true} component={WgResult} />
      <Route
        path="/myPage/:myplantitle"
        exact={true}
        component={MyplanDetail}
      />
      <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>{' '}
      {/* <Route path="/Logins" exact={true} component={Logins} /> */}
    </>
  );
}

export default App;
