import * as S from "./MainSectionFour.styled";
import useScrollFadeIn from "./useScrollFadeIn";

const MainSectionFour = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 1, 0.1),
    1: useScrollFadeIn("up", 1, 0.2),
    2: useScrollFadeIn("up", 1, 0.3),
    3: useScrollFadeIn("left", 1, 0.4),
    4: useScrollFadeIn("left", 1, 0.6),
  };

  return (
    <S.Container>
      <S.TextContainer>
        <S.TextOne {...animatedItem[0]}>여행을 다녀온 후, </S.TextOne>
        <S.TextTwo {...animatedItem[1]}>여행지에 대한 별점을</S.TextTwo>
        <S.TextThree {...animatedItem[2]}>매겨보세요</S.TextThree>
      </S.TextContainer>
      <S.ImgContainer>
        <S.ImgOne
          {...animatedItem[3]}
          src="/assets/Background/mainSection4_1.png"
        ></S.ImgOne>
        <S.ImgTwo
          {...animatedItem[4]}
          src="/assets/Background/mainSection4_2.png"
        ></S.ImgTwo>
      </S.ImgContainer>
    </S.Container>
  );
};

export default MainSectionFour;
