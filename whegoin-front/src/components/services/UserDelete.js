import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const UserDelete = () => {
  const [userId, setUserId] = useState('');
  const userDelete = (e) => {
    e.preventDefault();
    console.log('유저 아이디 ', localStorage.getItem('id'));
    setUserId(localStorage.getItem('id'));
    fetch('http://localhost:8080/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(userId),
    }).then((res) => {
      console.log('delete res 1 ', res);
      if (res.status === 200) {
        alert('회원 삭제 되었습니다.');
        document.location.href = '/';
        localStorage.clear();
      } else {
        console.log('회원 삭제 실패 ');
      }
    });
  };
  return (
    <div style={{ position: 'absolute', left: 152, bottom: -175 }}>
      <Button type="button" onClick={userDelete}>
        회원탈퇴
      </Button>
    </div>
  );
};

export default UserDelete;
