import styled from "styled-components";

export const Modal = styled.div`
  display: block;
  position: absolute;
  z-index: 15;
  width: 300px;
  height: 200px;
  // border: 2px solid #d8a3ff;
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
  padding-top: 15%;
  // font-weight: bold;
`;

export const ModalButton = styled.button`
  width: 70px;
  height: 35px;
  border: none;
  border-radius: 15px;
  background-color: #c9c9c9;
  color: #3a3a3a;
  font-weight: bold;
  margin-top: 30px;
  box-shadow: 0 6px 10px -2px gray;
  cursor: pointer;
`;

export const CloseButton = styled.div`
  float: right;
  margin-right: 5px;
  margin-top: 3px;
  color: gray;
  cursor: pointer;
`;
