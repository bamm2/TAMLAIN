import React from "react";
import * as S from "./Login.styled";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "./OAuth";

const Login = () => {
  const navigate = useNavigate();

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const redirectMainPage = () => {
    navigate("/");
  };

  return (
    <S.Container>
      <S.Filter />
      <S.Logo
        src={`${process.env.PUBLIC_URL}/assets/MainLogo.png`}
        onClick={redirectMainPage}
      />
      <S.KakaoBtnContainer onClick={kakaoLogin}>
        <S.KakaoImg
          src={`${process.env.PUBLIC_URL}/assets/Icon/kakao_login_medium_wide.png`}
        />
      </S.KakaoBtnContainer>
    </S.Container>
  );
};

export default Login;
