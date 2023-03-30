import styled from "styled-components";

export const BackGround = styled.div`
  background-image: url(./assets/Background/mainBackground.jpg);
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

export const SurveyTitle = styled.div`
  color: #fff;
  text-align: center;
  position: absolute;
  font-weight: 400;
  font-size: 23px;
  top: 55%;
  left: 50%;
  width: 60%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 3;
`;
