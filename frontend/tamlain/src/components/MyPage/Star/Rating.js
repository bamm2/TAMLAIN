import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const ARRAY = [0, 1, 2, 3, 4];

const DummyData = [
  {
    id: 0,
    image: "assets/Background/mainCarousel_0.jpg",
    tag: "#태그명 #태그명 #태그명",
    name: "장소1",
  },
  {
    id: 1,
    image: "assets/Background/mainCarousel_1.jpg",
    tag: "#태그명 #태그명 #태그명",
    name: "장소2",
  },
  {
    id: 2,
    image: "assets/Background/mainCarousel_2.jpg",
    tag: "#태그명 #태그명 #태그명",
    name: "장소3",
  },
  {
    id: 3,
    image: "assets/Background/mainCarousel_3.jpg",
    tag: "#태그명 #태그명 #태그명",
    name: "장소4",
  },
  {
    id: 4,
    image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_4.jpg`,
    tag: "#태그명 #태그명 #태그명",
    name: "장소5",
  },
];

function Rating() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
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
    <div>
      {DummyData.map((el, idx) => {
        return (
          <div>
            <div style={{ float: "left", display: "flex" }}>
              <img
                src={el.image}
                style={{ width: "100px", height: "100px", marginRight: "30px" }}
              />
            </div>
            <div
              style={{ float: "left", marginRight: "30px", fontSize: "30px" }}
            >
              {el.name}
            </div>
            <Wrap>
              <Stars>
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
              </Stars>
            </Wrap>
          </div>
        );
      })}
    </div>
  );
}

export default Rating;

const Wrap = styled.div`
  margin-top: 10px;
  // display: flex;
  // flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
    text-shadow: 0 0 3px #fc872a;
  }

  :hover svg {
    color: #fc872a;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fc872a;
  }
`;
