import React, { Fragment, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as S from "./ModalRegist.styled";
import { getScheduleThumbnail } from "../../utils/api/scheduleApi";
import { registSchedule } from "../../utils/api/scheduleApi";
import { motion } from "framer-motion";
import client from "../../utils/client";

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
const ModalRegist = (props) => {
  const value = props.name2;
  const flag = true;
  if (value === null) {
    flag = false;
  }
  const [urlList, setUrlList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    getScheduleThumbnail(token).then((res) => {
      console.log(res);
      setUrlList(res.data.data);
    });
  }, []);

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
    document.body.style = `overflow:auto`;
  };

  const checkThumbnail = (x) => {
    const selector = document.querySelectorAll(".thumbnailBtn");
    const checkSelector = document.querySelectorAll(".checkBtn");
    localStorage.setItem("thumbnailId", JSON.stringify(x));
    const selectThumbnail = document.getElementById(`thunbnail${x}`);

    const divfilterAll = document.querySelectorAll(".divfilter");
    const divcheckAll = document.querySelectorAll(".divCheck");
    for (let i = 0; i < checkSelector.length; i++) {
      divfilterAll[i].style.display = "none";
      divcheckAll[i].style.display = "none";
    }
    for (let i = 0; i < selector.length; i++) {
      if (selector[i].id === selectThumbnail.id) {
        divfilterAll[x - 1].style.display = "block";
        divcheckAll[x - 1].style.display = "block";
      }
    }
  };

  const registDB = () => {
    const token = localStorage.getItem("token");
    const userId = 1;
    const surveyId = localStorage.getItem("surveyId");
    const thumbnailId = localStorage.getItem("thumbnailId");
    if (thumbnailId === null) {
      alert("사진을 등록해주세요!");
      return;
    }
    const name = document.getElementById("courseTitle").value;
    if (name === "") {
      alert("일정명을 등록해주세요!");
      return;
    }
    const arr = [
      {
        jejuPlaceId: 1,
        day: 1,
      },
      {
        jejuPlaceId: 3,
        day: 1,
      },
      {
        jejuPlaceId: 5,
        day: 2,
      },
    ];
    const day1 = JSON.parse(localStorage.getItem("marker1"));
    const day2 = JSON.parse(localStorage.getItem("marker2"));
    const day3 = JSON.parse(localStorage.getItem("marker3"));
    const day4 = JSON.parse(localStorage.getItem("marker4"));
    const day5 = JSON.parse(localStorage.getItem("marker5"));

    const data = {
      userId: userId,
      surveyId: surveyId,
      scheduleThumbnailId: thumbnailId,
      name: name,
      scheduleRegistItemList: arr,
    };
    console.log(data);
    registSchedule(token, data).then((res) => {
      console.log(res);
    });
    localStorage.removeItem("marker1");
    localStorage.removeItem("marker2");
    localStorage.removeItem("marker3");
    localStorage.removeItem("marker4");
    localStorage.removeItem("marker5");
    localStorage.removeItem("surveyId");
    localStorage.removeItem("thumbnailId");
    localStorage.removeItem("DayCnt");
    alert("등록이 완료되었습니다.");
    closeModal();
    window.location.href = `${client.defaults.url}/history`;
  };

  return (
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
            <div>이번 여행을 가장 잘 나타낼 수 있는</div>
            <span>이미지를 선택해주세요:) </span>
            <br />
            {flag && <span>{value}</span>}
            {flag && <br />}
            <S.ImgContainer>
              {urlList.map((url) => (
                <S.ImgCircle
                  key={url.scheduleThumbnailId}
                  id={`check${url.scheduleThumbnailId}`}
                  className="checkBtn"
                >
                  <S.ImgCircleFilter className="divfilter" />
                  <S.ImgCircleCheck
                    src={`${process.env.PUBLIC_URL}/assets/Icon/checkIcon.png`}
                    className="divCheck"
                  />
                  <S.Img
                    src={url.thumbnailImageUrl}
                    id={`thunbnail${url.scheduleThumbnailId}`}
                    className="thumbnailBtn"
                    onClick={() => {
                      checkThumbnail(url.scheduleThumbnailId);
                    }}
                  />
                </S.ImgCircle>
              ))}
            </S.ImgContainer>
            <S.Text>이번 여행의 일정명을 정해주세요:) </S.Text>
            <S.InputBox
              id="courseTitle"
              type="text"
              maxLength={20}
              value={text}
              onChange={textHandler}
            ></S.InputBox>
            <S.InputTextCount>{textLen} / 20</S.InputTextCount>
            <S.ModalButton onClick={registDB}> 등록하기 </S.ModalButton>
          </S.ModalInfo>
        </S.Modal>
      </motion.div>
    </S.Contatiner>
  );
};

export default ModalRegist;
