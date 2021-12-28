import React, { useEffect, useState } from 'react';
// import Navigation from '../components/Navigation';
// import { Link } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
// import OuathSingUp from '../components/login/OuathSignUp';
import ScrollTop from '../components/ScrollTopmain';

const EmailSignUp = (props) => {
  const [singupUser, setSignupUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [signupemail, setSignupemail] = useState('');

  const [signupname, setSignupname] = useState('');

  const [signuppassword, setSignuppassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Certification, setCertification] = useState('');

  //유효성 검사 true false
  const [isNameValid, setisNameValid] = useState(false);
  const [isEmailValid, setisEmailValid] = useState(false);
  const [isPassworeValid, setisPassworeValid] = useState(false);
  const [isCertification, setisCertification] = useState(false);
  // 메시지
  const [messageNameValid, setmessagesNameValid] =
    useState('사용할 이름을 입력해주세요');
  const [messageEmailValid, settmessageEmailValid] = useState(
    '로그인에 사용할 이메일을 입력해주세요',
  );
  const [messagePassworeValid, settmessagePassworeValid] = useState('');
  const [messageCertification, setmessageCertification] = useState('');

  useEffect(() => {
    // console.log('입력중');
    console.log({ signupname, signupemail, signuppassword, ConfirmPassword });
    console.log('이름 체크 ', namecheck(signupname));
    console.log('이름 체크 2', isNameValid);
    console.log('이메일 체크 ', emailcheck(signupemail));
    // console.log('이메일 체크 2', isEmailValid);
    console.log('패스워드  체크 ', passwordcheck(signuppassword));
    // console.log('패스워드  체크 2', isPassworeValid);

    console.log(Certification);
  });
  // 이름 4~ 12자리
  function namecheck(signupname) {
    console.log(signupname);
    console.log(signupname.length);
    var reg_name = /^[ㄱ-ㅎ|가-힣a-zA-Z0-9]{2,12}$/;
    if (signupname.length === 0) {
      setmessagesNameValid('사용할 이름을 입력해주세요');
    } else if (!reg_name.test(signupname)) {
      setisNameValid(false);
      setmessagesNameValid('이름은 2~12 글자 입력이 가능합니다.');
      // return setisNameValid(false);
    } else if (signupname.length === 0) {
      setmessagesNameValid('사용할 이름을 입력해주세요');
    } else {
      // event.preventDefault();
      fetch('http://localhost:8080/auth/usernamevalid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(signupname),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log('중복검사 부분', res);
          if (res.message === 'Error: existsByName') {
            setmessagesNameValid('이름 중복');
          } else if (res.message === 'not existsName') {
            setmessagesNameValid('사용 가능한 이름 입니다.');
          } else {
            setmessagesNameValid('이름 중복 검사 중 에러');
          }
        });
      return setisNameValid(true);
    }
  }
  // 이메일 유효성 검사
  function emailcheck(signupemail) {
    console.log(signupemail);
    if (signupemail.length === 0) {
      settmessageEmailValid('사용할 이메일을 입력해주세요');
    } else if (signupemail.length > 0) {
      var reg_email =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!reg_email.test(signupemail)) {
        setisEmailValid(false);
        settmessageEmailValid('이메일 형식이 맞지 않습니다.');
      } else {
        setisEmailValid(true);
        if (isEmailValid) {
          fetch('http://localhost:8080/auth/useremailvalid', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(signupemail),
          })
            .then((res) => {
              console.log('되던게 안되냐 ', res);
              return res.json();
            })
            .then((res) => {
              console.log(res); // 결과 확인한다음
              console.log('중복검사 이메일 부분', res.message);
              if (res.message === 'Error: existsByEmail') {
                settmessageEmailValid('이메일 중복');
              } else if (res.message === 'not existsEmail') {
                settmessageEmailValid('사용 가능한 이메일 입니다.');
              } else {
                settmessageEmailValid('이메일 중복 검사 중 에러 ');
              }
            });
        }
        return setisEmailValid(true);
      }
    }
    // signupemail
  }
  // 문자, 숫자 , 특수문자 각각 최소 1개이상, 최소 8 자리에서 최대 16자리
  function passwordcheck(signuppassword) {
    console.log(signuppassword);
    var reg_password = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
    if (!reg_password.test(signuppassword)) {
      setisPassworeValid(false);
      settmessagePassworeValid(
        '영문,숫자,특수문자 각각 \n최소 1개 이상( 8~16자리 입력 )',
      );
      return setisPassworeValid(false);
    } else {
      settmessagePassworeValid('비밀번호 확인 입력해주세요');
      setisPassworeValid(true);
    }
  }

  const changeName = (e) => {
    setSignupname(e.target.value);
    setSignupUser({
      name: e.target.value,
      email: signupemail,
      password: signuppassword,
    });
  };
  const changeEmail = (e) => {
    // emailcheck = [...emailcheck, e.target.value];
    // setemailcheck(...emailcheck, e.target.value);
    // console.log(emailcheck);
    setSignupemail(e.target.value);
    setSignupUser({
      name: signupname,
      email: e.target.value,
      password: signuppassword,
    });
  };
  // console.log('sign email2', signupemail);
  const changePassword = (e) => {
    setSignuppassword(e.target.value);
    setSignupUser({
      name: signupname,
      email: signupemail,
      password: e.target.value,
    });
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const changeCertification = (e) => {
    setCertification(e.target.value);
  };

  // 이메일 인증 보내기
  const emailCertification = (e) => {};

  // // 이메일 및 이름  중복 검사 버튼  //zzzz@naver.com
  // const emailVaild = (e) => {
  //   console.log('이메일 중복 검사 ' + signupemail);
  //   e.preventDefault();
  //   fetch('http://localhost:8080/auth/useremailvalid', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json; charset=utf-8',
  //     },
  //     body: JSON.stringify(signupemail),
  //   })
  //     .then((res) => {
  //       console.log('되던게 안되냐 ', res);
  //       return res.json();
  //     })
  //     .then((res) => {
  //       console.log(res); // 결과 확인한다음
  //       console.log('중복검사 부분', res.message);
  //       if (res.message === 'Error: existsByEmail') {
  //         alert('이메일 중복');
  //       } else if (res.message === 'not existsEmail') {
  //         alert('사용 가능한 이메일 입니다.');
  //       } else {
  //         alert('이메일 중복 검사 중 에러 ');
  //       }
  //     });
  // };

  // // 이름 중복 검사 // zzzz   // mklkm
  // const nameValid = (e) => {
  //   console.log(signupname);
  //   e.preventDefault();
  //   fetch('http://localhost:8080/auth/usernamevalid', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //     },
  //     body: JSON.stringify(signupname),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       console.log('중복검사 부분', res);
  //       if (res.message === 'Error: existsByName') {
  //         alert('이름 중복');
  //       } else if (res.message === 'not existsName') {
  //         alert('사용 가능한 이름 입니다.');
  //       } else {
  //         alert('이름 중복 검사 중 에러');
  //       }
  //     });
  // };

  // 회원가입 부분
  const signup = (e) => {
    // setSignupUser({
    //   name: signupname,
    //   email: signupemail,
    //   password: signuppassword,
    // });

    if (signuppassword !== ConfirmPassword) {
      setmessageCertification('비밀번호를 다시 확인해주세요');
    } else if (signuppassword === ConfirmPassword) {
      setisCertification(true);
    }

    // 이렇게 하면 한박자 느린데? 여기 느린거 다시 잡아 다른데도
    console.log('회원가입 보내기전 ', singupUser);
    e.preventDefault();
    if (setisCertification) {
      fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(singupUser),
      })
        .then((res) => {
          console.log('signup res1', res);
          return res.json();
        })
        .then((res) => {
          console.log('res2', res);
          console.log('res2', res.success);
          console.log('res2', res.message);
          if (localStorage.getItem('accessToken')) {
            console.log('토큰 get 성공');
          }
          if (res.success) {
            console.log('통신 성공');
            console.log('res.data ', res.data);
            alert('회원가입 성공하였습니다 로그인 창으로 돌아갑니다 ');
            props.history.push('/login');
            //화면 동기화
          } else if (res.message === 'Email address already in use.') {
            alert('이메일이 사용되고 있습니다.');
          } else if (res.message === 'Error: Username is already taken!') {
            alert('이미 사용되고 있는 이름입니다.');
          } else {
            console.log('통신 실패');
          }
        });
    }
  };

  // console.log(singupUser.name);
  // console.log(singupUser.email);
  // console.log(singupUser.password);
  console.log('certification  ', Certification);
  console.log('이름 체크 3', messageNameValid);
  console.log('이메일 체크 3', messageEmailValid);
  console.log('패스워드 체크 3', messagePassworeValid);
  return (
    <>
      <div
        className="EmailSingup_parent"
        style={{
          display: 'inline',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        {/* <Navigation></Navigation> */}
        <ScrollTop />
        <div>
          <div style={{ marginTop: '50px', padding: '30px' }} />{' '}
          {/* 네브 겹치지않게  */}
          <div
            style={{
              width: '800px',
              margin: 'auto',
            }}
          >
            <div style={{ display: 'inline-block' }}>
              <Container className="EmailSingup_first">
                <h1>회원가입</h1>
                <Form
                  className="form-signup"
                  onSubmit={signup}
                  style={{
                    width: '400px',
                    margin: 'auto',
                  }}
                >
                  {/* 이름 입력  */}
                  <Form.Group
                    style={{ marginBottom: '15px', marginTop: '15px' }}
                  >
                    <Form.Label>이름 입력</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      onChange={changeName}
                      required
                    />
                    {isNameValid ? (
                      <text style={{ color: 'green' }}>{messageNameValid}</text>
                    ) : signupname.length === 0 ? (
                      <text style={{ color: 'green' }}>{messageNameValid}</text>
                    ) : (
                      <text style={{ color: 'orange' }}>
                        {messageNameValid}
                      </text>
                    )}
                    {/* {isNameValid ? (
                      <text style={{ color: 'green' }}>{messageNameValid}</text>
                    ) : signupname.length === 0 ? (
                      <text style={{ color: 'green' }}>{messageNameValid}</text>
                    ) : messageNameValid === '이름 중복' ? (
                      <text style={{ color: 'green' }}>{messageNameValid}</text>
                    ) : (
                      <text style={{ color: 'orange' }}>
                        {messageNameValid}
                      </text>
                    )} */}
                  </Form.Group>
                  {/* 이메일 입력  */}
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Label>이메일 입력</Form.Label>

                    <Form.Control
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      onChange={changeEmail}
                    />
                    {isEmailValid ? (
                      <text style={{ color: 'green' }}>
                        {messageEmailValid}
                      </text>
                    ) : signupemail.length === 0 ? (
                      <text style={{ color: 'green' }}>
                        {messageEmailValid}
                      </text>
                    ) : (
                      <text style={{ color: 'orange' }}>
                        {messageEmailValid}
                      </text>
                    )}
                  </Form.Group>
                  {/* 인증 되어있는지 안되어있는지 확인  */}
                  {/* <Form.Group>
                    <Form.Label>인증번호 입력</Form.Label>

                    <Form.Control
                      name="certification"
                      type="text"
                      placeholder="인증번호를 입력하새요"
                      onChange={changeCertification}
                    />
                  </Form.Group>

                  <Button type="button" onClick={emailCertification}>
                    이메일 인증
                  </Button> */}
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Label>비밀번호 입력</Form.Label>

                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="enter password"
                      onChange={changePassword}
                    />
                    {isPassworeValid ? (
                      <text style={{ color: 'green' }}>
                        {messagePassworeValid}
                      </text>
                    ) : (
                      <text style={{ color: 'orange' }}>
                        {messagePassworeValid}
                      </text>
                    )}
                  </Form.Group>
                  <Form.Group style={{ marginBottom: '15px' }}>
                    <Form.Label>비밀번호 확인</Form.Label>

                    <Form.Control
                      name="ConfirmPassword"
                      type="password"
                      placeholder="Enter Password"
                      onChange={changeConfirmPassword}
                    />
                    <text>{messageCertification}</text>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginBottom: '20px', marginTop: '5px' }}
                  >
                    회원가입
                  </Button>
                </Form>
              </Container>
            </div>
            {/* <div
              className="EmailSingup_second"
              style={{
                display: 'inline-block',

                width: '300px',
                height: '300px',
                float: 'right',
              }}
            >
              <OuathSingUp />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSignUp;
