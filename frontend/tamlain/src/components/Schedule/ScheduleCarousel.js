import React from "react";
import * as S from "./ScheduleCarousel.styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScheduleCarouselItem from "./ScheduleCarouselItem";
import { useState } from "react";

const ScheduleCarousel = (props) => {
  const settings = {
    arrows: true, // 양 끝 화살표 표시여부
    autoplay: true, // 자동으로 넘어가게
    autoplaySpeed: 2000, // 자동으로 5초마다 넘어가게

    dots: false, // 점을 안보이게
    infinite: true, // 무한 반복
    speed: 500, // 이동하는 속도
    slidesToShow: 4, // 4장씩 보이게
    centerPadding: "0", // 0px하면 슬라이드 끝쪽 이미지가 안 잘린다
    swipeToSlide: true,
    centerMode: true,
    // variableWidth: true, // 사진마다 각자의 width대로 적용
    prevArrow: (
      <S.BtnPre
        src={`${process.env.PUBLIC_URL}/assets/Icon/leftIcon.png`}
      ></S.BtnPre>
    ),
    nextArrow: (
      <S.BtnNext
        src={`${process.env.PUBLIC_URL}/assets/Icon/rightIcon.png`}
      ></S.BtnNext>
    ),
  };

  // useEffect로 axios 쏘고 카테고리를 useState에 넣어줘서 출력
  // axios 받아와서 카테고리 수 만큼 for문 돌리기

  // axios로 카테고리 이름 받아오기
  const [categoryName, setCategoryName] = useState(null);

  // axios로 캐러셀에 들어갈 사진,태그명,장소명 받아와서 props 내려주기
  //더미
  const CarouselItems = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_0.jpg`,
      tag: "#태그명 #태그명 #태그명",
      name: "장소명 자리1",
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_1.jpg`,
      tag: "#태그명 #태그명 #태그명",
      name: "장소명 자리2",
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_2.jpg`,
      tag: "#태그명 #태그명 #태그명",
      name: "장소명 자리3",
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_3.jpg`,
      tag: "#태그명 #태그명 #태그명",
      name: "장소명 자리4",
    },
    {
      id: 5,
      image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_4.jpg`,
      tag: "#태그명 #태그명 #태그명",
      name: "장소명 자리5",
    },
  ];

  const size = CarouselItems.length;

  // 버튼 클릭 시 재추천 axios 요청 보내기

  return (
    <S.Container>
      {/* 여기에서 카테고리수만큼 반복문 돌려주기 */}
      <S.CategoryName> axios 받아와서 넣어줄 카테고리 ! </S.CategoryName>
      <S.ReRecommendBtn> ↺ </S.ReRecommendBtn>

      <Slider {...settings}>
        {CarouselItems.map((items) => (
          <S.CarouselContainer key={items.id}>
            <ScheduleCarouselItem
              size={size}
              id={items.id}
              image={items.image}
              tag={items.tag}
              name={items.name}
              setFlag={props.setFlag}
            />
          </S.CarouselContainer>
        ))}
      </Slider>
      {/* 반복문 닫는 위치  */}
    </S.Container>
  );
};

export default ScheduleCarousel;
