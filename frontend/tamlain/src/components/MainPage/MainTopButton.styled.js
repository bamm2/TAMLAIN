import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  right: 2%;
  bottom: 4%;
  z-index: 1;
`;

export const Button = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 5px 10px;
  background-color: #f5f5f5;
  color: #3a3a3a;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;

  :hover {
    background-color: #3a3a3a;
    color: #f5f5f5;
  }
`;
