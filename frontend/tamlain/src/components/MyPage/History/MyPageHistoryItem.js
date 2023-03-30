import * as S from "./MyPageHistoryItem.styled";
import { Link } from "react-router-dom";

const MyPageHistoryItem = (props) => {
  // props 이미지 url
  const ImgUrl = `${process.env.PUBLIC_URL}/` + props.img;
  return (
    <S.Container>
      <S.Img src={ImgUrl}></S.Img>
      <S.TextContainer>
        <S.TextOne>{props.title}</S.TextOne>
        <S.TextTwo>{props.date}</S.TextTwo>
        <S.TextThree>{props.period}</S.TextThree>
      </S.TextContainer>
      {/* 이동하면서  카테고리 id 송신해야함 link로 데이터 넘겨주기 
      또는 navigate로 데이터 넘겨주기 */}
      <Link to="/main">
        <S.StarBtn> 별점주기</S.StarBtn>
      </Link>
      {/* 버튼 클릭  시 axios로 수정 요청 보내주고 이 친구 사라지게 하기  */}
      <S.DeleteBtn src="assets/Icon/trash.png"></S.DeleteBtn>
    </S.Container>
  );
};

export default MyPageHistoryItem;
