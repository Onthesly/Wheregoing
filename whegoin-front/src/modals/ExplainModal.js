import { render } from '@testing-library/react';
import React from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { HorizonLine } from '../components/HorizonLine';

const ExplainModal = ({ show, onHide }) => {
  const stepbox = {
    border: '1px solid black',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    backgroundColor: 'lightcyan',
  };
  const stepsize = {
    fontSize: '30px',
    marginBottom: '10px',
  };
  const explainsize = {
    fontSize: '20px',
    marginBottom: '10px',
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container style={{ display: 'flex' }}>
        {/* 
      https://ossam5.tistory.com/73 유투브 넣는법 */}
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/fpO_EJTkC1Y"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
        <div
          style={{
            width: '700px',
            height: '400px',
            // border: '1px solid black',
            margin: 'auto',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <div
            style={{
              width: '640px',
              // border: '1px solid red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '70px',
              // fontSize: '24px',
            }}
          >
            <div style={stepbox}>
              <div style={stepsize}>STEP 1</div>
              <div style={explainsize}>여행지 선택</div>
            </div>
            <div>&gt;</div>
            <div style={stepbox}>
              <div style={stepsize}>STEP 2</div>
              <div style={explainsize}>일정 선택</div>
            </div>
            <div>&gt;</div>
            <div style={stepbox}>
              <div style={stepsize}>STEP 3</div>
              <div style={explainsize}>장소 선택</div>
            </div>
            <div>&gt;</div>
            <div style={stepbox}>
              <div style={stepsize}>STEP 4</div>
              <div style={explainsize}>일정 저장</div>
            </div>
            <div>&gt;</div>
            <div style={stepbox}>
              <div style={stepsize}>STEP 5</div>
              <div style={explainsize}>Mypage</div>
            </div>
          </div>
          <div style={{ marginBottom: '20px', fontSize: '20px' }}>
            <text>일정 저장</text> 및 <text>Mypage</text> 는 회원가입 후 진행해
            주세요
          </div>
        </div>
      </Container>
    </Modal>
  );
};

export default ExplainModal;
