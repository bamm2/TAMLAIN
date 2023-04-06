import React from "react";
import * as S from "./Login.styled";
import { useNavigate } from "react-router-dom";
import { KAKAO_AUTH_URL } from "./OAuth";

const Login = () => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const navigate = useNavigate();
  const reDirectMain = () => {
    navigate('/main');
  }

  return (
    <S.Container>
      <S.Filter />
      <S.Img src={`${process.env.PUBLIC_URL}/assets/MainLogo.png`} onClick={reDirectMain}>
      </S.Img>
      <S.KakaoBtnContainer onClick={kakaoLogin}>
        <S.KakaoImg
          src={`${process.env.PUBLIC_URL}/assets/Icon/kakao_login_medium_wide.png`}
        />
      </S.KakaoBtnContainer>
    </S.Container>
  );
};

export default Login;
