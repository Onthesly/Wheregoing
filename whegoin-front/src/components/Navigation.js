import React, { useEffect } from 'react';
import './Nav.css';
import { Button } from 'react-bootstrap';
import { Link as Link1 } from 'react-scroll'; //스크롤용
import { Link as Link2 } from 'react-router-dom'; // 페이지옮기기용
import styled from 'styled-components';
import { useState } from 'react';
import ExplainModal from '../modals/ExplainModal';

const Navigation = (props) => {
  console.log(props);
  const [toggleDisplay, setToggleDisplay] = useState('none');
  const [navbarColor, setNavbarColor] = useState(false);

  const [ExplainModalOn, setExplainModalOn] = useState(false);
  // 로그인 상태 확인 용
  const [loginstate, setLoginstate] = useState(
    localStorage.getItem('loginstate'),
  );
  // setLoginstate(localStorage.getItem('loginstate'));
  useEffect(() => {
    setLoginstate(localStorage.getItem('loginstate'));
    console.log(loginstate);
  });
  // const loginstateee = localStorage.getItem('loginstate');

  // setLoginstate(localStorage.getItem('loginstate'));
  //반응형 쿼리를 위한 함수
  function ChangeToggle() {
    if (toggleDisplay === 'none') {
      setToggleDisplay('block');
    } else {
      setToggleDisplay('none');
    }
  }
  const NavButtonStyled = styled.ul`
    height: 80px;
    display: flex;
    list-style: none;
    padding: 0;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    margin-right: 100px;
    @media screen and (max-width: 910px) {
      flex-direction: column;
      align-items: center;
      width: 100%;
      display: ${toggleDisplay};
    }
  `;

  const Navbar = styled.nav`
    height: 80px;
    background-color: rbga(255, 255, 255, 0.5);

    font-size: 20px;
    font-weight: bold;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    transition: 2s;
  `;

  const Li = styled.li`
    height: 80px;
    margin-right: 20px;
    line-height: 80px;
  `;

  const ChangeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbarColor(true);
    } else {
      setNavbarColor(false);
    }
  };
  const Logout = () => {
    localStorage.clear();

    window.location.href = '/login'; // 로그인 페이지 이동
  };

  window.addEventListener('scroll', ChangeBackground);

  return (
    <>
      <ExplainModal
        show={ExplainModalOn}
        onHide={() => setExplainModalOn(false)}
      />

      <Navbar className={navbarColor ? 'NavBaractive' : 'NavBar'} id="NavBar">
        <div className="title">
          <Link2 to="/" style={{ textDecoration: 'none', color: 'black' }}>
            Where Going
          </Link2>
          {/* <Link2 to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            login
          </Link2>{' '}
          <Link2
            to="/emailSignUp"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            Sign up
          </Link2>{' '}
          <Button variant="primary" type="button" onClick={Logout}>
            logout
          </Button> */}
        </div>

        <NavButtonStyled>
          <Li>
            <Link1
              to="1"
              spy={true}
              style={{
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer',
              }}
            >
              여행지
            </Link1>
          </Li>
          <Li
            onClick={() => setExplainModalOn(true)}
            style={{ cursor: 'hand' }}
          >
            이용방법
          </Li>
          <Li>
            {loginstate ? (
              <Link2
                to="/myPage"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Mypage
              </Link2>
            ) : (
              <Link2
                to="/about"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                소개&nbsp;&nbsp;
              </Link2>
            )}
          </Li>

          {/* 조건부 렌더링 중 */}
          <Li>
            {/* loginstate */}
            {loginstate ? (
              <div variant="primary" type="button" onClick={Logout}>
                logout
              </div>
            ) : (
              <Link2
                to="/login"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                로그인
              </Link2>
            )}
          </Li>
        </NavButtonStyled>
        <div className="NavToggle" onClick={ChangeToggle}></div>
      </Navbar>
    </>
  );
};

export default Navigation;
