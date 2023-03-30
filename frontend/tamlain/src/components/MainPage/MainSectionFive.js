import * as S from "./MainSectionFive.styled";
import useScrollFadeIn from "./useScrollFadeIn";

const MainSectionFive = () => {
  const animatedItem = useScrollFadeIn("up", 1, 0.3);

  return (
    <S.Container>
      <S.Button {...animatedItem}>탐라인 이용하기</S.Button>
    </S.Container>
  );
};

export default MainSectionFive;
