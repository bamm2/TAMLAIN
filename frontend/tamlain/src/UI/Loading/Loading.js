import * as S from "./Loading.styled";
import "./Loading.css";
import { useEffect, useState } from "react";

const Loading = () => {
  const [Tip, setTip] = useState("");

  const tipData = [
    "항공권을 예약할 때는 쿠키삭제를 하고, 화요일에 출발하면 저렴하게 구매할 수 있어요!",
    "여행일정이 짧을 때는, 전체보다는 일부분을 깊게 관광하는 것이 더 효율적일 수 있어요!",
    "제주시와 서귀포시를 연결하는 5.16 도로는 가급적이면 피하시는게 좋아요! 길이 꼬불꼬불하고 험하답니다:)",
    "4월 말~5월 초는 가파도의 청보리가 가장 예쁠때! 가파도에 가서 인생사진을 찍어보시는건 어떨까요?",
    "제주는 기후가 자주 변하는 지역이에요! 따라서 실내 단위 여행을 하루정도 임시로 기획해보는 것도 좋답니다:)",
    "항공권을 예약할때는 항공권 최저가 사이트에서 가격조회만 하고, 실제 구매는 해당 항공사 홈페이지에서 하면 조금 더 저렴한 항공권을 구매할 수 있어요!",
    "차를 선적하는것과 렌터카를 빌리는 것은 시기마다 효율이 다르기 때문에, 여행시기에 맞춰 이를 잘 알아보세요!",
    "자연관광을 위주로 한다면 동쪽을, 트렌디한 감성을 원한다면 서쪽을 여행하시는 걸 추천해요!",
    "렌트카를 예약할때에는 소셜커머스 사이트를 이용하면 상대적으로 저렴하게 예약할 수 있어요!",
    "제주에서의 빨간색 버스는 '급행', 파란색 버스는 '일반(간선)', 녹색 버스는 '읍면(지선)', 노란색 버스는 '관광지 순환'을 의미해요!",
  ];
  useEffect(() => {
    setTip(tipData[Math.floor(Math.random() * 10)]);
  }, []);

  const randomTipData = () => {
    setTip(tipData[Math.floor(Math.random() * 10)]);
  };

  setInterval(randomTipData, 3000);

  setTimeout(function () {
    window.location.href = "http://localhost:3000/login";
  }, 10000);

  return (
    <S.BackGround>
      <S.BackGroundFilter />

      <S.LoadingTitle>회원님을 위한 여행지를 금방 찾아드릴게요!</S.LoadingTitle>
      <div className="white-grad">loading...</div>
      <S.Tip>Tip. {Tip}</S.Tip>
    </S.BackGround>
  );
};
export default Loading;
