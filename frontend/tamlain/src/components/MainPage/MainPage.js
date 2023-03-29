import { Link } from "react-router-dom";
import { loginActions } from "../../store/KakaoLogin";
import { useEffect } from "react";
import Navbar from "../../UI/Navbar/Navbar";
import MainCarousel from "./MainCarousel";
import MainSectionOne from "./MainSectionOne";
import MainSectionTwo from "./MainSectionTwo";
import MainSectionThree from "./MainSectionThree";
import MainSectionFour from "./MainSectionFour";
import MainSectionFive from "./MainSectionFive";
import MainTopButton from "./MainTopButton";
import * as S from "./MainPage.styled";

const MainPage = () => {
  return (
    <S.Container>
      <MainTopButton />
      <S.CarouselContainer>
        <MainCarousel></MainCarousel>
      </S.CarouselContainer>
      <MainSectionOne />
      <MainSectionTwo />
      <MainSectionThree />
      <MainSectionFour />
      <MainSectionFive />
    </S.Container>
  );
};

export default MainPage;
