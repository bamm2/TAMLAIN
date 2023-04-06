import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingLogin from "../../UI/Loading/LoadingLogin";

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const backUri = process.env.REACT_APP_SERVER_URI;
  console.log(backUri);
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  useEffect(() => {
    const loadData = async () => {
      await axios({
        method: "GET",
        url: `http://localhost:8080/oauth/callback/kakao?code=${code}`,
        // url: `${backUri}/api/oauth/callback/kakao?code=${code}`,
      })
        .then((res) => {
          console.log(backUri);
          console.log(res); // 토큰이 넘어올 것임

          const ACCESS_TOKEN = res.data.accessToken;
          const USER_ID = res.data.id;
          const USER_NAME = res.data.name;

          localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
          localStorage.setItem("id", USER_ID);
          localStorage.setItem("name", USER_NAME);
          navigate("/", { replace: true }); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        })
        .catch((err) => {
          window.alert("로그인에 실패하였습니다.");
          navigate("/login", { replace: true }); // 로그인 실패하면 로그인화면으로 돌려보냄
        });
    };
    loadData();
  }, []);

  return (
    <>
      <LoadingLogin></LoadingLogin>
    </>
  );
};

export default OAuthRedirectPage;
