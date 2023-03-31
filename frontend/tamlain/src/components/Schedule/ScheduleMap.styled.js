import styled from "styled-components";

export const SearchBtn = styled.div`
  float: left;
  position: relative;
  width: 80%;
  height: 60px;
  background-color: #f5f5f5;
  margin-top: 1%;
  border: 1px solid #eae7e7;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px #dadce0;
  display: flex;
`;

export const SearchIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 93%;
  margin-top: 3%;
`;

export const RecommBtn = styled.span`
  position: relative;
  float: left;
  width: 15%;
  height: 60px;
  font-size: 17px;
  color: #fc872a;
  margin-left: 3%;
  margin-top: 3%;
`;

export const BackBtn = styled.img`
  float: left;
  width: 25px;
  height: 40px;
  margin-top: 7.5%;
  margin-left: 25px;
`;

// export const RegistBtn = styled.button`
//   margin-top: 10px;
//   margin-left: 81%;
//   width: 130px;
//   height: 40px;
//   background-color: #32b64f;
//   border: none;
//   color: #fff;
//   font-weight: bold;
//   font-size: 15px;
//   border-radius: 10px;
// `;

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
