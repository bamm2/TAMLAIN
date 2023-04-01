import * as S from "./MyPageHistoryItem.styled";
import { useNavigate } from "react-router-dom";
import { deleteScheduleHistory } from "../../../utils/api/historyApi";


const MyPageHistoryItem = (props) => {
  const navigate = useNavigate();

  const key = localStorage.getItem("token");
  // const id =

  // 별점 페이지로 이동 
  const reDirectStarInfo = () => {
    navigate('/myPageStarInfo');
  }

  // 삭제 요청 
  const deleteHandler = () => {
    const idx = props.idx;
    const key = localStorage.getItem("token");
    console.log(idx);
    deleteScheduleHistory(key,idx).then((res) => console.log(res));
  }

  return (
    <S.Container>
      <S.Img src={props.img}></S.Img>
      <S.TextContainer>
        <S.TextOne>{props.title}</S.TextOne>
        <S.TextTwo>{props.date}</S.TextTwo>
        <S.TextThree>{props.period}</S.TextThree>
      </S.TextContainer>
      {/* 이동하면서  카테고리 id 송신해야함 link로 데이터 넘겨주기 
      또는 navigate로 데이터 넘겨주기 */}
        <S.StarBtn onClick={reDirectStarInfo}> 별점주기</S.StarBtn>
      {/* 버튼 클릭  시 axios로 수정 요청 보내주고 이 친구 사라지게 하기  */}
      <S.DeleteBtn src="assets/Icon/trash.png" onClick={deleteHandler}></S.DeleteBtn>
    </S.Container>
  );
};

export default MyPageHistoryItem;
