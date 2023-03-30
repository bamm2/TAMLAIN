import * as S from "./MainSectionTwo.styled";
import useScrollFadeIn from "./useScrollFadeIn";

const MainSectionTwo = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 1, 0.2),
    1: useScrollFadeIn("up", 1, 0.2),
    2: useScrollFadeIn("left", 1, 0.3),
    3: useScrollFadeIn("up", 1, 0.4),
  };

  return (
    <S.Container>
      <S.TextContainer>
        <S.Text {...animatedItem[0]}>다양한 카테고리별로 </S.Text>
        <S.Text {...animatedItem[1]}>추천을 받을 수 있어요</S.Text>
      </S.TextContainer>
      <S.ImgContainer>
        <S.ImgOne
          {...animatedItem[2]}
          src="/assets/Background/mainSection2_1.png"
        ></S.ImgOne>
        <S.ImgTwo
          {...animatedItem[3]}
          src="/assets/Background/mainSection2_2.png"
        ></S.ImgTwo>
      </S.ImgContainer>
    </S.Container>
  );
};

export default MainSectionTwo;
