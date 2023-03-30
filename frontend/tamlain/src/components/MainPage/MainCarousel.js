import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainCarouselItem from "./MainCarouselItem";
import * as S from "./MainCarousel.styled";

const MainCarousel = () => {
  const settings = {
    arrows: false, // 양 끝 화살표 안보이게
    dots: false, // 점을 안보이게
    infinite: true, // 무한 반복
    speed: 500, // 이동하는 속도
    slidesToShow: 1, // 1장씩 보이게
    slidesToScroll: 1, // 1장씩 넘기기
    autoplay: true, // 자동으로 넘어가게
    autoplaySpeed: 5000, // 자동으로 5초마다 넘어가게
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

  // Slider가 filter 컴포넌트도 요소로 인식해서 따로 컴포넌트로 img컴포넌트 빼줌
  return (
    <Slider {...settings}>
      {CarouselImg.map((img, index) => (
        <S.Container key={index}>
          <MainCarouselItem key={index} image={img.image} />
        </S.Container>
      ))}
    </Slider>
  );
};

export default MainCarousel;
