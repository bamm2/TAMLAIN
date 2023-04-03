import React, { Fragment } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./Modal.styled";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const Modal = (props) => {
  const value = props.name2;
  const flag = true;
  if (value === null) {
    flag = false;
  }

  const closeModal = () => {
    props.setExitModalOpen(false);
    document.body.style = `overflow:auto`;
  };

  return (
    <>
      <S.Contatiner>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <S.Modal>
            <S.CloseButton onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} onClick={props.close} />
            </S.CloseButton>
            <S.ModalInfo>
              <span>{props.name}</span>
              <br />
              {flag && <span>{value}</span>}
              {flag && <br />}

              <S.ModalButton
                style={{ marginRight: "10px" }}
                onClick={props.yes}
              >
                예
              </S.ModalButton>
              <S.ModalButton
                style={{ marginLeft: "10px" }}
                onClick={closeModal}
              >
                아니오
              </S.ModalButton>
            </S.ModalInfo>
          </S.Modal>
        </motion.div>
      </S.Contatiner>
    </>
  );
};

export default Modal;
