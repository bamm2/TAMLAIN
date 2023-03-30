import styled from "styled-components";

export const Container = styled.div`
  margin: 0;
  padding: 0;
  height: 50vh;
  background-color: #f1efef;
  display: flex;
  align-items: center;
  color: #606060;
`;

export const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export const TextContainer = styled.div`
  // background-color: pink;
  width: 50%;
  float: left;
  height: 100%;
  font-size: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const ImgOne = styled.img`
  // object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 10px;
  margin-top: 5px;
  height: 350px;

  z-index: 2;
`;

export const ImgTwo = styled.img`
  object-fit: contain;
  width: 300px;
  heigth: 150px;
  margin-top: 80px;
`;

export const ImgContainer = styled.div`
  // background-color: blue;
  width: 50%;
  height: 100%;
  position: relative;
  float: right;
  text-align: right;
`;
