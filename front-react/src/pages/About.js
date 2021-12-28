import React from 'react';

const About = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '100px',
          backgroundColor: '#dcdcdc',
          width: '1200px',
          height: '700px',

          flexDirection: 'column',
        }}
      >
        <div
          style={{
            // margin: 'auto',
            marginBottom: '10px',
            // border: '1px solid red',
            width: '1100px',
            height: '320px',
            backgroundColor: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '30px',
            }}
          >
            <div style={{}}>
              <img style={{ width: '350px' }} src="/img/about1.PNG"></img>
            </div>
            <div style={{}}>
              <img style={{ width: '350px' }} src="/img/about2.PNG"></img>
            </div>
            <div style={{}}>
              <img style={{ width: '350px' }} src="/img/about3.PNG"></img>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '100px',
            // alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              width: '350px',
              height: '120px',
              borderRadius: '20px',
              marginRight: '50px',
              paddingTop: '4px',
            }}
          >
            <div
              style={{
                width: '350px',
                marginBottom: '20px',
                fontSize: '30px',
                textAlign: 'center',
              }}
            >
              누구나 할 수 있는
            </div>
            <div
              style={{
                width: '350px',
                marginBottom: '100px',
                fontSize: '30px',
                textAlign: 'center',
              }}
            >
              간편한 일정 작성
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              width: '370px',
              height: '120px',
              borderRadius: '20px',
              paddingTop: '4px',
              paddingLeft: '6px',
            }}
          >
            <div
              style={{
                width: '350px',
                marginBottom: '20px',
                fontSize: '30px',
                textAlign: 'center',
              }}
            >
              몇번의 선택으로 완성되는
            </div>
            <div
              style={{
                width: '350px',
                marginBottom: '100px',
                fontSize: '30px',
                textAlign: 'center',
              }}
            >
              최적화된 일자별 여행 코스
            </div>
          </div>
          {/* <div
            style={{ width: '350px', marginBottom: '100px', fontSize: '20px' }}
          >
            asfasf
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
