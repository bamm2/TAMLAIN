import React, { useEffect } from "react";
import * as S from "./ScheduleCarousel.styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScheduleCarouselItem from "./ScheduleCarouselItem";
import { useState } from "react";

const ScheduleCarousel = (props) => {
  const keys = props.keys;
  const values = props.values;
  const settings = {
    arrows: true, // 양 끝 화살표 표시여부
    autoplay: true, // 자동으로 넘어가게
    autoplaySpeed: 2000, // 자동으로 5초마다 넘어가게

    dots: false, // 점을 안보이게
    infinite: false, // 무한 반복
    speed: 500, // 이동하는 속도
    slidesToShow: 4, // 4장씩 보이게
    centerPadding: "0px", // 0px하면 슬라이드 끝쪽 이미지가 안 잘린다
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

  const size = values.length;

  // 버튼 클릭 시 재추천 axios 요청 보내기

  return (
    <S.Container>
      {/* 여기에서 카테고리수만큼 반복문 돌려주기 */}
      <S.CategoryName>{keys}</S.CategoryName>
      {/* <S.ReRecommendBtn> ↺ </S.ReRecommendBtn> */}

      <Slider {...settings}>
        {values.map((items, index) => (
          <S.CarouselContainer key={index + 1}>
            <ScheduleCarouselItem
              size={size}
              id={items.mapInfo.jejuPlaceId}
              image={items.imgUrl}
              tag={items.tag}
              name={items.name}
              setFlag={props.setFlag}
              removeItem={props.removeItem}
              checkSelect={props.checkSelect}
              select={props.select}
              setSelect={props.setSelect}
              flag={props.flag}
            />
          </S.CarouselContainer>
        ))}
      </Slider>
      {/* 반복문 닫는 위치  */}
    </S.Container>
  );
};

export default ScheduleCarousel;
