import * as S from "./MainCarouselItem.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

// 캐러셀 요소 컴포넌트
const MainCarouselItem = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 체크 후 이동
  // if (token === null) {
  //   setIsLogin(true);
  // } else {
  //   setIsLogin(false);
  // }

  // useEffect({}, []);

  return (
    <S.Container>
      <S.Filter />
      <S.Wrap>
        <S.Img src={props.image}></S.Img>
        {/* <S.Text1> 나를 아는 여행 플랫폼</S.Text1>
        <S.Text2> 탐라:인</S.Text2>
        <S.MainBtn> 여행하기 </S.MainBtn> */}
      </S.Wrap>
    </S.Container>
  );
};

export default MainCarouselItem;
