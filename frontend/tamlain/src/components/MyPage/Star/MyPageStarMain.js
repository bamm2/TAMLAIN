import { useNavigate} from "react-router-dom";
import * as S from "./MyPageStarMain.styled";
import { useEffect, useState } from "react";
import { getReviewScheduleHistory } from "../../../utils/api/reviewApi";
import MyPageStarInfo from "./MyPageStarInfo";
import Frame from "../../../UI/Frame/Frame";
import { getReview } from "../../../utils/api/reviewApi";

const MyPageStarMain = () => {
  const key = localStorage.getItem("token");
  const scheduleId = localStorage.getItem("scheduleId");

  const [done, setDone] = useState(false);

  //  axios로  데이터 받아와서 상단에 일정 타이틀들 뿌려주고
  //  props로 장소 이미지랑 이름 뿌려주기
  useEffect(() => {
    // 일정에 대한 상세 장소 가져오기 
    getReviewScheduleHistory(key, scheduleId).then((res) => {
      // 일정 상단 제목 및 사진 준비 
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

      // 별점 몇번째 인덱스가 무슨 스케줄 id 인지 
      let chkIdx = JSON.parse(localStorage.getItem("starRegistIdx"));
      // 별점 몇번째 인덱스가 true ,false 인지  
      let chkBool = JSON.parse(localStorage.getItem("starRegistArr"));
      //  일정의 개수 가져오기 
      let length = localStorage.getItem("starRegistSize");

      // 일정의 개수 만큼 돌리면서 
      for (let i = 0; i < length; i++) {
        // 스케줄id와 인덱스 i번째 스케줄 id가 같을 경우 
        if (scheduleId == chkIdx[i]) {
          // boolean 값 변경  
          setDone(chkBool[i]);
          break;
        }
      }

      // 장소 배열
      const size = res.data.data.reviewScheduleItemList.length;

      // 장소 배열의 크기 
      localStorage.setItem("size", size);

      
      for (let i = 0; i < size; i++) {
        let data = res.data.data.reviewScheduleItemList[i];
        // 장소의 데이터 인덱스 순서대로 넣어주기 
        localStorage.setItem("placeList" + i, JSON.stringify(data));
      }

      // 일정에 대한 장소데이터 넣어주기 
      setScheduleInfo(info);
    });
  }, []);

  console.log(done);

  useEffect(() => {
  // 이미 별점을 매겼을 경우 info에서 axios 쏴주기 + 버튼 비활성화
    if (done) {
      localStorage.setItem("disabledBtn", 1);
    }
  }, [done]);

  const navigate = useNavigate();

  // 일정 불러오는 메인페이지로 이동하기  
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
