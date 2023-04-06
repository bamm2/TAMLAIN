import * as S from "./MyPageDetail.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getScheduleDetail,
  modifyScheduleName,
} from "../../utils/api/historyApi";
import Frame from "./../../UI/Frame/Frame";
import { useState } from "react";

const MyPageDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // axios 쏴줄 스케줄 id
  const scheduleId = location.state;
  const key = localStorage.getItem("token");

  const [mypageCommonInfo, setMypageCommonInfo] = useState({
    title: "",
    startDate: "",
    endDate: "",
    period: "",
  });

  // 수정 준비 상태
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState("");

  // axios로 데이터 전부 가져오기
  useEffect(() => {
    let mypageInfo = {};
    getScheduleDetail(key, scheduleId).then((res) => {
      console.log(res);

      const data = res.data.data.mypageCommonInfo;

      mypageInfo = {
        title: data.name,
        startDate: data.startDate.replaceAll("-", "."),
        endDate: data.endDate.replaceAll("-", "."),
        period:
          data.period - 1 + "박 " + data.period + "일",
      };
      setMypageCommonInfo(mypageInfo);
      setTitle(data.name);

      // ----- 지도 부분 데이터 가공 ------

      // period로 일차 가져오기
      console.log(res.data.data.mypageCommonInfo.period);
      let day = res.data.data.mypageCommonInfo.period;

      //scheduleDetailItemMap[period]  -> 1~N일차 돌리기
      console.log(
        res.data.data.scheduleDetailItemMap[1].length
      );

      // for (let i = 0; i < day; i++){
      //   let placeCount = res.data.data.scheduleDetailItemMap[i].length;
      //   for (let j = 0; j < placeCount; j++){

      //   }
      // }

      //res.data.data.scheduleDetailItemMap[1].length -> 일차별 장소개수
      //res.data.data.scheduleDetailItemMap[1][0~개수] -> 장소개수만큼 돌리기
      //res.data.data.scheduleDetailItemMap[][].mapInfo.title -> 장소명

      // console.log(res.data.data.scheduleDetailItemMap[1][0].mapInfo.title);
    });
  }, []);

  // 뒤로 가기 버튼
  const redirectPage = () => {
    navigate("/history");
  };

  // 타이틀 수정 버튼
  const updateTitle = () => {
    setIsUpdate((cur) => !cur);

    if (isUpdate) {
      const token = localStorage.getItem("token");

      const data = {
        name: title,
        scheduleId: scheduleId,
      };

      if (data.name.length === 0) {
        alert("일정명은 1자 이상 20자 이하입니다.");
        setIsUpdate(true);
        return;
      } else {
        modifyScheduleName(token, data).then((res) => {
          console.log(res);
        });
        alert("수정 완료되었습니다.");
      }
    }
  };

  //  -------카카오 지도 -----------
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.510575, 126.491139),
      level: 6,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  const onChangeTitle = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      // 글자 길이가 20자 이하인 경우에만 처리
      setTitle(inputValue);
    } else {
      alert("일정명은 1자 이상 20자 이하입니다.");
    }
  };

  return (
    <>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>
      <Frame />
      <S.Container>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={redirectPage}
        />
        <S.FlexBox>
          {!isUpdate ? (
            <S.TextOne>
              <input value={title} disabled />
            </S.TextOne>
          ) : (
            <S.TextOne>
              <input
                value={title}
                onChange={onChangeTitle}
              />
            </S.TextOne>
          )}
          {!isUpdate ? (
            <S.TitleUpdateImg
              src={`${process.env.PUBLIC_URL}/assets/Icon/Pencil.png`}
              onClick={updateTitle}
            ></S.TitleUpdateImg>
          ) : (
            <S.TitleUpdateImgReady
              src={`${process.env.PUBLIC_URL}/assets/Icon/Pencil.png`}
              onClick={updateTitle}
            ></S.TitleUpdateImgReady>
          )}
        </S.FlexBox>
        <S.FlexBox>
          <S.TextTwo>
            {mypageCommonInfo.startDate} ~{" "}
            {mypageCommonInfo.endDate}
          </S.TextTwo>
          <S.TextThree>
            {mypageCommonInfo.period}
          </S.TextThree>
        </S.FlexBox>
        {/* ----------- 일정명 , 여행 날짜 -----------  */}

        {/* 지도 시작  */}
        <div> N일차 </div>
        <S.MapContainer>
          <div
            id="map"
            style={{
              float: "left",
              width: "80%",
              height: "350px",
              marginTop: "5%",
            }}
          ></div>

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
                zIndex: "10",
                top: "5%",
                right: "5%",
                marginBottom: "5px",
              }}
            ></div>
          </S.Div>
        </S.MapContainer>
      </S.Container>
    </>
  );
};

export default MyPageDetail;
