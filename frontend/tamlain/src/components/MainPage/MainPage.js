import MainCarousel from "./MainCarousel";
import MainSectionOne from "./MainSectionOne";
import MainSectionTwo from "./MainSectionTwo";
import MainSectionThree from "./MainSectionThree";
import MainSectionFour from "./MainSectionFour";
import MainSectionFive from "./MainSectionFive";
import * as S from "./MainPage.styled";

const MainPage = () => {
  return (
    <S.Container>
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
