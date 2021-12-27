import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const UserUpdate = (props) => {
  const [isNameValid, setisNameValid] = useState(false);
  const [isNameValid2, setisNameValid2] = useState(false);
  const [isPassworeValid, setisPassworeValid] = useState(false);
  const [isPassworeValid2, setisPassworeValid2] = useState(false);
  const [messageNameValid, setmessagesNameValid] =
    useState('현재 사용중인 이름입니다.');
  const [messagePassworeValid, settmessagePassworeValid] = useState('');
  const [messageCertification, setmessageCertification] = useState('');
  const [UsernameInfo, setUsernameInfo] = useState({
    userid: localStorage.getItem('id'),
    username: '',
    useremail: localStorage.getItem('email'),
  });
  const [UserpasswordInfo, setUserpassword] = useState({
    userid: localStorage.getItem('id'),
    useremail: localStorage.getItem('email'),
    password: '',
  });
  const [UserInfo, setUserInfo] = useState({
    userid: localStorage.getItem('id'),
    username: localStorage.getItem('name'),
    useremail: localStorage.getItem('email'),
    password: '',
  });

  const [updatename, updateupname] = useState('');
  const [updatepassword, setUpdatepassword] = useState('');
  const [password2, setpassword2] = useState('');
  useEffect(() => {
    // console.log('이름 체크 ', namecheck(UserInfo.username));
    console.log('이름 체크 ', namecheck(UsernameInfo.username));
    // console.log('이름 체크 2', isNameValid);
    console.log('패스워드  체크 ', passwordcheck(UserpasswordInfo.password));
    console.log('패스워드  체크 2', isPassworeValid);
  });
  function passwordcheck(signuppassword) {
    console.log(signuppassword);
    var reg_password = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
    if (UserpasswordInfo.password.length === 0) {
      setisPassworeValid2(false);
      settmessagePassworeValid('');
    } else if (isPassworeValid2 === false) {
      settmessagePassworeValid('');
    } else if (
      !reg_password.test(signuppassword) &&
      isPassworeValid2 === true
    ) {
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
  //이름 체크
  function namecheck(signupname) {
    console.log(signupname);
    console.log(signupname.length);

    var reg_name = /^[ㄱ-ㅎ|가-힣a-zA-Z0-9]{2,12}$/;
    if (signupname === localStorage.getItem('name') && isNameValid2 === false) {
      setmessagesNameValid('');
    } else if (
      signupname === localStorage.getItem('name') &&
      isNameValid2 === true
    ) {
      setmessagesNameValid('현재 사용되고 있습니다.');
    } else if (!reg_name.test(signupname) && isNameValid2 === true) {
      setisNameValid(false);
      setmessagesNameValid('2~12글자 입력');
    } else if (signupname.length === 0 && isNameValid2 === true) {
      setmessagesNameValid('변경할 이름을 입력해주세요');
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
          if (res.message === 'Error: existsByName' && isNameValid2) {
            setmessagesNameValid('이름 중복');
          } else if (
            res.message === 'not existsName' &&
            isNameValid2 === true
          ) {
            setmessagesNameValid('사용 가능한 이름 입니다.');
          } else if (isNameValid2 === true) {
            setmessagesNameValid('이름 중복 검사 중 에러');
          }
        });
      return setisNameValid(true);
    }
  }

  const changeName = (e) => {
    setUserInfo({
      userid: localStorage.getItem('id'),
      username: e.target.value,
      useremail: localStorage.getItem('email'),
      password: UserInfo.password,
    });
    setUsernameInfo({
      userid: localStorage.getItem('id'),
      username: e.target.value,
      useremail: localStorage.getItem('email'),
    });
    setisNameValid2(true);

    console.log(UserInfo);
  };
  const changePassword = (e) => {
    setUserInfo({
      userid: localStorage.getItem('id'),
      username: UserInfo.username,
      useremail: localStorage.getItem('email'),
      password: e.target.value,
    });
    setUserpassword({
      userid: localStorage.getItem('id'),
      useremail: localStorage.getItem('email'),
      password: e.target.value,
    });
    setisPassworeValid2(true);
    // console.log(UserInfo);
  };
  const changePassword2 = (e) => {
    setpassword2(e.target.value);
    // console.log(UserInfo);
  };
  // 유저 이름 변경
  const userUpdatepasswordSubmit = (e) => {
    console.log('버튼 부분', UserpasswordInfo.password);
    console.log('버튼 부분', password2);
    if (!(UserpasswordInfo.password === password2)) {
      // setmessageCertification('비밀번호와 비밀번호확인이 다름');
      alert('비밀번호와 비밀번호확인이 다름');
    } else if (UserpasswordInfo.password === password2) {
      console.log('패스워드 값 같음');
      e.preventDefault();
      fetch('http://localhost:8080/user/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(UserpasswordInfo),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            alert('패스워드가 변경되었습니다');
            localStorage.clear();
            console.log('회원정보 수정 성공');
            document.location.href = '/login';
          } else if (!res.ok) {
            alert('기존 비밀번호와 같습니다. ');
          }
          //else if()
          return res.json();
        })
        .then((res) => {
          console.log('res22', res);
        });
    }
  };
  const userUpdatenameSubmit = (e) => {
    e.preventDefault();
    // console.log(UsernameInfo);
    // console.log(messageNameValid === '사용 가능한 이름 입니다.');
    let check = messageNameValid === '사용 가능한 이름 입니다.';
    // console.log('check', check);

    if (isNameValid2 && check) {
      fetch('http://localhost:8080/user/updatename', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(UsernameInfo),
      })
        .then((res) => {
          // console.log('이름 변경 ', res);
          localStorage.setItem('name', UsernameInfo.username);
          alert('이름이 변경되었습니다');
          // res.json();
        })
        .then((res) => {
          // console.log('이름변경경경');
        });
    }
  };

  const userUpdate = (e) => {
    console.log(UserInfo.username);
    console.log(UserInfo.password);
    if (!UserInfo.password === password2) {
      console.log('비밀번호와 비밀번호 확인이 다름');
    } else if (UserInfo.password === password2) {
      e.preventDefault();
      fetch('http://localhost:8080/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(UserInfo),
      }).then((res) => {
        console.log('res2', res);
        // console.log(props);
        if (res.status === 200) {
          alert('회원정보 수정이 되었습니다. 다시 로그인 해주세요');
          localStorage.clear();
          console.log('회원정보 수정 성공');
          document.location.href = '/login';
          //로그인 화면 이동
        } else {
          // Alert('회원정보수정 실패');
          console.log('회원정보 수정 성공');
        }
      });
    }
  };
  // console.log('userinfo', UserInfo);
  console.log('password2', UserpasswordInfo.password);
  console.log('password2', password2);

  return (
    <div className="user-info" style={{ width: '400px', margin: 'auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>
        회원 정보 수정 부분
      </h3>
      <Container>
        <Form>
          <Form.Group style={{ marginBottom: '15px' }}>
            <Form.Label>이메일 입력</Form.Label>

            <Form.Control
              name="useremail"
              readOnly
              defaultValue={UserInfo.useremail}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: '22px' }}>
            <Form.Label>변경 이름 입력</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder={UserInfo.username}
              defaultValue={UserInfo.username}
              onChange={changeName}
            />
            {isNameValid ? (
              <text style={{ color: 'green' }}>{messageNameValid}</text>
            ) : UsernameInfo.username.length === 0 ? (
              <text style={{ color: 'green' }}>{messageNameValid}</text>
            ) : messageNameValid === '현재 사용되는 이름입니다' ? (
              <text style={{ color: 'orange' }}>{messageNameValid}</text>
            ) : (
              <text style={{ color: 'green' }}>{messageNameValid}</text>
            )}
            <Button
              type="button"
              onClick={userUpdatenameSubmit}
              style={{
                width: '85px',
                height: '38px',
                position: 'absolute',
                top: 230,
                right: 12,
                marginBottom: '5px',
              }}
            >
              이름변경
            </Button>
          </Form.Group>
          <hr />
          <Form.Group style={{ marginBottom: '15px' }}>
            <Form.Label>변경 비밀번호 입력</Form.Label>

            <Form.Control
              name="password"
              type="password"
              placeholder="Enter Password"
              defaultValue={UserInfo.password}
              onChange={changePassword}
            />
            {isPassworeValid ? (
              <text style={{ color: 'green' }}>{messagePassworeValid}</text>
            ) : (
              <text style={{ color: 'orange' }}>{messagePassworeValid}</text>
            )}
          </Form.Group>

          {/* 비밀번호 확인 부분  */}
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label>변경 비밀번호 확인</Form.Label>

            <Form.Control
              name="password"
              type="password"
              placeholder="Enter Password"
              // defaultValue={UserInfo.password}
              onChange={changePassword2}
            />
          </Form.Group>
          <text style={{ paddingBottom: '10px' }}>{messageCertification}</text>
        </Form>
        <Button
          type="button"
          onClick={userUpdatepasswordSubmit}
          style={{ position: 'absolute', top: 450, right: 12 }}
        >
          비밀번호변경
        </Button>
      </Container>
    </div>
  );
};

export default UserUpdate;
