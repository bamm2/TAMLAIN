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

  // 미방문 체크 시 별점 0개로 
  let visitChk = props.select;
  console.log(visitChk);

  let chkIdx = localStorage.getItem("chkedVisited");

  useEffect(() => {
    console.log(props.existStar);
    console.log(props.index);
    
    if (props.select) {
      props.setStarCount(0);
      props.setStarIdx(chkIdx);
    }

    // 등록된 별점들 true 
    let tmp = [];
    for (let i = 0; i < props.existStar; i++){
      tmp[i] = true;
    }
    setClicked(tmp);
    props.setStarCount(props.existStar);
    props.setStarIdx(props.index);
  }, []);


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
