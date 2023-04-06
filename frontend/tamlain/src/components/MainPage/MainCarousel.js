import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainCarouselItem from "./MainCarouselItem";
import * as S from "./MainCarousel.styled";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../../utils/api/oauthApi";
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
const containerVariants2 = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.8,
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const MainCarousel = () => {
  const settings = {
    arrows: false, // 양 끝 화살표 안보이게
    dots: false, // 점을 안보이게
    infinite: true, // 무한 반복
    speed: 500, // 이동하는 속도
    slidesToShow: 1, // 1장씩 보이게
    slidesToScroll: 1, // 1장씩 넘기기
    autoplay: true, // 자동으로 넘어가게
    autoplaySpeed: 4000, // 자동으로 5초마다 넘어가게
    centerMode: true,
    centerPadding: "0px", // 0px하면 슬라이드 끝쪽 이미지가 안 잘린다
    draggable: false, // 드래그 수동으로 넘기기 막기
  };

  // Carousel 더미
  const CarouselImg = [
    {
      image: "assets/Background/mainCarousel_0.jpg",
    },
    {
      image: "assets/Background/mainCarousel_1.jpg",
    },
    {
      image: "assets/Background/mainCarousel_2.jpg",
    },
    {
      image: "assets/Background/mainCarousel_3.jpg",
    },
    {
      image: "assets/Background/mainCarousel_4.jpg",
    },
  ];

  // 여행하기 버튼 클릭시 스케줄 페이지로 이동
  // 로그인 체크 후 , 로그인 페이지로 이동 또는 일정 등록 페이지로 이동
  const navigate = useNavigate();
  const key = localStorage.getItem("token");

  const reDirectSchedule = () => {
    refreshAccessToken(key).then((res) => console.log(res));
    if (key === null) {
      navigate("/login");
    } else {
      navigate("/surveyCalendar");
    }
  };

  // Slider가 filter 컴포넌트도 요소로 인식해서 따로 컴포넌트로 img컴포넌트 빼줌
  return (
    <>
      <Slider {...settings}>
        {CarouselImg.map((img, index) => (
          <S.Container key={index}>
            <MainCarouselItem key={index} image={img.image} />
          </S.Container>
        ))}
      </Slider>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <S.Text1> 나를 아는 여행 플랫폼</S.Text1>
        <S.Text2> 탐라:인</S.Text2>
      </motion.div>
      <motion.div
        variants={containerVariants2}
        initial="hidden"
        animate="visible"
      >
        <S.MainBtn onClick={reDirectSchedule}> 여행하기 </S.MainBtn>
      </motion.div>
    </>
  );
};

export default MainCarousel;
