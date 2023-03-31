import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import * as S from "./Rating.styled";

const ARRAY = [0, 1, 2, 3, 4];

const Rating = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index, idx) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }

    setClicked(clickStates);
  };

  useEffect(() => {
    // sendReview();
  }, [clicked]); //컨디마 컨디업

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    // fetch('http://52.78.63.175:8000/movie', {
    //   method: 'POST',
    //   Headers: {
    //     Authroization: 'e7f59ef4b4900fe5aa839fcbe7c5ceb7',
    //   },
    //   body: JSON.stringify({
    //     movie_id:1
    //     star: score,
    //   }),
    // });
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
