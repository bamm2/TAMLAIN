import * as S from "./MainSectionOne.styled";
import useScrollFadeIn from "./useScrollFadeIn";

const MainSectionOne = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 1, 0.2),
    1: useScrollFadeIn("up", 1, 0.2),
    2: useScrollFadeIn("up", 1, 0.2),
    3: useScrollFadeIn("up", 1, 0.2),
  };

  return (
    <S.Container>
      <S.LogoImg {...animatedItem[0]} src="/assets/MainLogoBlack.png" />
      <S.TextOne {...animatedItem[1]}>다양한 제주 여행지를 </S.TextOne>
      <S.TextTwo {...animatedItem[2]}> 추천 받아보세요</S.TextTwo>
      <S.TextThree {...animatedItem[3]}>
        설문을 통한 맞춤 추천을 받아 일정을 작성할 수 있어요
      </S.TextThree>
    </S.Container>
  );
};

export default MainSectionOne;
