import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  // background-color: blue;
  display: flex;
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 20px;
  margin-left: 60px;
`;

export const TextContainer = styled.div`
  width: 350px;
  height: 100%;
  // background-color: pink;
  text-align: center;
`;

export const TextOne = styled.div`
  width: 80%;
  text-align: left;
  font-size: 20px;
  margin-top: 12%;
  margin-left: 30px;
  margin-bottom: 2%;
`;

export const TextTwo = styled.div`
  margin-left: 30px;
  font-size: 15px;
  text-align: left;
  color: #727272;
`;
export const TextThree = styled.div`
  margin-left: 30px;
  margin-bottom: 20%;
  font-size: 15px;
  text-align: left;
  color: #727272;
`;

export const StarBtn = styled.button`
  position: relative;
  color: #ffffff;
  width: 120px;
  height: 50px;
  box-shadow: 0 0 0 2px #ffffff;
  border-radius: 20px;
  border: none;
  background-color: #fc872a;
  font-size: 18px;
  margin: 45px 0 0 50px;
  cursor: pointer;

  :hover {
    // background-color: #ffffff;
    transition: 0.5s;
    color: wheat;
  }
`;

export const DeleteBtn = styled.img`
  margin: 55px;
  height: 30px;
  cursor: pointer;
`;
