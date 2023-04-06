import * as S from "./MyPageHistoryItem.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteScheduleHistory } from "../../../utils/api/historyApi";
import ModalDelete from "../../../UI/Modal/ModalDelete";

const MyPageHistoryItem = (props) => {
  const navigate = useNavigate();

  const key = localStorage.getItem("token");
  const scheduleId = props.idx;
 
  // 별점 페이지로 이동  / schuldeId 가지고 페이지로 이동 
  const reDirectStarInfo = () => {
    navigate(`/myPageStarInfo/${scheduleId}`, { state:scheduleId });
  }

  // 삭제 요청 모달 띄우기 
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const ModalHandler = () => {
    setExitModalOpen(true);
    document.body.style = `overflow:hidden`;
  };
  
  const redirectDetail = () => {
    navigate(`/detail/${scheduleId}`, { state:scheduleId }  );
  }

  return (
    <S.Container>
      <S.Img src={props.img} onClick={redirectDetail}></S.Img>
      <S.TextContainer>
        <S.TextOne onClick={redirectDetail}>{props.title}</S.TextOne>
        <S.TextTwo>{props.date}</S.TextTwo>
        <S.TextThree>{props.period}</S.TextThree>
      </S.TextContainer>
      {/* 이동하면서  카테고리 id 송신해야함 */}
      <S.StarBtn onClick={reDirectStarInfo}> 별점주기</S.StarBtn>
      {/* 버튼 클릭  시 axios로 수정 요청 보내주고 이 친구 사라지게 하기  */}
      <S.DeleteBtn src="assets/Icon/trash.png" onClick={ModalHandler}></S.DeleteBtn>
      
      {exitModalOpen && (
        <ModalDelete
          idx={scheduleId}
          name="정말 삭제 하시겠습니까?"
          setExitModalOpen={setExitModalOpen}
        ></ModalDelete>)} 

  </S.Container>
  );
};

export default MyPageHistoryItem;
