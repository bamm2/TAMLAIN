import { useState, useEffect } from "react";
import * as S from "./ScheduleImgContainer.styled";
import { getPlaceDetail } from "../../utils/api/scheduleApi";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const ScheduleImgContainer = (props) => {
  const [imgUrl, setImgUrl] = useState("");
  const [size, setSize] = useState(props.size);
  const [click, setClick] = useState(false);
  const [flagToggle, setFlagToggle] = useState(true);
  const [info, setInfo] = useState({});
  const [mapInfo, setMapInfo] = useState({});

  useEffect(() => {
    setFlagToggle((flagToggle) => !flagToggle);
  }, []);

  const OnClickHandler = () => {
    const token = localStorage.getItem("token");
    getPlaceDetail(token, props.id).then((res) => {
      console.log(res);
      setInfo(res.data.data);
      setMapInfo(res.data.data.mapInfo);
    });
    setClick((click) => !click);
  };

  //하트 누르기 토글
  const FlagHandler = () => {
    if (!flagToggle) {
      props.setFlag(true);
    } else {
      props.setFlag(false);
    }
    setFlagToggle((flagToggle) => !flagToggle);
  };
  useEffect(() => {
    if (!props.flag) {
      setFlagToggle((flagToggle) => !flagToggle);
    }
  }, [props.flag]);

  const removeCarousel = () => {
    props.removeItem(props.id);
  };
  return (
    <S.Container>
      <S.ExitButton onClick={removeCarousel}> X </S.ExitButton>
      <S.Category>{props.tag}</S.Category>
      {!click && props.ImgUrl !== "https://" && (
        <S.ImgContainer src={props.ImgUrl} onClick={OnClickHandler} />
      )}
      {!click && props.ImgUrl === "https://" && (
        <S.ImgContainer
          src={`${process.env.PUBLIC_URL}/assets/Icon/Square_NonePicture.png`}
          onClick={OnClickHandler}
        />
      )}
      {click && (
        <>
          {/* <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          > */}
          <S.ReDirectText>
            <S.LinkKakao href={info.placeUrl} target="_blank">
              상세정보
            </S.LinkKakao>
          </S.ReDirectText>
          <S.StarImg
            src={`${process.env.PUBLIC_URL}/assets/Icon/starImg.png`}
          ></S.StarImg>
          <S.StarNum>{info.reviewScore}</S.StarNum>
          <S.Flag
            onClick={() => {
              FlagHandler();
              props.checkSelect(mapInfo.title) &&
              !props.select.includes(mapInfo)
                ? props.setSelect((select) => [...select, mapInfo])
                : props.setSelect(
                    props.select.filter(
                      (button) => button.title != mapInfo.title
                    )
                  );
            }}
          >
            {flagToggle ? (
              <S.FlagImg
                src={`${process.env.PUBLIC_URL}/assets/Icon/icon_orange_4.svg.png`}
              />
            ) : (
              <S.FlagImg
                src={`${process.env.PUBLIC_URL}/assets/Icon/icon_whiteFlag.svg.png`}
              />
            )}
          </S.Flag>
          {/* </motion.div> */}
          <S.Filter onClick={OnClickHandler} />
          <S.ImgContainer src={props.ImgUrl} />
        </>
      )}
    </S.Container>
  );
};

export default ScheduleImgContainer;
