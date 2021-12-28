import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <div
        style={{
          // height: '200px',
          // 여기 각각 으로 마진 줘야될듯

          backgroundColor: 'grey',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center' }}>
            &copy; : 2021 WhereGoing. All Rights Reserved.
            <br />
            <Link
              to="/userAgreements"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              이용약관
            </Link>
            <Link
              to="/userPolicy"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              개인정보처리방침
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
