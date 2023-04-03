import { Outlet, useNavigate,useLocation } from "react-router-dom";
import * as S from "./MyPageStarMain.styled";
import { useEffect } from "react";
import { getReviewScheduleHistory } from "../../../utils/api/reviewApi";


const MyPageStarMain = () => {

  const key = localStorage.getItem("token");
  const location = useLocation();
  const scheduleId = location.state;
  console.log(scheduleId);
  // axios 로  데이터 받아와서 상단에 일정 타이틀들 뿌려주고
  //  props로 장소 이미지랑 이름 뿌려주기 
  useEffect(() => {
    getReviewScheduleHistory(key, scheduleId).then(res => console.log(res));
    return;
  }, []);
  
  const navigate = useNavigate();

  const reDirectMyPage = () => {
    navigate("/history");
  }

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
      <S.Img src={`${process.env.PUBLIC_URL}/assets/Background/mainCarousel_2.jpg`}></S.Img>
        <S.TextContainer>
          <S.TextOne>제주 먹방 다뿌셔</S.TextOne>
          <S.TextTwo>20200202 ~ 20200303</S.TextTwo>
          <S.TextThree>4박 5일</S.TextThree>
        </S.TextContainer>
    </S.Container>  
    
    <S.Hr />
      
    <Outlet />
  </>);
};

export default MyPageStarMain;
