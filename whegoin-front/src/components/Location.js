import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import './Location.css';
import LocationModal from '../modals/LocationModal';

import 가평 from '../img/locations/가평.jpg';

const Location = (pr) => {
  const [LocationModalOn, setLocationModalOn] = useState({
    state: false,
    info: '',
    name: '',
    urlname: '',
    img: {},
  });
  const [loactionlist, setloactionlist] = useState([]);
  const [posts, setPosts] = useState([]);
  const [zezudo1, setZezudo] = useState([]);
  const [mousehendle, setmousehendle] = useState(true);
  const StyledItemBoxDiv = styled.div``;
  useEffect(() => {
    fetch('http://localhost:8080/location/all', {
      headers: {
        // 'POST'
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then((res) => {
        console.log('res1', res);
        return res.json();
      })
      .then((res) => {
        console.log('res2', res);
        setloactionlist(res);

        if (res.ok) {
          console.log('res111', res);
        } else {
          console.log('로케이션 정보 에러');
        }
      });
  }, []);

  const loactionlistadd = (loactionlist) => {
    loactionlist.map((test) => {
      test.img = findimg(test.cityname);
    });
  };
  function findimg(name) {
    const img = <img src={`img/locations/${name}.jpg`} className="zezu"></img>;
    return img;
  }

  loactionlistadd(loactionlist);

  const zezudo = [];
  const gangwondo = [];
  const gyeonggi = [];
  const jeollado = [];
  const gyeongsang = [];
  const chungcheongdo = [];
  const seoul = [];

  const all = [...loactionlist];

  const loactionlistaddname = (loactionlist) => {
    loactionlist.map((test) => {
      if (test.doname === '제주도') {
        zezudo.push({ ...test });
      } else if (test.doname === '강원도') {
        gangwondo.push({ ...test });
        // return test;
      } else if (test.doname === '서울') {
        seoul.push({ ...test });
      } else if (test.doname === '경기도') {
        gyeonggi.push({ ...test });
      } else if (test.doname === '전라도') {
        jeollado.push({ ...test });
      } else if (test.doname === '충청도') {
        chungcheongdo.push({ ...test });
      } else if (test.doname === '경상도') {
        gyeongsang.push({ ...test });
      }
    });
  };
  loactionlistaddname(loactionlist);

  console.log('영어이름 ', loactionlist);
  return (
    <>
      {mousehendle || localStorage.getItem('loginstate') === false ? (
        setTimeout(() => {
          setPosts([...loactionlist]);
          setmousehendle(false);
        }, 300)
      ) : (
        <></>
      )}
      <LocationModal
        show={LocationModalOn.state}
        onHide={() =>
          setLocationModalOn({
            state: false,
            info: LocationModalOn.info,
            name: LocationModalOn.name,
            img: LocationModalOn.img,
            urlname: LocationModalOn.urlname,
          })
        }
        info={LocationModalOn.info}
        name={LocationModalOn.name}
        img={LocationModalOn.img}
        urlname={LocationModalOn.urlname}
      />
      <div className="locationBtn">
        {/* {Object.entries(tourList).map((item, idx) => (
          // console.log(item[0], item[1]);
          <button style={{ margin: '5px' }} onClick={() => setPosts([item[0]])}>
            {item[1]}
          </button>
        ))} */}
        <div
          onClick={() => {
            setPosts([...zezudo]);
            setmousehendle(false);
          }}
        >
          제주도
        </div>
        <div
          onClick={() => {
            setPosts([...seoul]);
            setmousehendle(false);
          }}
        >
          서울
        </div>
        <div
          onClick={() => {
            setPosts([...gangwondo]);
            setmousehendle(false);
          }}
        >
          강원도
        </div>
        <div
          onClick={() => {
            setPosts([...gyeonggi]);
            setmousehendle(false);
          }}
        >
          경기도
        </div>
        <div
          onClick={() => {
            setPosts([...chungcheongdo]);
            setmousehendle(false);
          }}
        >
          충청도
        </div>
        <div
          onClick={() => {
            setPosts([...jeollado]);
            setmousehendle(false);
          }}
        >
          전라도
        </div>
        <div
          onClick={() => {
            setPosts([...gyeongsang]);
            setmousehendle(false);
          }}
        >
          경상도
        </div>
        <div
          onClick={() => {
            setPosts([...all]);
            setmousehendle(false);
          }}
        >
          전체보기
        </div>
      </div>
      <div className="locationBox">
        {posts.map((post) => (
          <div className="StyledItemBoxDiv">
            <div
              className="locationImg"
              onClick={() => {
                // console.log(post.cityinfo);
                setLocationModalOn({
                  state: true,
                  info: post.cityinfo,
                  name: post.cityname,
                  img: post.img,
                  urlname: post.citynamee,
                  // img: post.img,
                });
              }}
            >
              <div className="locationImgBox">
                <div className="backGroundColor"></div>
                {post.img}
                <div className="locationInfo">
                  {post.cityname}
                  <br />
                  <br />
                  자세히 보기
                </div>
              </div>
              {/* <div className="locationImgBox">{post.img}</div>
              <div className="locationImgBox">{post.img}</div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Location;
