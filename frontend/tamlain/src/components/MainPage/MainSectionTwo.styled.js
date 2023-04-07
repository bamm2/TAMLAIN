import styled from "styled-components";

export const Container = styled.div`
  margin: 0;
  padding: 0;
  height: 50vh;
  background-color: #f1efef;
  display: flex;
  align-items: center;
  color: #606060;
  @media all and (min-width: 412px) and (max-width: 760px) {
    height: 37vh;
  }
`;

export const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
  @media all and (min-width: 412px) and (max-width: 760px) {
    font-size: 18px;
    margin-top: 1%;
  }
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
  @media all and (min-width: 412px) and (max-width: 760px) {
    margin-top: 3%;
  }
`;

export const ImgOne = styled.img`
  // object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 10px;
  margin-top: 12px;
  height: 350px;

  z-index: 2;
  @media all and (min-width: 412px) and (max-width: 760px) {
    top: 5%;
    left: -10%;
    margin-right: 25%;
    margin-top: 15%;
    height: 250px;

    z-index: 2;
  }
`;

export const ImgTwo = styled.img`
  object-fit: contain;
  width: 300px;
  heigth: 150px;
  margin-top: 81px;
  @media all and (min-width: 412px) and (max-width: 760px) {
    bject-fit: contain;
    width: 200px;
    heigth: 120px;
    margin-top: 115px;
  }
`;

export const ImgContainer = styled.div`
  // background-color: blue;
  width: 50%;
  height: 100%;
  position: relative;
  float: right;
  text-align: right;
`;
