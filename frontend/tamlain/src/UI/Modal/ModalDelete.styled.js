import styled from "styled-components";

export const Contatiner = styled.div`
  position: absolute;
  z-index: 222;
  top: 10%;
  //   left: 0%;
  width: 100%;
  height: 3000%;
  opacity: 0.96;
  background-color: gray;
  border-radius: 30px 30px 0 0;
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
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
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalInfo = styled.div`
  padding-top: 15%;
  font-weight: bold;
`;

export const ModalButton = styled.button`
  width: 70px;
  height: 50px;
  border: none;
  border-radius: 15px;
  background-color: #c9c9c9;
  color: #3a3a3a;
  font-weight: bold;
  margin-top: 40px;
  box-shadow: 0 6px 10px -2px gray;
  cursor: pointer;

  :hover {
    background-color: #fc872a;
    color: white;
    width: 75px;
    height: 55px;
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
