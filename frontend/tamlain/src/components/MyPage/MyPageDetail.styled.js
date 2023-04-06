import styled from "styled-components";

export const BackGround = styled.div`
  background-image: url(${process.env
    .PUBLIC_URL}/assets/Background/mainBackground.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: absolute;
  height: 40%;
  width: 50%;
  left: 25%;
  top: 0%;
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

export const Container = styled.div`
  position: absolute;
  z-index: 100;
  left: 25%;
  width: 50%;
  top: 26.5%;
  height: 200%;
`;

export const BackBtn = styled.img`
  z-index: 5;
  width: 20px;
  margin-top: 5%;
  margin-left: 30px;
  cursor: pointer;
`;

export const DayBtn = styled.div`
  position: absolute;
  z-index: 4;
  top: 12.5%;
  margin-left: -8%;
  width: 70px;
  height: 30px;
  border-radius: 30px;
  input[type="radio"] {
    display: none;
  }
  label {
    display: block;
    cursor: pointer;
    border-radius: 30px;
    text-align: center;
    font-weight: bold;
    padding-bottom: 20px;
    line-height: 45px;
    width: 70px;
    height: 20px;
  }
  input[type="radio"]:checked + label {
    background: #fc872a;
    color: #fff;
  }
  input[type="radio"] + label {
    background: #fff;
    color: #3a3a3a;
    &:hover {
      background: #fc872a;
      color: #fff;
    }
    &:checked {
      background: #fc872a;
      color: #fff;
    }
  }
`;

export const TextOne = styled.span`
  text-align: left;
  color: black;
  background-color: white;
  input {
    font-weight: bold;
    font-size: 30px;
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 15px;
    width: 20ch;
    border: none;
    border-radius: 5px;
    color: black;
    background-color: transparent;
  }
`;
export const TextOneModify = styled.span`
  text-align: left;
  color: black;
  background-color: white;
  input {
    font-weight: bold;
    font-size: 30px;
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 15px;
    width: 20ch;
    border: 1px solid gray;
    border-radius: 5px;
    color: gray;
    background-color: transparent;
  }
`;

export const TitleUpdateImg = styled.img`
  object-fit: cover;
  margin-left: 10px;
  margin-top: 26px;
  width: 25px;
  height: 25px;
  cursor: pointer;

  :hover {
    width: 28px;
    height: 28px;
  }
`;

export const TitleUpdateImgReady = styled.img`
  object-fit: cover;
  margin-left: 10px;
  margin-top: 26px;
  width: 25px;
  height: 25px;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
`;

export const TextTwo = styled.div`
  margin-left: 35px;
  font-size: 21px;
  text-align: left;
  color: #727272;
  font-weight: bold;
`;
export const TextThree = styled.div`
  margin-left: 15px;
  margin-bottom: 5%;
  font-size: 21px;
  text-align: left;
  color: #727272;
  font-weight: bold;
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Div = styled.div`
  float: left;
  width: 20%;
  height: 350px;
  background-color: #f9f9f9;
  overflow: auto;
  position: relative;
  margin-top: 5%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
