import * as S from "./SchduleSearchItem.styled";

const SchduleSearchItem = (props) => {
  // props 이미지 url
  //   const ImgUrl = `${process.env.PUBLIC_URL}/` + props.img;
  const ImgUrl = `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_4.jpg`;
  return (
    <S.Container>
      <S.Img src={ImgUrl}></S.Img>
      <S.TextContainer>
        <S.TextOne>드르쿰다 IN 성산 (더미)</S.TextOne>
        <S.TextTwo>제주 서귀포시 성산읍 섭지코지로 25번길 (더미)</S.TextTwo>
      </S.TextContainer>
      <S.SelectBtn> 선택</S.SelectBtn>
    </S.Container>
  );
};

export default SchduleSearchItem;
