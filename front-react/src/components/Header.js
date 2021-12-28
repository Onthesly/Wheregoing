import React from 'react';

// import styled from 'styled-components';

const Header = () => {
  return (
    <div
      style={
        {
          //  border: '1px solid black'
        }
      }
    >
      <div
        style={{
          height: '100px',

          // marginTop: '100px',
          backgroundColor: 'lightcyan',
        }}
      ></div>
      <div
        style={{
          // border: '1px solid red',
          textAlign: 'center',
          backgroundColor: 'lightcyan',
          // backgroundImage: 'url(' + 'img/headerback.jpg' + ')',
        }}
      >
        <h3
          style={{
            height: '80px',
            // border: '1px solid red',
            fontSize: '35px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>Where Going</div>
        </h3>
        <div
          style={{
            margin: 'auto',
            // border: '1px solid blue',
            width: '600px',
            height: '400px',
          }}
        >
          <img
            style={{ width: '100%', height: '100%' }}
            src="https://wanderlustoverloaded.files.wordpress.com/2014/10/tumblr_mx2viexano1rm9n0ro1_500.gif"
          ></img>
        </div>
        <div style={{ height: '50px' }}></div>
        <div
          style={{
            marginBottom: '10px',
            fontSize: '20px',
            fontWeight: 'bolder',
          }}
        >
          {/* 여행 일자, 숙소, 가고싶은 장소만 선택하면 */}
          여행 일정에 대한 고민과 스트레스는 이제 그만
        </div>
        <div style={{ fontSize: '20px', fontWeight: 'bolder' }}>
          날짜와 장소만 선택하면 일정을 자동으로 완성해주는 플래너
        </div>
        <div id="1" style={{ height: '80px' }}></div>
      </div>
    </div>
  );
};

export default Header;
