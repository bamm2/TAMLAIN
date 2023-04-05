import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./MyPageStarMain.styled";
import { useEffect, useState } from "react";
import { getReviewScheduleHistory } from "../../../utils/api/reviewApi";
import MyPageStarInfo from "./MyPageStarInfo";
import Frame from "../../../UI/Frame/Frame";

const MyPageStarMain = () => {
  const key = localStorage.getItem("token");
  const location = useLocation();
  const scheduleId = location.state;
  console.log(scheduleId);
  // axios 로  데이터 받아와서 상단에 일정 타이틀들 뿌려주고
  //  props로 장소 이미지랑 이름 뿌려주기
  useEffect(() => {
    getReviewScheduleHistory(key, scheduleId).then((res) => {
      console.log(res);
      let info = {
        title: res.data.data.mypageCommonInfo.name,
        thumbnailImageUrl: res.data.data.mypageCommonInfo.thumbnailImageUrl,
        period:
          res.data.data.mypageCommonInfo.period -
          1 +
          "박 " +
          res.data.data.mypageCommonInfo.period +
          "일",
        startDate: res.data.data.mypageCommonInfo.startDate.replaceAll(
          "-",
          "."
        ),
        endDate: res.data.data.mypageCommonInfo.endDate.replaceAll("-", "."),
      };

      let arr = [{}];
      // 장소 배열
      const size = res.data.data.reviewScheduleItemList.length;

      for (let i = 0; i < size; i++) {
        let data = res.data.data.reviewScheduleItemList[i];
        arr[i] = {
          jejuPlaceId: data.jejuPlaceId,
          jejuPlaceImgUrl: data.jejuPlaceImgUrl,
          jejuPlaceName: data.jejuPlaceName,
          scheduleItemId: data.scheduleItemId,
        };
      }

      setSchedulPlaceInfo(arr);
      setScheduleInfo(info);
    });
    // return;
  }, []);
  const navigate = useNavigate();

  const reDirectMyPage = () => {
    navigate("/history");
  };

  // 일정 정보
  const [scheduleInfo, setScheduleInfo] = useState({
    title: "",
    endDate: "",
    startDate: "",
    period: "",
    thumbnailImageUrl: "",
  });

  // 일정 세부 정보 -> outlet에 context로 넘겨주기
  const [schedulePlaceInfo, setSchedulPlaceInfo] = useState({
    jejuPlaceId: 0,
    jejuPlaceImgUrl: "",
    jejuPlaceName: "",
    scheduleItemId: 0,
  });

  console.log(schedulePlaceInfo);

  return (
    <>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>

      <S.Container>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={reDirectMyPage}
        />
        <S.Img src={scheduleInfo.thumbnailImageUrl}></S.Img>
        <S.TextContainer>
          <S.TextOne>{scheduleInfo.title}</S.TextOne>
          <S.TextTwo>
            {scheduleInfo.startDate} ~ {scheduleInfo.endDate}
          </S.TextTwo>
          <S.TextThree>{scheduleInfo.period}</S.TextThree>
        </S.TextContainer>
      </S.Container>

      <Frame />

      <S.Hr />

      <MyPageStarInfo schedulePlaceInfo={schedulePlaceInfo}></MyPageStarInfo>
    </>
  );
};

export default MyPageStarMain;
