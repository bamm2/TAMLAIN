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
      {/* 이동하면서  카테고리 id 송신해야함 link로 데이터 넘겨주기 
      또는 navigate로 데이터 넘겨주기 */}
      {/* <Link to="/main"> */}
      <S.SelectBtn> 선택</S.SelectBtn>
      {/* </Link> */}
      {/* 버튼 클릭  시 axios로 수정 요청 보내주고 이 친구 사라지게 하기  */}
    </S.Container>
  );
};

export default SchduleSearchItem;
