import styled from "styled-components";

export const Contatiner = styled.div`
  position: absolute;
  z-index: 100;
  top: 29%;
  left: 25%;
  right: 25%;
  width: 50%;
  height: 200%;
  opacity: 0.96;
  background-color: gray;
  border-radius: 20px 20px 0 0;
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 15;
  width: 300px;
  height: 530px;
  border-radius: 15px;
  color: #000000;
  overflow: hidden;
  background-color: #ffffff;
  transition: color 0s 0.1s;
  text-align: center;
  color: #fc872a;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ModalInfo = styled.div`
  padding-top: 10%;
`;

export const ModalButton = styled.button`
  width: 80%;
  height: 35px;
  border: none;
  border-radius: 15px;
  background-color: #fc872a;
  color: #ffffff;
  font-weight: bold;
  margin-top: 5%;
  box-shadow: 0 6px 10px -2px gray;
  cursor: pointer;
`;

export const CloseButton = styled.div`
  float: right;
  margin-right: 8px;
  margin-top: 5px;
  color: gray;
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // background-color: black;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-item: center;
`;

export const ImgCircle = styled.div`
  width: 90px;
  height: 90px;
  border-line: none;
  position: relative;
`;

export const ImgCircleFilter = styled.div`
  opacity: 0.3;
  background-color: #000;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  position: absolute;
  z-index: 13;
  top: 0%;
  display: none;
`;

export const ImgCircleCheck = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 50px;
  position: absolute;
  z-index: 15;
  top: 28%;
  left: 28%;
  display: none;
`;

export const Img = styled.img`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  z-index: 15;
`;

export const Text = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 3%;
  text-align: center;
  z-index: 15;
`;

export const InputBox = styled.input`
  margin-top: 4px;
  border: none;
  border-radius: 7px;
  width: 80%;
  padding: 0.6em 0.6em;
  box-shadow: 0 0 0 1px #fc872a;
  z-index: 15;

  :focus {
    outline: 1px solid #fc872a;
    // outline: none;
  }
`;

export const InputTextCount = styled.div`
  text-align: end;
  margin-right: 30px;
  margin-top: 5px;
  height: 2%;
  font-size: 12px;
  z-index: 15;
`;
