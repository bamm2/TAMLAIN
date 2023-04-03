import * as S from "./Navbar.styled";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../utils/api/oauthApi";

const Navbar = (props) => {
  const key = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  //  키 값 확인 후 로그인 , 로그아웃 처리 
  useEffect(() => {
    if (key !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [key]);

  //  메인 페이지로 이동 
  const mainpageHandler = () => {
    navigate("/main");
  };

  //  로그인 페이지로 이동 
  const loginHandler = () => {
    navigate("/login");
  };

  //  로그아웃 
  const logoutHandler = () => {
    console.log("로그아웃 버튼 클릭");
    navigate("/main");
    logout(key).then((res) => {
      console.log(res);
    });
    window.localStorage.clear();
    window.location.reload();
  };

  //  마이페이지로 이동 
  const mypageHandler = () => {
    navigate("/redirectMyPage");
  };

  return (
    <>
      <S.NavFrame>
        <S.NavContainer>
          <S.MainLogoImg
            src={`${process.env.PUBLIC_URL}/assets/MainLogo.png`}
            alt=" 메인 로고 "
            onClick={mainpageHandler}
          />
          <S.RightContainer>
            {isAuth && (
              <>
                <S.RightItem onClick={mypageHandler}>마이페이지</S.RightItem>
                <S.RightItem> | </S.RightItem>
                <S.RightItem onClick={logoutHandler}>로그아웃</S.RightItem>
                <S.ExitLogoImg
                    src={`${process.env.PUBLIC_URL}/assets/Icon/ExitLogo.png`}
                    alt="logIn/Out 로고"
                    onClick={logoutHandler}
                  ></S.ExitLogoImg>
              </>
            )}
            {!isAuth && (
              <>
                <S.RightItem onClick={loginHandler}>로그인</S.RightItem>
                
                <S.ExitLogoImg
                  src={`${process.env.PUBLIC_URL}/assets/Icon/ExitLogo.png`}
                  alt="logIn/Out 로고"
                  onClick={loginHandler}
                    ></S.ExitLogoImg>
                </>
            )}
          </S.RightContainer>
        </S.NavContainer>
      </S.NavFrame>
      <Outlet />
    </>
  );
};

export default Navbar;
