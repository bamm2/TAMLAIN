import styled from "styled-components";

export const BackGround = styled.div`
  background-image: url(./assets/Background/yajasu.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: absolute;
  height: 100vh;
  width: 50%;
  left: 25%;
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

export const LoadingTitle = styled.div`
  color: #fff;
  text-align: center;
  position: absolute;
  font-weight: 600px;
  font-size: 19px;
  font-family: "GmarketSans";
  top: 25%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 3;
`;

export const Tip = styled.div`
  color: #bcffdf;
  text-align: center;
  position: absolute;
  font-weight: 600px;
  font-size: 15px;
  font-family: "GmarketSans";
  top: 85%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 3;
`;
