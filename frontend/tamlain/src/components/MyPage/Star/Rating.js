import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import * as S from "./Rating.styled";

const ARRAY = [0, 1, 2, 3, 4];

const Rating = (props) => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const id = localStorage.getItem("id");
  const size = localStorage.getItem("size");

  // const chk = props.chk;

  // console.log("visited배열 체크(rating) : " + chk);

  // useEffect(() => {
  //   sendReview();
  //   visitedChk();
  // }, [clicked]); //컨디마 컨디업

  useEffect(() => {
    sendReview();
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    props.setStarCount(score);
    props.setStarIdx(props.index);
    console.log("별점 : "+score);
    console.log("인덱스 : "+props.index);
  };

  // const visitedChk = () => {
  //   let clickStates = [...clicked];
  //   for (let i = 0; i < size; i++){
  //     if (chk[i]) {
  //       for (let j = 0; j < 5; j++) {
  //         clickStates[j] = false;
  //       }
  //     }
  //   }
  //   setClicked(clickStates);
  // }

  return (
    <>
      <S.Stars>
        {ARRAY.map((el2, idx2) => {
          return (
            <FaStar
              key={idx2}
              size="50"
              onClick={() => handleStarClick(el2)}
              className={clicked[el2] && "yellowStar"}
            />
          );
        })}
      </S.Stars>
    </>
  );
};

export default Rating;
