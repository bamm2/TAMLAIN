import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
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
`;
export const Text2 = styled.div`
  position: absolute;
  top: 21%;
  left: 85.5%;
  width: 70%;
  color: #ffffff;
  font-size: 50px;
  transform: translate(-20%, 20%);
  z-index: 3;
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
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  padding: 10px;
  z-index: 3;
  cursor: pointer;

  :hover {
    background-color: #e3dede;
    transition: 0.5s;
    color: #727272;
  }
`;
