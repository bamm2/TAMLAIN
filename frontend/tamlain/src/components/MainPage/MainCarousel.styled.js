import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
  @media all and (min-width: 412px) and (max-width: 760px) {
    height: 30vh;
  }
  @media all and (min-width: 390px) and (max-width: 411px) {
    width: 100%;
    left: 0%;
  }
`;

export const Test = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -100%);
  font-size: 100px;
  z-index: 500;
`;
export const Text1 = styled.div`
  position: absolute;
  top: 15%;
  left: 30%;
  width: 100%;
  color: #ffffff;
  font-size: 50px;
  // transform: translate(-60%, 30%);
  z-index: 3;
  @media all and (min-width: 412px) and (max-width: 760px) {
    top: 13%;
    left: 25%;
    font-size: 30px;
  }
`;
export const Text2 = styled.div`
  position: absolute;
  top: 13%;
  left: 85.8%;
  width: 70%;
  color: #ffffff;
  font-size: 50px;
  transform: translate(-20%, 20%);
  z-index: 3;
  height: 50vh;
  @media all and (min-width: 412px) and (max-width: 760px) {
    top: 7%;
    left: 85%;
    font-size: 30px;
  }
`;

export const MainBtn = styled.button`
  position: absolute;
  top: 31.5%;
  left: 78%;
  color: #ffffff;
  width: 100px;
  box-shadow: 0 0 0 2px #ffffff;
  border-radius: 20px;
  border: none;
  background-color: rgba(255, 255, 255, 0);
  padding: 10px;
  z-index: 3;
  cursor: pointer;

  :hover {
    background-color: #fc872a;
    transition: 0.5s;
    color: #fff;
    font-weight: bold;
    box-shadow: 0 0 0 2px #fc872a;
  }
  @media all and (min-width: 412px) and (max-width: 760px) {
    top: 21.5%;
    left: 74%;
    width: 80px;
  }
`;
