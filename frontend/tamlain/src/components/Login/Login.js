import React from "react";
import * as S from "./Login.styled";
import { Link } from "react-router-dom";
import { KAKAO_AUTH_URL } from "./OAuth";

const Login = () => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <S.Container>
      <S.Filter />
      {/* <S.goBack>
        <Link to="/">메인페이지</Link>
      </S.goBack> */}
      <S.KakaoBtnContainer onClick={kakaoLogin}>
        <S.KakaoImg src="./assets/Icon/kakao_login_medium_wide.png" />
      </S.KakaoBtnContainer>
    </S.Container>
  );
};

export default Login;
