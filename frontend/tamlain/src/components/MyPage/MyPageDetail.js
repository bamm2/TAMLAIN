import * as S from "./MyPageDetail.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getScheduleDetail } from "../../utils/api/historyApi";
import Frame from "./../../UI/Frame/Frame";
import { useState } from "react";

const MyPageDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // axios 쏴줄 스케줄 id
  const scheduleId = location.state;
  const key = localStorage.getItem("token");

  const [mypageCommonInfo, setMypageCommonInfo] = useState({
    title: "",
    startDate: "",
    endDate: "",
    period: "",
  });

  console.log(scheduleId);

  useEffect(() => {
    let mypageInfo = {};
    getScheduleDetail(key, scheduleId).then((res) => {
      console.log(res);
      mypageInfo = {
        title: res.data.data.mypageCommonInfo.name,
        startDate: res.data.data.mypageCommonInfo.startDate.replaceAll(
          "-",
          "."
        ),
        endDate: res.data.data.mypageCommonInfo.endDate.replaceAll("-", "."),
        period:
          res.data.data.mypageCommonInfo.period -
          1 +
          "박 " +
          res.data.data.mypageCommonInfo.period +
          "일",
      };
      setMypageCommonInfo(mypageInfo);
    });
  }, []);

  // 뒤로 가기 버튼
  const redirectPage = () => {
    navigate("/history");
  };

  // 타이틀 수정 버튼
  const updateTitle = () => {};

  return (
    <>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>
      <Frame />
      <S.Container>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={redirectPage}
        />
        <S.FlexBox>
          <S.TextOne>{mypageCommonInfo.title}</S.TextOne>
          <S.TitleUpdateImg
            src={`${process.env.PUBLIC_URL}/assets/Icon/Pencil.png`}
            onClick={updateTitle}
          ></S.TitleUpdateImg>
        </S.FlexBox>
        <S.FlexBox>
          <S.TextTwo>
            {mypageCommonInfo.startDate} ~ {mypageCommonInfo.endDate}
          </S.TextTwo>
          <S.TextThree>{mypageCommonInfo.period}</S.TextThree>
        </S.FlexBox>
      </S.Container>
    </>
  );
};

export default MyPageDetail;
