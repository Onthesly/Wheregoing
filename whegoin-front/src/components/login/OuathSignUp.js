import React from 'react';
// import { Button } from 'react-bootstrap';
import KAKAO_LOGO from '../../img/kakao_login_medium_wide.png';
import FACEBOOK_LOGO from '../../img/facebook_20211221_180027841.png';
import NAVER_LOGO from '../../img/naver_20211221_180030573.png';
import GOOGLE_LOGO from '../../img/google_20211221_180034223.png';

import {
  FACEBOOK_AUTH_URL,
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../constrants/index';

const OuathSingUp = (props) => {
  const oauthLogin = (e) => {
    e.preventDefault();
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
        console.log('소셜 res 2 ', res);
        if (res.tokenType === 'Bearer') {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('name', res.username);
          localStorage.setItem('email', res.email);
          localStorage.setItem('id', res.id);
          localStorage.setItem('loginstate', res.loginstate);
          localStorage.setItem('oauthstate', res.oauthstate);
          console.log('소셜 정보 저장 '); // 아 맞나 이게?
          document.location.href = '/';
        }
      });
  };
  return (
    <>
      <h3>간편 로그인</h3>

      <a href={KAKAO_AUTH_URL}>
        <img src={KAKAO_LOGO}></img>
      </a>
      <p />
      <a href={NAVER_AUTH_URL}>
        <img src={NAVER_LOGO}></img>
      </a>

      <p />
      <a href={GOOGLE_AUTH_URL}>
        <img src={GOOGLE_LOGO}></img>
      </a>

      <p />

      <a href={FACEBOOK_AUTH_URL}>
        <img src={FACEBOOK_LOGO}></img>
      </a>
    </>
  );
};

export default OuathSingUp;
