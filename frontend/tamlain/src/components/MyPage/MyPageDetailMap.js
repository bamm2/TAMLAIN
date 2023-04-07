import { useEffect, useState, useRef } from "react";
import $ from "jquery";
import * as S from "./MyPageDetilMap.styled";
import { motion } from "framer-motion";
import { getScheduleDetail } from "../../utils/api/historyApi";
/*global kakao*/

const { kakao } = window;
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const MyPageDetilMap = () => {
  var idx = window.location.href.substring(
    String(window.location.href).length - 1
  );

  const isMounted = useRef(false);

  const [select, setSelect] = useState(() => {
    return JSON.parse(localStorage.getItem(`marker${idx}`)) || [];
  });
  const [select2, setSelect2] = useState([]);
  const [map, setMap] = useState([]);
  const [flag, setFlag] = useState(true);
  console.log(JSON.parse(localStorage.getItem("scheduleDetailItemMap")));
  const [detailData, setDetailData] = useState(() => {
    return JSON.parse(localStorage.getItem("scheduleDetailItemMap")) || [];
  });
  console.log(detailData);
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [setting, setSetting] = useState({ mapInfo: "" });
  var count;
  var divnum;
  var divtitle;
  const scheduleId = localStorage.getItem("scheduleId");
  const token = localStorage.getItem("token");
  //1. 최초렌더링시 실행되는 useEffect()
  getScheduleDetail(token, scheduleId).then((res) => {
    console.log(res);
    localStorage.setItem(
      "scheduleDetailItemMap",
      JSON.stringify(Object.values(res.data.data.scheduleDetailItemMap))
    );
  });
  useEffect(() => {
    getScheduleDetail(token, scheduleId).then((res) => {
      console.log(res);
      localStorage.setItem(
        "scheduleDetailItemMap",
        JSON.stringify(Object.values(res.data.data.scheduleDetailItemMap))
      );
    });
    var data = JSON.parse(localStorage.getItem("scheduleDetailItemMap"));
    setDetailData(data);
    const radioBtns = document.querySelectorAll(".radio-btn label");
    if (radioBtns === undefined) return;
    for (let i = 0; i < radioBtns.length; i++) {
      radioBtns[i].style.display = "block";
    }
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.374301889561444, 126.56642690880963), // 지도의 중심좌표
        level: 10, // 지도의 확대 레벨
      };
    var map1 = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    setMap(map1);
    var arr = [];
    if (data[idx - 1] !== undefined) {
      for (let i = 0; i < data[idx - 1].length; i++) {
        arr.push(data[idx - 1][i].mapInfo);
      }
      setSelect(arr);
    }
    setKeys(JSON.parse(localStorage.getItem("keys")));
    setValues(JSON.parse(localStorage.getItem("values")));
  }, []);

  //2. JSX 코드 상에서 최신화된 select 배열이 감지될때 실행되는 useEffect
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.374301889561444, 126.56642690880963), // 지도의 중심좌표
        level: 10, // 지도의 확대 레벨
      };

    var map1 = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    localStorage.setItem(`marker${idx}`, JSON.stringify(select));
    setMap(map1);
    setSelect2(JSON.parse(localStorage.getItem(`marker${idx}`)));
  }, [select]);

  //3. 2에서 최신화된 select2 배열이 감지될때 실행되는 useEffect
  useEffect(() => {
    var imageSrc = `${process.env.PUBLIC_URL}/assets/Icon/marker.png`; // 마커이미지의 주소입니다
    var imageSize = new kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    if (isMounted.current) {
      // localStorage.setItem("marker", JSON.stringify(select2));
      // console.log(select);
      // console.log(select2);
      $("#tagArea").empty();
      //for문 끝나고 선 표시하기 위해 저장할 좌표배열
      var linePath = [];
      //지도 범위 재설정 객체생성
      var bounds = new kakao.maps.LatLngBounds();
      //div태그 카운트
      count = 1;
      for (let i = 0; i < select2.length; i++) {
        //해당 부분 최신화가 되지 않음
        var latlng = select2[i].latlng;
        // const xy = latlng.toString().split(",");
        var x = latlng.La;
        var y = latlng.Ma;

        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(x, y),
          image: markerImage,
          title: select2[i].title,
        });
        marker.setMap(map);

        var moveLatLon = new kakao.maps.LatLng(x, y);

        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        map.panTo(moveLatLon);

        //생성순서(커스텀 오버레이)
        var content = `<div class ="label" style="margin-bottom:70px;margin-right:10px;"><span class="left"></span><span id="center" class="center" style="color:#fc872a;font-weight:bold;font-size:20px;">${
          i + 1
        }</span><span class="right"></span></div>`;
        var customOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(x, y),
          content: content,
        });
        createDiv(select2[i].title);
        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
        //선 좌표 저장
        linePath.push(new kakao.maps.LatLng(x, y));

        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
        var iwContent = `<div style="padding:5px;">${select2[i].title}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
        });

        //지도 범위 재설정 위해 좌표 추가
        bounds.extend(new kakao.maps.LatLng(x, y));
      }
      //지도에 선 표시
      // 지도에 표시할 선을 생성합니다
      var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 2, // 선의 두께 입니다
        strokeColor: "#191919", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dashed", // 선의 스타일입니다
      });

      // 지도에 선을 표시합니다
      polyline.setMap(map);

      // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
      // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
      if (select2.length === 0) {
        return;
      }
      map.setBounds(bounds);
    } else {
      isMounted.current = true;
      // 리렌더링 했을때 로컬스토리지의 값을 select배열로 최신화
      // setSelect(JSON.parse(localStorage.getItem("marker")));
    }
  }, [select2]);

  //동적으로 div 생성
  const createDiv = (title) => {
    let titleTmp = title;
    if (title.length > 6) {
      titleTmp = title.substring(0, 6);
    }
    let tagArea = document.getElementById("tagArea");
    divnum = document.createElement("div");
    divtitle = document.createElement("div");

    divnum.setAttribute("class", "divNum");
    divnum.innerHTML = count;
    tagArea.appendChild(divnum);

    divnum.style.color = "#fff";
    divnum.style.width = "30px";
    divnum.style.height = "30px";
    divnum.style.marginRight = "5px";
    divnum.style.textAlign = "center";
    divnum.style.display = "flex";
    divnum.style.justifyContent = "center";
    divnum.style.alignItems = "center";
    divnum.style.color = "#fff";
    divnum.style.fontSize = "bold";
    divnum.style.borderRadius = "50px";
    divnum.style.backgroundColor = "#fc872a";
    divnum.style.float = "left";

    divtitle.setAttribute("id", `divTitle${count}`);
    divtitle.setAttribute("class", "divTitle");
    divtitle.setAttribute("value", title);
    divtitle.innerHTML = titleTmp;
    tagArea.appendChild(divtitle);
    divtitle.style.color = "#fff";
    divtitle.style.width = "100px";
    divtitle.style.height = "30px";
    divtitle.style.textAlign = "center";
    divtitle.style.display = "flex";
    divtitle.style.justifyContent = "center";
    divtitle.style.alignItems = "center";
    divtitle.style.fontSize = "bold";
    divtitle.style.borderRadius = "5px";
    divtitle.style.backgroundColor = "#fc872a";
    divtitle.style.marginBottom = "12px";
    divtitle.style.pointerEvents = "auto";
    divtitle.style.cursor = "pointer";

    count++;
    const element = document.querySelectorAll(".divTitle");

    for (let i = 0; i < element.length; i++) {
      element[i].addEventListener("click", function (e) {
        viewPlace(e, count - 1);
      });
    }
  };

  //일정표에서 직접 누르면 삭제하는 기능
  const viewPlace = (e, cnt) => {
    const title = e.target.getAttribute("value");
    const data = detailData[idx - 1];
    for (let i = 0; i < data.length; i++) {
      if (data[i].mapInfo.title === title) {
        setSetting(data[i]);
      }
    }
  };

  const checkSelect = (t) => {
    for (let i = 0; i < select.length; i++) {
      if (select[i].title == t) {
        return false;
      }
    }
    return true;
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div
        id="map"
        style={{
          float: "left",
          width: "80%",
          height: "350px",
          marginTop: "29%",
        }}
      ></div>
      {(JSON.parse(localStorage.getItem(`marker${idx}`)) === null ||
        JSON.parse(localStorage.getItem(`marker${idx}`)).length === 0) && (
        <S.Div>
          <S.EmptySpace>아직 등록된 장소가 없습니다.</S.EmptySpace>
        </S.Div>
      )}
      {JSON.parse(localStorage.getItem(`marker${idx}`)) !== null &&
        JSON.parse(localStorage.getItem(`marker${idx}`)).length !== 0 && (
          <S.Div>
            <div
              style={{
                width: "3px",
                height: "100vh",
                marginLeft: "15%",
                backgroundColor: "#fc872a",
              }}
            ></div>
            <div
              id="tagArea"
              style={{
                position: "absolute",
                zIndex: "999",
                top: "5%",
                right: "5%",
                marginBottom: "5px",
              }}
            ></div>
          </S.Div>
        )}
      <p>&nbsp;</p>

      <S.TitleDiv>
        <S.Number>{setting.mapInfo.title} </S.Number>
        <S.Tag>{setting.tag}</S.Tag>
      </S.TitleDiv>
      <S.Hr />
      {setting.imageUrl === "" && (
        <S.Banner
          src={`${process.env.PUBLIC_URL}/assets/Background/EmptyBanner.png`}
          alt="배너이미지"
        />
      )}
      {setting.imageUrl !== "" && (
        <S.Banner src={`https://${setting.imageUrl}`} alt="배너이미지" />
      )}
      <S.AddressDiv>{setting.roadAddress}</S.AddressDiv>
      <S.DetailDiv>
        <S.DetailA href={setting.placeUrl} target="_blank">
          {" "}
          상세정보
        </S.DetailA>
      </S.DetailDiv>
      <S.Rating id="second">
        <S.CircleTitle>평점</S.CircleTitle>
        <figure className="donut-graph">
          <svg
            class="moving-outline"
            width="170"
            height="170"
            viewBox="0 0 453 453"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="226.5"
              cy="226.5"
              r="216.5"
              stroke="#FC872A"
              stroke-width="10"
            />
          </svg>
          <figcaption className="donut-graph_caption">
            <span className="donut-graph_caption-value">
              {setting.reviewScore}
            </span>
          </figcaption>
        </figure>
      </S.Rating>
      <S.ReviewCnt id="third">
        <S.CircleTitle>평점 수</S.CircleTitle>
        <figure className="donut-graph">
          <svg
            class="moving-outline"
            width="170"
            height="170"
            viewBox="0 0 453 453"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="226.5"
              cy="226.5"
              r="216.5"
              stroke="#FC872A"
              stroke-width="10"
            />
          </svg>
          <figcaption className="donut-graph_caption">
            <span className="donut-graph_caption-value">
              {setting.reviewCount}
            </span>
          </figcaption>
        </figure>
      </S.ReviewCnt>
    </motion.div>
  );
};
export default MyPageDetilMap;
