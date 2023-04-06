import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  color: #606060;
  @media all and (min-width: 412px) and (max-width: 760px) {
    height: 37vh;
  }
`;
export const TextOne = styled.div`
  font-size: 30px;
  font-weight: bold;
  @media all and (min-width: 412px) and (max-width: 760px) {
    font-size: 18px;
    margin-top: 1%;
  }
`;
export const TextTwo = styled.div`
  font-size: 30px;
  font-weight: bold;
  @media all and (min-width: 412px) and (max-width: 760px) {
    font-size: 18px;
    margin-top: 1%;
    text-align: center;
  }
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
  @media all and (min-width: 412px) and (max-width: 760px) {
    margin-top: 3%;
    margin-right: 2%;
  }
`;

export const ImgOne = styled.img`
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 180px;
  margin-top: 12px;
  height: 350px;

  z-index: 2;
  @media all and (min-width: 412px) and (max-width: 760px) {
    top: 5%;
    left: 30%;
    margin-left: 5%;
    margin-top: 15%;
    height: 250px;

    z-index: 2;
  }
`;

export const ImgTwo = styled.img`
  object-fit: contain;
  width: 300px;
  margin-top: 45px;
  @media all and (min-width: 412px) and (max-width: 760px) {
    object-fit: contain;
    width: 200px;

    margin-top: 75px;
  }
`;

export const ImgContainer = styled.div`
  // background-color: blue;
  width: 50%;
  height: 100%;
  position: relative;
  float: left;
`;
