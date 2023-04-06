import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./MyPageStarMain.styled";
import { useCallback, useEffect, useState } from "react";
import { getReviewScheduleHistory } from "../../../utils/api/reviewApi";
import MyPageStarInfo from "./MyPageStarInfo";
import Frame from "../../../UI/Frame/Frame";
import { getReview } from "../../../utils/api/reviewApi";

const MyPageStarMain = () => {
  const key = localStorage.getItem("token");
  const scheduleId = localStorage.getItem("scheduleId");

  const [done, setDone] = useState(false);

  console.log(scheduleId);

  //  axios로  데이터 받아와서 상단에 일정 타이틀들 뿌려주고
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

      let chkIdx = JSON.parse(localStorage.getItem("starRegistIdx"));
      let chkBool = JSON.parse(localStorage.getItem("starRegistArr"));
      let length = localStorage.getItem("starRegistSize");

      // console.log("로컬스토리지 별점 확인용" + JSON.stringify(chkIdx));
      // console.log("로컬스토리지 별점 확인용" + JSON.stringify(chkBool));

      console.log(chkIdx);
      console.log(chkBool);
      for (let i = 0; i < length; i++) {
        if (scheduleId == chkIdx[i]) {
          setDone(chkBool[i]);
          console.log("chkIdx : " + chkIdx[i]);
          console.log("chkbool : " + chkBool[i]);
          break;
        }
      }

      // 장소 배열
      const size = res.data.data.reviewScheduleItemList.length;

      localStorage.setItem("size", size);
      for (let i = 0; i < size; i++) {
        let data = res.data.data.reviewScheduleItemList[i];
        localStorage.setItem("placeList" + i, JSON.stringify(data));
      }

      setScheduleInfo(info);
    });
  }, []);

  useEffect(() => {
    // 이미 별점을 매겼을 경우 info에서 axios 쏴주기 + 버튼 비활성화
    if (done) {
      localStorage.setItem("disabledBtn", 1);
    }
  }, [done]);

  const navigate = useNavigate();

  const reDirectMyPage = () => {
    navigate("/history");
    window.location.reload();
    // 별점 체크용 불린 변수 기본값으로
    setDone(false);
  };

  // 일정 정보
  const [scheduleInfo, setScheduleInfo] = useState({
    title: "",
    endDate: "",
    startDate: "",
    period: "",
    thumbnailImageUrl: "",
  });

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

      <MyPageStarInfo></MyPageStarInfo>
    </>
  );
};

export default MyPageStarMain;
