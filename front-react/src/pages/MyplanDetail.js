import React, { useEffect, useState } from 'react';
// import { useHistory, useParams } from 'react-router-dom';

import ScrollTop from '../components/ScrollTopmain';

const MyplanDetail = ({ history, location, match }) => {
  // console.log('디테이ㄹ 부분', location.state.myplan);
  const [Myplan, setMyplan] = useState({
    userid: location.state.myplan.userid,
    myplansid: location.state.myplan.myplansid,
    myplan: location.state.myplan.myplan,
    myplantitle: location.state.myplan.myplantitle,
    city: location.state.myplan.city,
  });
  let myplan = location.state.myplan;
  let createdate = myplan.createDate.substring(0, 10);
  let daylists = myplan.myplan.split('-');
  daylists.splice(-1, 1);

  for (let i = 0; i < daylists.length; i++) {
    daylists[i] = daylists[i].split(',');
    console.log('daylists', daylists);
  }

  useEffect(() => {
    // console.log('location.state', location.state);
    // console.log('서버쪽에서 이름 변경하기');
  }, []);

  console.log('fff', daylists);
  const myplandelete = (e) => {
    e.preventDefault();
    console.log('일정 삭제 버튼 ');
    fetch('http://localhost:8080/mypage/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(Myplan),
    }).then((res) => {
      console.log(res.ok);
      if (res.ok) {
        alert(`${Myplan.myplantitle} 계획이 삭제되었습니다. `);
        history.goBack();
      } else if (!res.ok) {
        alert('일정 삭제 중 에러가 발생하였습니다. ');
      }
    });
  };
  const daylist = daylists.map((day, index) => (
    <li>
      <div
        style={{
          width: '750px',
          backgroundColor: 'white',
          marginBottom: '20px',
          // border: '1px solid blue',
          // backgroundColor: '#EBFBFF',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            marginBottom: '5px',
            // border: '1px solid red',
            position: 'relative',
            // marginLeft: '-10px',
            fontWeight: 'bold',
          }}
        >
          Day&nbsp;{index + 1}
        </div>
        <div
          style={{
            backgroundColor: '#E8F5FF',
            borderRadius: '10px',
            borderBottom: '2px solid gray',
          }}
        >
          {day.map((ones) => (
            <span>
              {ones}&nbsp;&nbsp;
              <img style={{ width: '20px' }} src="/img/arrow1.png"></img>
              &nbsp;&nbsp;
            </span>
          ))}
        </div>
        {/* <hr /> */}
      </div>
    </li>
  ));
  const detailButton = {
    // border: '1px solid green',
    cursor: 'pointer',
    marginRight: '10px',
    padding: '5px',
    borderRadius: '10px',
    backgroundColor: '#D2E1FF',
    borderBottom: '1px solid gray',
  };
  console.log('myplan', Myplan);
  return (
    <div
      style={{
        marginTop: '120px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollTop />
      <div
        style={{
          width: '800px',
          height: '50px',
          backgroundColor: '#E8F5FF',
          // border: '1px solid blue',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{ fontWeight: 'bold', fontSize: '30px', marginLeft: '10px' }}
        >
          &nbsp;Title :{' '}
          <text style={{ fontSize: '23px' }}>{Myplan.myplantitle}</text>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={detailButton} onClick={() => history.goBack()}>
            &nbsp;목록으로 돌아가기&nbsp;
          </div>
          <div style={detailButton}>&nbsp;일정 수정하기&nbsp;</div>
        </div>
      </div>
      <divR
        style={{
          width: '800px',
          // border: '1px solid red',
          borderRadius: '15px',
          // backgroundColor: '#EBFBFF',
        }}
      >
        <div
          style={{
            margin: '10px',
            display: 'flex',
            justifyContent: 'right',
            marginBottom: '13px',
          }}
        >
          <div
            style={{
              display: 'flex',
              marginRight: '10px',
              flexDirection: 'column',
              justifyContent: 'right',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={
                {
                  // border: '1px solid black',
                }
              }
            >
              생성일 : {createdate}
            </div>
            <div
              style={
                {
                  // border: '1px solid black',
                }
              }
            >
              주요장소: {Myplan.city}
            </div>
          </div>
        </div>
        <ul>{daylist}</ul>

        {/* {'\n'} */}
        <p />
        <div
          style={{
            marginTop: '30px',
            // border: '1px solid red',
            display: 'flex',
            justifyContent: 'right',
          }}
        >
          <div
            style={{
              // border: '1px solid green',
              cursor: 'pointer',
              marginRight: '10px',
              padding: '5px',
              borderRadius: '10px',
              backgroundColor: '#FFE6E6',
              marginBottom: '10px',
              borderBottom: '1px solid gray',
            }}
            onClick={myplandelete}
          >
            &nbsp;&nbsp;일정 삭제&nbsp;&nbsp;
          </div>
        </div>
      </divR>
    </div>
  );
};

export default MyplanDetail;
