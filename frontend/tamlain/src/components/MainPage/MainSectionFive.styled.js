import styled from "styled-components";

export const Container = styled.div`
  height: 30vh;
  background: #faa15a;
  position: relative;
`;

export const Button = styled.button`
  position: absolute;

  color: #ffffff;
  width: 320px;
  height: 70px;
  box-shadow: 0 0 0 3px #ffffff;
  border-radius: 20px;
  border: none;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin: 85px 0 0 230px;
  cursor: pointer;

  :hover {
    background-color: #fff;
    transition: 0.5s;
    color: #fc872a;
  }
  @media all and (min-width: 412px) and (max-width: 760px) {
    width: 250px;
    height: 70px;
    margin-left: 21%;
    margin-top: 27%;
  }
`;
