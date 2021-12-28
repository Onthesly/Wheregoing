import React, { useEffect, useState } from 'react';
// import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import OuathLogin from '../components/login/OuathLogin';

import { Button, Container, Form } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
import ScrollTop from '../components/ScrollTopmain';
import Navigation from '../components/Navigation';

const Login = (props) => {
  // const dispatcher = useDispatch();
  // const
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const [loginemail, setLoginemail] = useState('');
  const [loginpassword, setLoginpassword] = useState('');
  useEffect(() => {
    console.log('입력중');
    console.log({ loginemail, loginpassword, loginUser });
  });
  const changeEmail = (e) => {
    // // setLoginemail(e.target.value);
    setLoginUser({
      email: e.target.value,
      password: loginUser.password,
    });
  };
  const changePassword = (e) => {
    //// setLoginpassword(e.target.value);
    setLoginUser({
      email: loginUser.email,
      password: e.target.value,
    });
  };
  const login = (e) => {
    console.log(loginemail);
    console.log(loginpassword);

    console.log('login user', loginUser);
    e.preventDefault(); // summit 액션을 차단!

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },

      body: JSON.stringify(loginUser),
    })
      .then((res) => {
        console.log('res1', res);

        return res.json();
      })

      .then((res) => {
        console.log('res2', res.message);
        console.log('res2', res.accessToken);
        if (localStorage.getItem('accessToken')) {
          console.log('토큰 get 성공');
        }
        if (res.tokenType === 'Bearer') {
          // localStorage.setItem(res);
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('name', res.username);
          localStorage.setItem('email', res.email);
          localStorage.setItem('id', res.id);
          localStorage.setItem('loginstate', res.loginstate);
          localStorage.setItem('oauthstate', res.oauthstate);
          // console.log('password', res.password);
          console.log('통신 성공');
          // dispatcher(login(res.data));
          // console.log('res.data ', res.data);
          // let jwtToken = res.headers.get('Authorization');
          // localStorage.setItem('accessToken', jwtToken);
          props.history.push('/');
          //화면 동기화
        } else {
          alert('이메일 및 비밀번호를 확인하십시오');
          console.log('통신 실패');
        }
      });
  };
  // console.log(object)
  console.log(loginUser.email);
  console.log(loginUser.password);
  return (
    <div
      className="login_parent"
      style={{
        display: 'inline',
        textAlign: 'center',
        verticalAlign: 'middle',
        // width: '1000px',
        // height: '800px',
      }}
    >
      <ScrollTop />
      <div style={{ marginTop: '100px', padding: '30px' }} />
      {/* <div style={{ display: 'block', textAlign: 'center' }} /> */}
      <div
        style={{
          width: '800px',
          height: '300px',
          justifyContent: 'space-between',
          display: 'flex',
          position: 'absolute',
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px',
          margin: 'auto',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: 300,
          }}
        >
          {/* <Navigation></Navigation> */}

          <Container
            className="login_first"
            style={{
              // marginLeft: '200px',
              width: '400px',
              // float: 'left',
            }}
          >
            <h3>로그인</h3>
            <Form style={{ position: 'relative', margin: '30px 0px 20px' }}>
              <Form.Group style={{ width: '70%' }}>
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  onChange={changeEmail}
                  style={{ marginBottom: '15px' }}
                />
              </Form.Group>
              <Form.Group style={{ width: '70%' }}>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={changePassword}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={login}
                style={{
                  width: '100px',
                  position: 'absolute',
                  top: '0px',
                  bottom: '0px',
                  right: '0px',
                  margin: 'auto',
                }}
              >
                로그인
              </Button>
            </Form>
            <div
              className="ex"
              style={{
                height: '80px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <div>아직 회원이 아니신가요?</div>
                <Button style={{ marginTop: '10px' }}>
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to="/EmailSignUp"
                  >
                    회원가입하러가기
                  </Link>
                </Button>
              </div>
              <div>
                <div>비밀번호를 까먹으셨나요?</div>
                <Button style={{ marginTop: '10px' }}>
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to="/FindPassword"
                  >
                    비밀번호 찾기
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </div>
        <div
          className="saa"
          style={{
            display: 'inline-block',

            width: '300px',
            height: '300px',
            float: 'right',
          }}
        >
          <OuathLogin></OuathLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
