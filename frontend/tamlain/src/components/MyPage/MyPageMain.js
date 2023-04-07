import { useState } from "react";
import * as S from "./MyPageMain.styled";
import { Outlet, Link } from "react-router-dom";

const MyPageMain = () => {
  const name = localStorage.getItem("name");

  return (
    <div>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>
      <div>
        <S.TitleDiv>
          🍊 {name}
          <span style={{ color: "#fc872a" }}>님의 제주여행</span>
        </S.TitleDiv>
        <S.Hr />
        <Link to="/main">
          <S.BackBtn
            src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
            alt="뒤로가기"
          />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPageMain;
