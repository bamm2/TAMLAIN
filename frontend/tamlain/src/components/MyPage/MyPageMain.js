import * as S from "./MyPageMain.styled";
import { Outlet, Link } from "react-router-dom";

const MyPageMain = () => {
  return (
    <div>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>
      <div>
        <S.TitleDiv>
          🍊 김승완<span style={{ color: "#fc872a" }}>님의 제주여행</span>
        </S.TitleDiv>
        <S.UnderBar />
        <Link to="/main">
          <S.BackBtn
            src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
            alt="뒤로가기"
          />
        </Link>
      </div>
      {/* <hr style={{ position: "absolute" }} /> */}
      <Outlet />
    </div>
  );
};

export default MyPageMain;
