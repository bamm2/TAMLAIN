import styled from "styled-components";

export const BackBtn = styled.img`
  float: left;
  width: 25px;
  height: 40px;
  margin-top: 7.5%;
  margin-left: 25px;
`;

export const SearchInput = styled.input`
  float: left;
  width: 83%;
  height: 50px;
  margin-left: 25px;
  margin-top: 7%;
  border: 1px solid #eae7e7;
  border-radius: 5px;
  padding-left: 10px;
  box-shadow: 1px 1px 3px 1px #dadce0;

  :focus {
    border-color: #fc872a;
    outline: none;
  }
`;

export const SearchIcon = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 12.5%;
  right: 8%;
  cursor: pointer;
`;
