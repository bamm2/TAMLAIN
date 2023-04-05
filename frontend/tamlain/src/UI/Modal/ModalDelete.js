import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./ModalDelete.styled";
import { deleteScheduleHistory } from "../../utils/api/historyApi";

const ModalDelete = (props) => {

//  axios 요청에 넣어줄 변수
const scheduleId = props.idx;
  const key = localStorage.getItem("token");
  
  const deleteSchedule = () => {
    deleteScheduleHistory(key, scheduleId).then(res => console.log(res));
  }
  
  const closeModal = () => {
    props.setExitModalOpen(false);
    document.body.style = `overflow:auto`;
  };

  return (
    <>
      <S.Contatiner>
        <S.Modal>
          <S.CloseButton onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} onClick={props.close} />
          </S.CloseButton>
          <S.ModalInfo>
            <span>{props.name}</span>
            <br />
            
            <S.ModalButton style={{ marginRight: "10px" }} onClick={deleteSchedule}>
              예
            </S.ModalButton>
            <S.ModalButton style={{ marginLeft: "10px" }} onClick={closeModal}>
              아니오
            </S.ModalButton>
          </S.ModalInfo>
        </S.Modal>
      </S.Contatiner>
    </>
  );
};

export default ModalDelete;
