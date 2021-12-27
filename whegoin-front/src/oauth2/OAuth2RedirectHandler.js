import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constrants';

class OAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    console.log(name);
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    console.log('name', name);
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    console.log('regex', regex);
    var results = regex.exec(this.props.location.search);
    // console.log("result", result);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  render() {
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');
    console.log('소셜 로그인 ');
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);

      // alert('토큰 있을 시');
      // 바로 로그인 되게?
      fetch('http://localhost:8080/auth/login/oauth', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          // {"Bearer " + localStorage.getItem('accessToken')}
        },

        body: JSON.stringify(localStorage.getItem('accessToken')),
      })
        .then((res) => {
          console.log('소셜 res', res);
          return res.json();
        })
        .then((res) => {
          console.log('소셜 res 1', res);
          console.log('소셜 res 2 ', res.emailexist);

          if (res.emailexist === true) {
            alert(`${res.username}님 환영합니다.`);
          } else if (res.emailexist === false) {
            alert('회원가입이 되었습니다.');
          }
          if (res.tokenType === 'Bearer') {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('name', res.username);
            localStorage.setItem('email', res.email);
            localStorage.setItem('id', res.id);
            localStorage.setItem('loginstate', res.loginstate);
            localStorage.setItem('oauthstate', res.oauthstate);
          }
          console.log('소셜 정보 저장 '); // 아 맞나 이게?
          // document.location.href = '/';
        });

      return (
        <Redirect
          to={{
            pathname: '/',
            // pathname: '/login', // 다시 로그인으로 가라
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      // alert('토큰 없을 시');
      // return (
      //   <Redirect
      //     to={{
      //       pathname: '/login',
      //       state: {
      //         from: this.props.location,
      //         error: error,
      //       },
      //     }}
      //   />
      // );
    }
  }
}

export default OAuth2RedirectHandler;
