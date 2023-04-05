import { useState, useEffect } from "react";
import * as S from "./ScheduleImgContainer.styled";
import { getPlaceDetail } from "../../utils/api/scheduleApi";

const ScheduleImgContainer = (props) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [size, setSize] = useState(props.size);
  const [click, setClick] = useState(false);
  const [flagToggle, setFlagToggle] = useState(false);
  const [info, setInfo] = useState({});
  const [mapInfo, setMapInfo] = useState({});
  useEffect(() => {
    setImgUrl(props.ImgUrl);
  }, [size]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(props.index);
  //   getPlaceDetail(token, props.index).then((res) => {
  //     console.log(res);
  //   });
  // }, [click]);

  const OnClickHandler = () => {
    const token = localStorage.getItem("token");
    getPlaceDetail(token, props.index).then((res) => {
      console.log(res);
      setInfo(res.data.data);
      setMapInfo(res.data.data.mapInfo);
    });
    setClick((click) => !click);
  };
  const FlagHandler = () => {
    if (!flagToggle) {
      props.setFlag(true);
    } else {
      props.setFlag(false);
    }
    setFlagToggle((flagToggle) => !flagToggle);
  };

  // x 버튼 누르면 axios로 수정 요청 보내고 , 다시 1개를 제외한 나머지 배열 그대로 가져온다 .
  return (
    <S.Container>
      <S.ExitButton> X </S.ExitButton>
      <S.Category>category</S.Category>
      {!click && <S.ImgContainer src={imgUrl} onClick={OnClickHandler} />}
      {click && (
        <>
          <S.ReDirectText>
            <S.LinkKakao href={info.placeUrl} target="_blank">
              상세정보
            </S.LinkKakao>
          </S.ReDirectText>
          <S.StarImg
            src={`${process.env.PUBLIC_URL}/assets/Icon/starImg.png`}
          ></S.StarImg>
          <S.StarNum>{info.reviewScore}</S.StarNum>
          <S.Flag onClick={FlagHandler}>{flagToggle ? "💖" : "🤍"}</S.Flag>
          <S.Filter onClick={OnClickHandler} />
          <S.ImgContainer src={imgUrl} />
        </>
      )}
    </S.Container>
  );
};

export default ScheduleImgContainer;
