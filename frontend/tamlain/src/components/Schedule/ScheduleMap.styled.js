import styled from "styled-components";

export const SearchBtn = styled.div`
  float: left;
  position: relative;
  width: 79.5%;
  height: 60px;
  background-color: #f5f5f5;
  margin-top: 1%;
  border: 1px solid #eae7e7;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px #dadce0;
  display: flex;
  cursor: pointer;
`;

export const SearchIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 93%;
  margin-top: 3%;
  cursor: pointer;
`;

export const RecommBtn = styled.span`
  position: relative;
  float: left;
  width: 15%;
  height: 25px;
  padding: 22px 6px 17px 6px;
  font-size: 17px;
  text-align: center;
  color: #fc872a;
  margin-left: 2.5%;
  margin-top: 1%;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    font-size: 18px;
    transition: 0.3s;
    background-color: #fc872a;
    color: #fff;
  }
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

export const EmptySpace = styled.div`
  color: #fc872a;
  text-align: center;
  position: relative;
  transform: translateY(450%);
`;
