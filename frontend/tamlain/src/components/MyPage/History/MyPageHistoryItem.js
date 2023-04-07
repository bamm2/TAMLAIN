import * as S from "./MyPageHistoryItem.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalDelete from "../../../UI/Modal/ModalDelete";
import { useEffect } from "react";
import { getReviewScheduleHistory } from "../../../utils/api/reviewApi";
import Swal from "sweetalert2";

const MyPageHistoryItem = (props) => {
  const navigate = useNavigate();

  const key = localStorage.getItem("token");
  const scheduleId = props.idx;

  // 별점 등록 버튼 클릭시 ,
  const reDirectStarInfo = () => {
    // 리뷰 등록 가능한 일자인지 체크용 axios
    getReviewScheduleHistory(key, scheduleId).then((res) => {
      let comp = res.data.success;

      // 리뷰 등록이 불가능한 날짜이면
      if (comp === false) {
        Swal.fire({
          icon: "error",
          title: "여행 마지막 날짜 이후부터 별점 등록이 가능합니다.",
          confirmButtonColor: "#fc872a",
        });
      } else {
        // 리뷰 등록이 가능한 날짜면 스케줄 id 넣고 페이지 이동
        localStorage.setItem("scheduleId", scheduleId);
        navigate(`/myPageStarInfo/${scheduleId}`);
      }
    });
  };

  // 삭제 요청 모달 띄우기
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const ModalHandler = () => {
    setExitModalOpen(true);
    document.body.style = `overflow:hidden`;
  };

  // 일정 상세 페이지로 이동
  const redirectDetail = () => {
    localStorage.setItem("scheduleId", scheduleId);
    navigate(`/detail/${scheduleId}/1`);
  };

  // 로컬에서 delete가 2이면 제거됐으므로 페이지 재렌더링
  useEffect(() => {
    setDeleteChk(localStorage.getItem("delete"));
  }, [localStorage.getItem("delete")]);

  //  제거 여부
  const [deleteChk, setDeleteChk] = useState(0);

  // 제거됐으면 페이지 제랜더링 후 , 다시 0으로 변경
  if (deleteChk == 2) {
    window.location.reload();
    localStorage.setItem("delete", 0);
  }

  return (
    <S.Container>
      <S.Img src={props.img} onClick={redirectDetail}></S.Img>
      <S.TextContainer>
        <S.TextOne onClick={redirectDetail}>{props.title}</S.TextOne>
        <S.TextTwo>{props.date}</S.TextTwo>
        <S.TextThree>
          {props.period - 1}박 {props.period}일
        </S.TextThree>
      </S.TextContainer>
      <S.StarBtn onClick={reDirectStarInfo}> 별점주기</S.StarBtn>
      <S.DeleteBtn
        src="assets/Icon/trash.png"
        onClick={ModalHandler}
      ></S.DeleteBtn>
      {/* 삭제 요청시 모달에서 삭제 처리  */}
      {exitModalOpen && (
        <ModalDelete
          idx={scheduleId}
          name="정말 삭제 하시겠습니까?"
          setExitModalOpen={setExitModalOpen}
        ></ModalDelete>
      )}
    </S.Container>
  );
};

export default MyPageHistoryItem;
