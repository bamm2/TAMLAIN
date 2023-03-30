import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  color: #606060;
`;
export const TextOne = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
export const TextTwo = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export const TextContainer = styled.div`
  // background-color: pink;
  width: 50%;
  float: right;
  height: 100%;
  font-size: 30px;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
`;

export const ImgOne = styled.img`
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 180px;
  margin-top: 5px;
  height: 350px;

  z-index: 2;
`;

export const ImgTwo = styled.img`
  object-fit: contain;
  width: 300px;
  margin-top: 30px;
`;

export const ImgContainer = styled.div`
  // background-color: blue;
  width: 50%;
  height: 100%;
  position: relative;
  float: left;
`;
