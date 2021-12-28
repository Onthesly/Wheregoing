import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
// import Header from '../components/Header';
const FindPassword = () => {
  const changeEmail = (e) => {};
  const changePassword = (e) => {};
  return (
    <div>
      <div style={{ height: '150px' }}></div>
      {/* <Header></Header> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            // border: '1px solid blue',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            width: '500px',
          }}
        >
          <Container>
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '30px',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                비밀번호 찾기
              </div>
              <div style={{ marginLeft: '40px' }}>
                <div>이메일을 확인 후 임시비밀번호로 로그인 하세요.</div>
                <div>비밀번호 변경을 꼭 해주시길 바랍니다.</div>
              </div>
            </div>
            <Form
              className="form-signup"
              // onSubmit={signup}
              style={{
                width: '400px',
                margin: 'auto',
              }}
            >
              {/* 이메일 입력  */}
              <Form.Group style={{ marginBottom: '15px' }}>
                <Form.Label>사용하는 이메일 입력</Form.Label>

                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  onChange={changeEmail}
                />
              </Form.Group>
              <Form.Group style={{ marginBottom: '15px' }}>
                <Form.Label>발송 받을 이메일 입력</Form.Label>

                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  onChange={changeEmail}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="button"
                style={{
                  marginBottom: '20px',
                  marginTop: '5px',
                  marginLeft: '130px',
                }}
              >
                임시 비밀번호 받기
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FindPassword;
