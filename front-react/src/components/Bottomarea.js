import React from 'react';
import { Link as Link1 } from 'react-scroll'; //스크롤용
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Bottomarea = () => {
  return (
    <div style={{}}>
      <div style={{ display: 'flex' }}>
        <Link1
          to="1"
          spy={true}
          style={{
            textDecoration: 'none',
            color: 'black',
            cursor: 'pointer',
            margin: 'auto',
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '250px',
              height: '30px',
              border: '1px solid gray',
              fontSize: '18px',
              borderRadius: '10px',
            }}
          >
            여행지 선택화면으로 돌아가기
          </div>
        </Link1>
      </div>
      <div style={{ backgroundColor: '#FFD9E4' }}>
        <p> &nbsp;</p>
        <div style={{ height: '50px', textAlign: 'center' }}>
          <div style={{ marginTop: '30px', fontSize: '30px' }}>
            <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
              {' '}
              여행 블로그
            </div>
          </div>
        </div>
        <p> &nbsp;</p>
        <div
          style={{
            margin: 'auto',
            width: '1200px',
            height: '300px',

            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: '',
          }}
        >
          <div
            style={{
              width: '300px',
              height: '300px',
              // border: '1px solid gray',
              backgroundColor: '#FFE3EE',
              display: 'flex',

              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://blog.naver.com/qquiop/221476331594"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div
                style={{
                  marginLeft: '16.5px',
                  width: '200px',
                  height: '200px',
                }}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAyMjdfMTUw%2FMDAxNTUxMjQ3MDkzNTYx.eSnIMZDaaEKqE0EBMrBNZEsW_SJ4iisJ08fY2I7l3log.musCLmpalw3GXulBsMvyyFTRJW9MRn9t-MG0fL8YAYkg.PNG.qquiop%2FKakaoTalk_20190227_143656215.png&type=sc960_832"
                ></img>
              </div>
              <div
                style={{
                  // border: '1px solid black',
                  borderRadius: '8px',
                  background: 'white',
                  padding: '2px 10px',
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>2박 3일 경상도,전라고 여행코스</div>
                <div> 여봄름 님의 블로그 </div>
              </div>
            </a>
          </div>
          <div
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: '#FFE3EE',
              display: 'flex',

              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://blog.naver.com/dbal0336/222270016741"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div
                style={{ marginLeft: '37px', width: '200px', height: '200px' }}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMDhfMTcy%2FMDAxNjE1MTk4MzYyOTcz.-sDeOn4AG2XqQaYf1wQlUR6dfioQ1EP5qEJ7PEO65eQg.dCFrEu6uexK0BZRaP1C_5CSyV1rlAkawugIcm2UAYIwg.JPEG.dbal0336%2FIMG_8250.jpg&type=sc960_832"
                ></img>
              </div>
              <div
                style={{
                  // border: '1px solid black',
                  borderRadius: '8px',
                  background: 'white',
                  padding: '2px 10px',
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>목포 여행코스, 가볼만한곳 여행지 추천</div>
                <div> 윰로그 님의 블로그 </div>
              </div>
            </a>
          </div>
          <div
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: '#FFE3EE',
              display: 'flex',
              // flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://blog.naver.com/laondeas/222416560152"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div
                style={{ marginLeft: '21px', width: '200px', height: '200px' }}
              >
                <img
                  style={{ width: '100%', height: '100%' }}
                  src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA3MDFfMTcw%2FMDAxNjI1MTI3MzUzMjgx.WrKHH3HjyIWL4LYZAIwwNlTGayQWS-n9wt9uBi27iOUg.CiWtBjubl9q6rpHqFdzN3nWnIztkLl-qk2PSTVAYLz8g.PNG.laondeas%2F75.png&type=sc960_832"
                ></img>
              </div>
              <div
                style={{
                  // border: '1px solid black',
                  borderRadius: '8px',
                  background: 'white',
                  padding: '2px 10px',
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>강원도 2박 3일 여행코스 4곳 추천</div>
                <div> 드래블러 님의 블로그 </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div style={{ height: '100px', backgroundColor: '#FFD9E4' }}></div>
      <Footer></Footer>
    </div>
  );
};

export default Bottomarea;
