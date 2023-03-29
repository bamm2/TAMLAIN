import styled from "styled-components";

export const Container = styled.div`
  background-size: contain;
  position: relative;

  z-index: 1;
`;

export const Wrap = styled.div`
  position: contain;
  img {
    width: 100%;
    vertical-align: middle;
  }
`;

export const Filter = styled.div`
  background-color: #3a3a3a;
  opacity: 0.4;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 3;
`;

export const Img = styled.img`
  height: 50vh;
`;

export const Text1 = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 100%;
  color: #ffffff;
  font-size: 50px;
  // transform: translate(-60%, 30%);
  z-index: 3;
`;
export const Text2 = styled.div`
  position: absolute;
  top: 42%;
  left: 91%;
  width: 100%;
  color: #ffffff;
  font-size: 50px;
  transform: translate(-20%, 20%);
  z-index: 3;
`;

export const MainBtn = styled.button`
  position: absolute;
  top: 63%;
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
