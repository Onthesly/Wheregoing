import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoBox,
  Polyline,
} from '@react-google-maps/api';
import ScrollTop from '../components/ScrollTopmain';
import './Wg.css';

const WgResult = (props) => {
  const location = useLocation();
  const selectedTimeList = location.state.selectedTimeList;
  const selectedHotelList = location.state.selectedHotelList;
  const selectedTourList = location.state.selectedTourList;
  const city = location.state.city;
  const days = location.state.days;

  const [daysList, setDaysList] = useState([]);
  const [hypenString, setHypenString] = useState(null);
  const [dyasStirng, setDaysString] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/newmap-result?locations=${selectedTourList}&hotels=${selectedHotelList}&timeList=${selectedTimeList}&days=${days}&city=${city}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    )
      .then((response) => {
        console.log('res', response);
        return response.json();
      })
      .then((response) => {
        setDaysList(response.daysList);
        setHypenString(response.hypenString);
        setDaysString(response.daysString);
        initText(response.daysList);
        initPolyline(response.daysList);
        // initMarker(response.daysList);
        setCenter({
          lat: response.daysList[0][0].lat,
          lng: response.daysList[0][0].lng,
        });
      });
  }, []);

  const [center, setCenter] = useState({ lat: 37.55477842, lng: 126.9705761 });
  const [polylinePath, setPolylinePath] = useState([]);
  // const [markerPath, setMarkerPath] = useState([]);
  const [forTextDays, setForTextDays] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputInfo, setInputInfo] = useState('');
  // const [markerPathMinus, setmarkerPathMinus] = useState([]);
  const polylineRef = useRef([]);
  const markerRef = useRef([]);
  const textRef = useRef([]);
  const titleRef = useRef([]);
  // const inputTitleRef=useRef([]);

  // const initMarker = (daysList) => {
  //   const tempList = [...daysList];
  //   // const flatList = [].concat(...tempList);
  //   // setMarkerPath(flatList);
  //   // setmarkerPathMinus([...flatList].splice(1));
  // };

  const initPolyline = (daysList) => {
    // console.log(daysList)
    let dasyListcopy = [...daysList];
    let tempList = [];
    dasyListcopy.map((day) => {
      let innerList = [];
      // console.log(day)
      day.map((location) => {
        // console.log(location)
        innerList.push({ lat: location.lat, lng: location.lng });
      });
      // console.log(innerList);
      tempList.push(innerList);
    });
    setPolylinePath(tempList);
  };

  const initText = (daysList) => {
    // console.log(daysList)
    const tempList = JSON.parse(JSON.stringify(daysList));
    // console.log(tempList)
    // console.log("입니다")
    let processingList = [];
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].pop();
      // console.log('asf', tempList[i]);
      processingList.push(tempList[i]);
    }
    setForTextDays(processingList);
  };

  const polylineColor = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#FF00FF',
  ];

  const showPlan = (e, number) => {
    e.preventDefault();
    if (number !== -1) {
      // console.log(markerRef.current.length);
      for (let i = 0; i < markerRef.current.length; i++) {
        if (markerRef.current[i] !== undefined) {
          markerRef.current[i].marker.visible = false;
        }
      }
      for (let i = 0; i < daysList[number].length; i++) {
        markerRef.current[number * 10 + i].marker.visible = true;
      }
      setCenter({ lat: daysList[number][0].lat, lng: daysList[number][0].lng });
      setTimeout(() => {
        for (let i = 0; i < polylineRef.current.length; i++) {
          polylineRef.current[i].state.polyline.setVisible(false);
          textRef.current[i].style.display = 'none';
          titleRef.current[i].style.display = 'none';
        }
        textRef.current[number].style.display = 'block';
        titleRef.current[number].style.display = 'block';
        polylineRef.current[number].state.polyline.setVisible(true);
      }, 0);
    }

    if (number === -1) {
      setCenter({ lat: daysList[0][0].lat, lng: daysList[0][0].lng });
      setTimeout(() => {
        for (let i = 0; i < polylineRef.current.length; i++) {
          polylineRef.current[i].state.polyline.setVisible(true);
          textRef.current[i].style.display = 'block';
          titleRef.current[i].style.display = 'block';
        }
        for (let i = 0; i < markerRef.current.length; i++) {
          if (markerRef.current[i] !== undefined) {
            markerRef.current[i].marker.visible = true;
          }
        }
      }, 0);
    }
  };

  const titleValue = (e) => {
    console.log(e.target.value);
    setInputTitle(e.target.value);
  };
  const infoValue = (e) => {
    console.log(e.target.value);
    setInputInfo(e.target.value);
  };

  const dataSave = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:8080/planSave?dataKr=${hypenString}&city=${city}&title=${inputTitle}&info=${inputInfo}&userid=${localStorage.getItem(
        'id',
      )}`,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    ).then((response) => {
      console.log(response);
    });
    props.history.push('/mypage');
  };
  // console.log(props);
  // console.log('daysList', daysList);
  const leftBtn = {
    cursor: 'pointer',
    borderRadius: '10px',
    // border: '1px solid black',
    marginBottom: '8px',
    width: '150px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: '510',
    backgroundColor: '#D2E1FF',
    borderBottom: '2px solid gray',
  };
  return (
    <>
      <ScrollTop />
      <div style={{ marginTop: '100px' }}> </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '1060px',
            height: '630px',
            padding: '10px',
            border: '2px solid gray',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '20px',
            backgroundColor: '#E8F5FF',
          }}
        >
          {/* left side */}
          <div
            style={{
              width: '200px',
              height: '600px',

              backgroundColor: 'white',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}
          >
            {daysList.map((day, index) => (
              <div
                style={leftBtn}
                onClick={(e) => showPlan(e, index)}
                key={index + 3000}
              >
                {index + 1}일차 일정보기
              </div>
            ))}
            <div style={leftBtn} onClick={(e) => showPlan(e, -1)}>
              전체 일정보기
            </div>

            {/* 일정 제목 , 여행 설명  */}
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    marginBottom: '3px',
                  }}
                >
                  여행 Title
                </div>
                <input
                  style={{
                    paddingLeft: '5px',
                    width: '170px',
                    borderRadius: '5px',
                    marginBottom: '3px',
                  }}
                  onChange={(e) => {
                    titleValue(e);
                  }}
                  placeholder="Title을 넣어주세요"
                  value={inputTitle}
                  size={10}
                />
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    marginBottom: '3px',
                  }}
                >
                  여행 Info
                </div>
                <input
                  style={{
                    paddingLeft: '5px',
                    width: '170px',
                    borderRadius: '5px',
                    marginBottom: '3px',
                  }}
                  onChange={(e) => {
                    infoValue(e);
                  }}
                  placeholder="여행 설명을 넣어주세요"
                  value={inputInfo}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                  }}
                >
                  <div
                    style={leftBtn}
                    onClick={(e) => {
                      dataSave(e);
                    }}
                  >
                    일정 저장하기
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* center */}
          <div
            style={{
              width: '600px',
              height: '600px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
          >
            <LoadScript googleMapsApiKey="InputYourApiKey">
              <GoogleMap
                mapContainerStyle={{ width: '600px', height: '600px' }}
                center={center}
                zoom={13}
              >
                {daysList.map((day, index) => (
                  <span key={index + 1000}>
                    {
                      day.map((location, innerIndex) => (
                        <span key={innerIndex + 100}>
                          <Marker
                            icon={{ url: `/img/marker/marker${index + 1}.png` }}
                            position={{ lat: location.lat, lng: location.lng }}
                            label={{
                              text: location.name,
                              fontSize: '16px',
                              fontWeight: 'bold',
                            }}
                            ref={(elem) =>
                              (markerRef.current[index * 10 + innerIndex] =
                                elem)
                            }
                            visible={true}
                          />

                          {/* <InfoBox
                    position={{lat:tour.lat,lng:tour.lng}}
                    visible={false}
                    ref={elem => (infoBoxRef.current[index] = elem)}
                  >
                    <div style={{ backgroundColor: 'yellow', opacity:1, padding: 12 }} key={tour} >
                      <div style={{ fontSize: 16, fontColor: `#08233B` }} key={index}>
                        {tour.content}
                      </div>
                    </div>
                  </InfoBox> */}
                        </span>
                      )) //내부맵닫기
                    }
                  </span>
                ))}

                {daysList.map((day, index) => (
                  <Polyline
                    key={index + 3500}
                    ref={(elem) => (polylineRef.current[index] = elem)}
                    path={polylinePath[index]}
                    options={{
                      strokeColor: polylineColor[index],
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: polylineColor[index],
                      fillOpacity: 0.35,
                      clickable: false,
                      draggable: false,
                      editable: false,
                      visible: true,
                      icons: [
                        {
                          icon: {
                            path: 'M -3,0 3,0 0,-5 z',
                            strokeColor: polylineColor[index],
                            fillColor: polylineColor[index],
                            fillOpacity: 1,
                          },
                          offset: '97%',
                        },
                        {
                          icon: {
                            path: 'M -3,0 3,0 0,-5 z',
                            strokeColor: polylineColor[index],
                            fillColor: polylineColor[index],
                            fillOpacity: 1,
                          },
                          offset: '25%',
                        },
                        {
                          icon: {
                            path: 'M -3,0 3,0 0,-5 z',
                            strokeColor: polylineColor[index],
                            fillColor: polylineColor[index],
                            fillOpacity: 1,
                          },
                          offset: '50%',
                        },
                        {
                          icon: {
                            path: 'M -3,0 3,0 0,-5 z',
                            strokeColor: polylineColor[index],
                            fillColor: polylineColor[index],
                            fillOpacity: 1,
                          },
                          offset: '75%',
                        },
                      ],
                      radius: 30000,
                    }}
                  />
                ))}

                <></>
              </GoogleMap>
            </LoadScript>
          </div>
          {/* right side */}
          <div>
            <div
              style={{
                margin: 'auto',
                height: '30px',
                width: '200px',
                backgroundColor: 'white',
                borderRadius: '10px',
                textAlign: 'right',

                marginBottom: '5px',
                // paddingBottom: '10px',
              }}
            >
              <img style={{ width: '20px' }} src="/img/arrow1.png" />
              &nbsp;&nbsp;각 구간 네비&nbsp;&nbsp;&nbsp;
            </div>
            <div
              className="scrollright"
              style={{
                border: '1px solid gr',
                // backgroundColor: 'white',
                borderRadius: '10px',
                width: '200px',
                height: '565px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '200px',
                  height: '570px',
                  // border: '2px solid yellow',
                }}
              >
                {forTextDays.map((day, index) => (
                  <div
                    style={{
                      // border: '1px solid gray',
                      borderRadius: '10px',
                      backgroundColor: 'white',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '18px',
                        margin: '5px 5px 5px 5px',
                      }}
                      ref={(elem) => (titleRef.current[index] = elem)}
                      key={index + 30000}
                    >
                      &nbsp;{index + 1}일차 일정
                    </div>
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginLeft: '10px',
                      }}
                      ref={(elem) => (textRef.current[index] = elem)}
                      key={index}
                    >
                      {/* <br key={index + 500} /> */}
                      {day.map((location, innerindex) => (
                        <div
                          style={{ display: 'flex' }}
                          key={innerindex + 1000}
                        >
                          {' '}
                          <div style={{ display: 'flex' }}>
                            <div style={{}}>{location.name}</div>
                            <a
                              style={{ textDecoration: 'none' }}
                              key={innerindex + 1500}
                              href={
                                'https://map.kakao.com/?sX=' +
                                daysList[index][innerindex].wcx +
                                '&sY=' +
                                daysList[index][innerindex].wcy +
                                '&sName=' +
                                daysList[index][innerindex].name +
                                '&eX=' +
                                daysList[index][innerindex + 1].wcx +
                                '&eY=' +
                                daysList[index][innerindex + 1].wcy +
                                '&eName=' +
                                daysList[index][innerindex + 1].name
                              }
                              // href={'https://naver.com'}
                              target="blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                style={{ width: '20px', marginBottom: '3px' }}
                                src="/img/arrow1.png"
                              />
                            </a>
                          </div>
                        </div>
                      ))}
                      <div style={{ marginBottom: '10px' }}>
                        {daysList[index][daysList[index].length - 1].name}
                      </div>
                      {/* <br key={index + 2000} /> */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* <button
            onClick={(e) => {
              e.preventDefault();
              // setCenter({ lat: 37.55477842, lng: 126.9705761 });
              console.log(daysList);
              console.log(forTextDays);
              // console.log(markerPathMinus);
            }}
          >
            테스트버튼
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WgResult;
