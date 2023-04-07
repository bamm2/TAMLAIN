import styled from "styled-components";

export const BackGround = styled.div`
  background-image: url(${process.env
    .PUBLIC_URL}/assets/Background/mainBackground.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: absolute;
  height: 40%;
  width: 50%;
  left: 25%;
  top: 0%;
  z-index: 1;
`;

export const BackGroundFilter = styled.div`
  background-color: #3a3a3a;
  opacity: 0.3;
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 2;
`;

export const BackBtn = styled.img`
  position: absolute;
  z-index: 5;
  top: 23%;
  left: 25%;
  width: 20px;
  height: 30px;
  margin-top: 7.5%;
  margin-left: 25px;
`;

export const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 28px;
  position: absolute;
  z-index: 6;
  top: 37.5%;
  left: 31%;
`;

export const Hr = styled.hr`
  position: absolute;
  z-index: 5;
  width: 45%;
  height: 1px;
  margin-top: 22%;
  margin-left: 27.5%;
  background: #d9d9d9;
`;
