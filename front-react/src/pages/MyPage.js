import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ScrollTop from '../components/ScrollTopmain';

const MyPage = (props) => {
  const [UserInfo, setUserInfo] = useState({
    userid: '',
    username: '',
    useremail: '',
  });
  const [mypageReq, setmypageReq] = useState({
    userid: localStorage.getItem('id'),
    email: localStorage.getItem('email'),
  });
  const [mypageRes, setmypageRes] = useState([]);
  const [isRequest, setisRequest] = useState(false);
  useEffect(() => {
    setUserInfo({
      userid: localStorage.getItem('id'),
      username: localStorage.getItem('name'),
      useremail: localStorage.getItem('email'),
    });
    myPlansAll(localStorage.getItem('id'));
  }, []);
  function myPlansAll(userid) {
    console.log('유저 아이디 확인 ', userid);
    fetch('http://localhost:8080/mypage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(mypageReq),
    })
      .then((res) => {
        console.log('마이페이지 res1', res);
        if (res.ok) {
          setisRequest(true);
          return res.json();
        } else {
          setisRequest(false);
        }
      })
      .then((res) => {
        // c?onsole.log('res', res.ok);
        console.log('마이페이지 res2', res);
        setmypageRes(res);
      });
  }
  // console.log(mypageRes[0].createDate);
  // console.log(mypageRes[0].createDate.length);
  function dateFormat(date) {
    const day = moment(date).format('YYYY.MM.DD');
    return day;
  }
  function findimg(name) {
    const img = <img src={`img/locations/${name}.jpg`} className="zezu"></img>;
    return img;
  }
  console.log('is request', isRequest);
  console.log('mypageres ', mypageRes);
  return (
    <>
      <ScrollTop />

      {/*      body 부부분 */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '130px',
        }}
      >
        <div
          style={{
            // border: '1px solid blue',
            width: '800px',
            height: '50px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '8px',
            backgroundColor: '#E8F5FF',
          }}
        >
          <div style={{ fontSize: '30px' }}>
            &nbsp; {UserInfo.username} 님의 PLANS
          </div>
          <div
            style={{
              // border: '1px solid red',
              marginRight: '10px',
              borderRadius: '5px',
              backgroundColor: '#D2E1FF',
              borderBottom: '1px solid gray',
            }}
          >
            <Link
              style={{
                float: 'right',
                marginRight: '10px',
                textDecoration: 'none',
                color: 'black',
                fontSize: 20,
              }}
              to="/MyProfile"
            >
              &nbsp;&nbsp;&nbsp;회원정보
            </Link>
          </div>
        </div>
        {/* 일정 리스트  */}
        {isRequest ? (
          mypageRes.map((post, index) => (
            // <h1>{index}</h1>
            <div
              style={{
                width: '800px',
                height: '110px',
                borderBottom: '1px solid black',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  // border: '1px solid blue',
                  width: '800px',
                  height: '100px',
                  display: 'flex',
                  marginBottom: '20px',
                }}
              >
                {' '}
                <Link
                  to={{
                    pathname: `/myPage/${post.myplantitle}`,
                    state: {
                      myplan: post,
                    },
                  }}
                  info
                >
                  <div
                    style={{
                      width: '100px',
                      height: '100px',

                      flex: 'none',
                    }}
                  >
                    {findimg(post.city)}
                  </div>
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={{
                      pathname: `/myPage/${post.myplantitle}`,
                      state: {
                        myplan: post,
                      },
                    }}
                    info
                  >
                    <div
                      style={{
                        fontSize: '25px',
                        marginLeft: '10px',
                        marginTop: '4px',
                      }}
                    >
                      Title: {post.myplantitle}
                    </div>
                  </Link>
                  <div style={{ marginLeft: '10px', marginTop: '2px' }}>
                    주요장소 : {post.city}
                  </div>
                  <div style={{ marginLeft: '10px', marginTop: '0' }}>
                    {post.planinfo}
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    // border: '1px solid red',
                  }}
                >
                  <div
                    style={{
                      marginRight: 'auto',
                      //  border: '1px solid red'
                    }}
                  >
                    생성일 : {dateFormat(post.createDate)}&nbsp;&nbsp;&nbsp;
                  </div>
                  <Link
                    style={{
                      marginTop: 'auto',
                      marginLeft: 'auto',
                      // border: '1px solid red',
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: 'black',
                    }}
                    to={{
                      pathname: `/myPage/${post.myplantitle}`,
                      state: {
                        myplan: post,
                      },
                    }}
                    info
                  >
                    <div
                      style={{
                        padding: '3px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        backgroundColor: '#D2E1FF',
                        borderBottom: '1px solid gray',
                        // marginTop: 'auto',
                        // marginLeft: 'auto',
                        // border: '1px solid red',
                        // textAlign: 'center',
                      }}
                    >
                      &nbsp;&nbsp;일정보러가기&nbsp;&nbsp;
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  padding: '3px',
                  marginBottom: '20px',
                  fontSize: '20px',
                }}
              >
                등록한 일정이 없습니다.
              </div>
              <div
                style={{
                  width: '150px',
                  padding: '3px',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  backgroundColor: '#D2E1FF',
                  borderBottom: '1px solid gray',
                }}
              >
                <Link
                  to="/"
                  spy={true}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    cursor: 'pointer',
                  }}
                >
                  &nbsp;일정생성하러가기&nbsp;
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// const styles =
export default MyPage;
