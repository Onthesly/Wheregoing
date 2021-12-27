import { render } from '@testing-library/react';
import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Lo from './ExplainModal';

const ExplainModal = ({ show, onHide, info, name, img, urlname }) => {
  console.log('모달 info ', info);
  console.log('모달 name ', name);
  console.log('모달 show', show);
  console.log('모달 onhide', onHide);
  console.log('모달 img', show);
  console.log('모달 url', urlname);

  return (
    <Modal
      style={{ border: '3px solid black' }}
      show={show}
      onHide={onHide}
      // onHide={() =>
      //   setLocationModalOn({ state: false, info: '', name: '', img: {} })
      // }
      info={info}
      // 컨버젼 중
      // name=""
      // img=""
      name={name}
      info={info}
      urlname={urlname}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {' '}
      <Container
        style={{ display: 'flex', position: 'relative', padding: '15px 15px' }}
      >
        <div style={{ width: '400px', height: '300px', borderRadius: '40px' }}>
          <div style={{ width: '100%', height: '100%' }}>{img}</div>
        </div>
        <div
          style={{
            paddingTop: '10px',
            paddingLeft: '10px',
            width: '500px',
            height: '300px',
          }}
        >
          <h3>{name}</h3>
          <br />
          {info}

          <Link
            to={{
              // pathname: `/city?city=${urlname}`,
              pathname: `/wg/${urlname}`,
              state: {
                name: name,
                urlname: urlname,
              },
            }}
            style={{
              textDecoration: 'none',
              color: 'black',
              position: 'absolute',
              bottom: 0,
              right: 0,
              marginBottom: '25px',
              marginRight: '25px',
              fontWeight: 'bolder',
              // background: 'aqua',
            }}
          >
            <div
              style={{
                backgroundColor: 'lightcyan',
                padding: '5px 10px',
                borderBottom: '1.5px solid gray',
                borderRadius: '10px',
              }}
            >
              일정 생성하기
            </div>
          </Link>
        </div>
      </Container>
    </Modal>
  );
};

export default ExplainModal;
