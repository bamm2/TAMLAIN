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

export const DayBtn = styled.div`
  position: absolute;
  z-index: 4;
  top: 44%;
  width: 70px;
  height: 30px;
  border-radius: 30px;
  margin-left: 20%;
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

export const BackBtn = styled.img`
  position: absolute;
  z-index: 4;
  top: 19%;
  left: 25%;
  width: 20px;
  height: 30px;
  margin-top: 7.5%;
  margin-left: 25px;
  cursor: pointer;
`;

export const RegistBtn = styled.button`
  position: absolute;
  z-index: 10;
  margin-top: 6.4%;
  margin-left: 65%;
  top: 30%;
  width: 140px;
  height: 40px;
  background-color: #32b64f;
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
  cursor: pointer;
`;
