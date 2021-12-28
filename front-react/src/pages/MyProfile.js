import React, { useState } from 'react';
// import { Alert, Button, Container, Form } from 'react-bootstrap';
import UserDelete from '../components/services/UserDelete';
import UserUpdate from '../components/services/UserUpdate';

const MyProfile = (props) => {
  const [UserInfo, setUserInfo] = useState({
    userid: localStorage.getItem('id'),
    username: localStorage.getItem('name'),
    useremail: localStorage.getItem('email'),
    password: '',
    // usertoken: localStorage.getItem('accessToken'),
  });

  const userInfo = () => {
    // console.log(localStorage.getItem('name'));
    // console.log(localStorage.getItem('email'));
    // console.log(localStorage.getItem('id'));
    // console.log(localStorage.getItem('accessToken'));
    setUserInfo({
      userid: localStorage.getItem('id'),
      username: localStorage.getItem('name'),
      useremail: localStorage.getItem('email'),
      // usertoken: localStorage.getItem('accessToken'),
    });
  };

  return (
    <>
      {/* 레이아웃 컴포넌트 만들기  */}
      <div
        className="userinfo_update"
        style={{
          height: '369px',
          padding: '10 10 10 10',
          width: '400px',
          margin: 'auto',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: 'auto',
        }}
      >
        <UserUpdate /> <br />
        <hr style={{ width: '380px', marginLeft: '10px' }} />
        <UserDelete />
      </div>
    </>
  );
};

export default MyProfile;
