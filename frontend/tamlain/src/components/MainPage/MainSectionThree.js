import * as S from "./MainSectionThree.styled";
import useScrollFadeIn from "./useScrollFadeIn";

const MainSectionThree = () => {
  const animatedItem = {
    0: useScrollFadeIn("right", 1, 0.3),
    1: useScrollFadeIn("up", 1, 0.5),
    2: useScrollFadeIn("up", 1, 0.1),
    3: useScrollFadeIn("up", 1, 0.2),
  };

  return (
    <S.Container>
      <S.ImgContainer>
        <S.ImgOne
          {...animatedItem[0]}
          src="/assets/Background/mainSection3_1.png"
        ></S.ImgOne>
        <S.ImgTwo
          {...animatedItem[1]}
          src="/assets/Background/mainSection3_2.png"
        ></S.ImgTwo>
      </S.ImgContainer>
      <S.TextContainer>
        <S.TextOne {...animatedItem[2]}>마이페이지에서 다녀온</S.TextOne>
        <S.TextTwo {...animatedItem[3]}>모든 일정을 확인 해보세요</S.TextTwo>
      </S.TextContainer>
    </S.Container>
  );
};

export default MainSectionThree;
