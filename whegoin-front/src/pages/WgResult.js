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
  // const [markerPathMinus, setmarkerPathMinus] = useState([]);
  const polylineRef = useRef([]);
  const markerRef = useRef([]);
  const textRef = useRef([]);
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
        }
        textRef.current[number].style.display = 'inline-block';
        polylineRef.current[number].state.polyline.setVisible(true);
      }, 0);
    }

    if (number === -1) {
      setCenter({ lat: daysList[0][0].lat, lng: daysList[0][0].lng });
      setTimeout(() => {
        for (let i = 0; i < polylineRef.current.length; i++) {
          polylineRef.current[i].state.polyline.setVisible(true);
          textRef.current[i].style.display = 'inline-block';
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

  const dataSave = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:8080/planSave?dataKr=${hypenString}&city=${city}&title=${inputTitle}&userid=${localStorage.getItem(
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
  };
  console.log('daysList', daysList);
  return (
    <>
      <ScrollTop />
      <div style={{ marginTop: 70 }}> </div>

      <div
        style={{
          width: '1000px',
          height: '800px',
          border: '2px solid red',
          display: 'inline-flex',
          textAlign: 'center',
        }}
      >
        <div
          style={{ width: '200px', height: '800px', border: '2px solid green' }}
        >
          {/* 여기 문제라는데 /  */}
          {daysList.map((day, index) => (
            <button onClick={(e) => showPlan(e, index)} key={index + 3000}>
              {index + 1}일차 일정보기
              <br />
            </button>
          ))}
          <button onClick={(e) => showPlan(e, -1)}>전체 일정보기</button>
          <br />
          <div>
            <input
              onChange={(e) => {
                titleValue(e);
              }}
              placeholder="제목을 넣어주세요"
              value={inputTitle}
              size={10}
            />
            <button
              onClick={(e) => {
                dataSave(e);
              }}
            >
              일정 저장하기
            </button>
          </div>
          왼쪽부분
        </div>
        <div
          style={{
            width: '600px',
            height: '800px',
            border: '2px solid orange',
          }}
        >
          <LoadScript googleMapsApiKey="apikey">
            <GoogleMap
              mapContainerStyle={{ width: '600px', height: '800px' }}
              center={center}
              zoom={13}
            >
              {daysList.map((day, index) => (
                <span key={index + 1000}>
                  {
                    day.map((location, innerIndex) => (
                      <span key={innerIndex + 100}>
                        <Marker
                          icon={
                            'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                          }
                          position={{ lat: location.lat, lng: location.lng }}
                          label={{
                            text: location.name,
                            fontSize: '16px',
                            fontWeight: 'bold',
                          }}
                          ref={(elem) =>
                            (markerRef.current[index * 10 + innerIndex] = elem)
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
          지도 넣을 부분
        </div>
        <div
          style={{
            width: '200px',
            height: '800px',
            border: '2px solid yellow',
          }}
        >
          {forTextDays.map((day, index) => (
            <span ref={(elem) => (textRef.current[index] = elem)} key={index}>
              {index + 1}일차 리스트입니다
              <br key={index + 500} />
              {day.map((location, innerindex) => (
                <span key={innerindex + 1000}>
                  {location.name}

                  <a
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
                    화살표
                  </a>
                </span>
              ))}
              {daysList[index][daysList[index].length - 1].name}
              <br key={index + 2000} />
            </span>
          ))}
          오른쪽{' '}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            // setCenter({ lat: 37.55477842, lng: 126.9705761 });
            console.log(daysList);
            console.log(forTextDays);
            // console.log(markerPathMinus);
          }}
        >
          테스트버튼
        </button>
      </div>
    </>
  );
};

export default WgResult;
