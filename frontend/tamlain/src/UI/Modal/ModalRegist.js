import React, { Fragment } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as S from "./ModalRegist.styled";
const ModalRegist = (props) => {
  const value = props.name2;
  const flag = true;
  if (value === null) {
    flag = false;
  }

  const urlList = [
    {
      id: 0,
      imgurl: "assets/Background/1.jpg",
    },
    {
      id: 1,
      imgurl: "assets/Background/1.jpg",
    },
    {
      id: 2,
      imgurl: "assets/Background/1.jpg",
    },
    {
      id: 3,
      imgurl: "assets/Background/1.jpg",
    },
    {
      id: 4,
      imgurl: "assets/Background/1.jpg",
    },
    {
      id: 5,
      imgurl: "assets/Background/1.jpg",
    },
    {
      id: 6,
      imgurl: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_2.jpg`,
    },
    {
      id: 7,
      imgurl: "assets/Background/1.jpg",
    },
    {
      id: 8,
      imgurl: "assets/Background/1.jpg",
    },
  ];

  // 글자수 체크 로직
  const [text, setText] = useState("");
  const textHandler = (event) => {
    if (event.target.value.length > 20) {
      setText(event.target.value.slice(0, 20));
      return;
    } else {
      setText(event.target.value);
    }
  };
  const textLen = text.length;

  const closeModal = () => {
    props.setRegistModalOpen(false);
  };

  return (
    <Fragment>
      <S.Modal>
        <S.CloseButton onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} onClick={props.close} />
        </S.CloseButton>
        <S.ModalInfo>
          <div>이번 여행을 가장 잘 나타낼 수 있는</div>
          <span>이미지를 선택해주세요:) </span>
          <br />
          {flag && <span>{value}</span>}
          {flag && <br />}
          <S.ImgContainer>
            {urlList.map((url) => (
              <S.ImgCircle key={url.id}>
                <S.Img src={url.imgurl} />
              </S.ImgCircle>
            ))}
          </S.ImgContainer>
          <S.Text>이번 여행의 일정명을 정해주세요:) </S.Text>
          <S.InputBox
            type="text"
            maxLength={20}
            value={text}
            onChange={textHandler}
          ></S.InputBox>
          <S.InputTextCount>{textLen} / 20</S.InputTextCount>
          <S.ModalButton onClick={props.yes}> 등록하기 </S.ModalButton>
        </S.ModalInfo>
      </S.Modal>
    </Fragment>
  );
};

export default ModalRegist;
