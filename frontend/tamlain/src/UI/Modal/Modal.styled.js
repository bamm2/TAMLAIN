import styled from "styled-components";

export const Contatiner = styled.div`
  position: absolute;
  z-index: 100;
  top: 27.5%;
  left: 25%;
  right: 25%;
  width: 50%;
  height: 200%;
  opacity: 0.96;
  background-color: gray;
  border-radius: 30px 30px 0 0;
`;

export const Modal = styled.div`
  position: fixed;

  display: block;
  z-index: 15;
  width: 300px;
  height: 200px;
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

  :hover {
    width: 75px;
    height: 40px;
    background-color: #fc872a;
    color: white;
    transition: 0.3s;
  }
`;

export const CloseButton = styled.div`
  float: right;
  margin-right: 7px;
  margin-top: 5px;
  color: gray;
  cursor: pointer;
`;
