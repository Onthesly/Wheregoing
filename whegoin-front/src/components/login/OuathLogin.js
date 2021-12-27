import React from 'react';
import { Button } from 'react-bootstrap';
import KAKAO_START from '../../img/kakao_start.png';
import FACEBOOK_START from '../../img/facebookstart.png';
import NAVER_START from '../../img/naver_start.png';
import GOOGLE_START from '../../img/google_start.png';
import {
  FACEBOOK_AUTH_URL,
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../constrants/index';

const OuathLogin = (props) => {
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
    <div>
      <h3 style={{ marginBottom: '15px' }}>간편 로그인</h3>

      <a href={KAKAO_AUTH_URL}>
        <img src={KAKAO_START}></img>
      </a>
      <p />
      <a href={NAVER_AUTH_URL}>
        <img src={NAVER_START} style={{ width: 300, height: 45 }}></img>
      </a>

      <p />
      <a href={GOOGLE_AUTH_URL}>
        <img src={GOOGLE_START} style={{ width: 300, height: 45 }}></img>
      </a>

      <p />

      <a href={FACEBOOK_AUTH_URL}>
        <img src={FACEBOOK_START} style={{ width: 300, height: 45 }}></img>
      </a>
    </div>
  );
};

export default OuathLogin;
