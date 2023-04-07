import styled from "styled-components";

export const Container = styled.div`
  height: 50vh;
  background-color: #fafafa;
  @media all and (min-width: 412px) and (max-width: 760px) {
    margin-top: 18%;
    margin-right: 6%;
    height: 37vh;
  }
`;

export const LogoImg = styled.img`
  object-fit: contain;
  margin: auto;
  padding-top: 22px;
  display: block;
`;

export const TextOne = styled.div`
  color: #606060;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  @media all and (min-width: 412px) and (max-width: 760px) {
    font-size: 30px;
    margin-left: 7%;
  }
`;

export const TextTwo = styled.div`
  color: #606060;
  text-align: center;
  font-size: 50px;
  margin-bottom: 50px;
  font-weight: bold;
  @media all and (min-width: 412px) and (max-width: 760px) {
    font-size: 30px;
    margin-left: 7%;
  }
`;

export const TextThree = styled.div`
  color: #606060;
  font-size: 20px;
  text-align: center;
  @media all and (min-width: 412px) and (max-width: 760px) {
    font-size: 20px;
    width: 70%;
    margin-left: 18.5%;
  }
`;
