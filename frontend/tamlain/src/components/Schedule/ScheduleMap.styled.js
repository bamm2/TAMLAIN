import styled from "styled-components";

export const SearchBtn = styled.div`
  float: left;
  width: 77%;
  height: 100%;
  margin-left: 10px;
  margin-top: 10px;
  border: 1px solid #eae7e7;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px #dadce0;
`;

export const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const RecommBtn = styled.div`
  float: left;
  width: 20%;
  height: 100%;
`;

export const BackBtn = styled.img`
  float: left;
  width: 25px;
  height: 40px;
  margin-top: 7.5%;
  margin-left: 25px;
`;

export const RegistBtn = styled.button`
  margin-top: 10px;
  margin-left: 81%;
  width: 130px;
  height: 40px;
  background-color: #32b64f;
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 10px;
`;

export const Div = styled.div`
  float: left;
  width: 20%;
  height: 350px;
  background-color: #f9f9f9;
  overflow: auto;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;
