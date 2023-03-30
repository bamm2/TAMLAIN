import * as S from "./Navbar.styled";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/KakaoLogin";
import { useEffect } from "react";

const Navbar = (props) => {
  const key = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.login.isAuthenticated);

  // useEffect({
  //   if()
  // }, []);

  const mainpageHandler = () => {
    navigate("/main");
  };

  const loginHandler = () => {
    dispatch(loginActions.toggleLogin);
    navigate("/login");
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    dispatch(loginActions.toggleLogin);
    navigate("/main");
  };
  const mypageHandler = () => {
    navigate("/mypage");
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
              </>
            )}
            {!isAuth && (
              <S.RightItem onClick={loginHandler}>로그인</S.RightItem>
            )}
            <S.ExitLogoImg
              src={`${process.env.PUBLIC_URL}/assets/Icon/ExitLogo.png`}
              alt="logIn/Out 로고"
              onClick={loginHandler}
            ></S.ExitLogoImg>
          </S.RightContainer>
        </S.NavContainer>
      </S.NavFrame>
      <Outlet />
    </>
  );
};

export default Navbar;
