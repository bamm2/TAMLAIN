import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import * as S from "./SurveyMain.styled";

const SurveyMain = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/surveyCalendar") {
      setNum(0);
    } else if (location.pathname === "/surveyTheme") {
      setNum(1);
    } else if (location.pathname === "/surveyFood") {
      setNum(2);
    } else if (location.pathname === "/surveyCafe") {
      setNum(3);
    } else if (location.pathname === "/surveyActivity") {
      setNum(4);
    } else if (location.pathname === "/surveySport") {
      setNum(5);
    } else if (location.pathname === "/surveyExhibition") {
      setNum(6);
    } else if (location.pathname === "/surveyRest") {
      setNum(7);
    }
  }, [location]);

  const [num, setNum] = useState(-1);

  const Question = [
    "Q1. 언제 제주에 머무르실 예정인가요?",
    "Q2. 이번 여행 테마를 한줄로 요약한다면?!",
    "Q3. 제주도하면 음식! 꼭 먹고 싶은 음식이 있을까요?",
    "Q4. 여유 속에서 즐기는 카페, 당신의 선택은?",
    "Q5. 액티비티한 일정을 계획한 당신! 제주도에서 꼭 해보고 싶은 액티비티는?",
    "Q6. 제주도를 왔으면 짜릿하게 스포츠 활동을 즐겨야지! 당신이 원하는 스포츠or레저 종류는?",
    "Q7. 여유롭게 실내에서 관광을 하고 싶다..! 어떤 유형의 실내관광지를 가고 싶으신가요?",
    "Q8. 휴양지의 대명사인 제주도! 다음 중 가고 싶은 곳을 선택한다면?",
  ];

  return (
    <div>
      <S.BackGround>
        <S.BackGroundFilter />
        <S.SurveyTitle>{Question[num]}</S.SurveyTitle>
      </S.BackGround>

      <Outlet />
    </div>
  );
};
export default SurveyMain;
