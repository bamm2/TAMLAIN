import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  // object-fit: contain;
  height: 150px;

  // background-color: blue;
`;

export const ImgContainer = styled.img`
  width: 100%;
  height: 100%;
  background-color: green;
  border-radius: 6px;
`;

export const ExitButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1px;
  transform: translate(-10%, 20%);
  cursor: pointer;
`;

export const Category = styled.span`
  position: absolute;
  top: 2px;
  right: 4px;
  color: white;
  font-size: 1px;
`;

export const Filter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 3;
  background-color: #3a3a3a;
  // background: rgba (255, 0, 0, 0.5);
`;

export const ReDirectText = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  height: 5px;
  // font-weight: bold;
  color: #ffffff;
  // background-color: blue;
  text-align: center;
  z-index: 5;
  cursor: pointer;
`;

export const LinkKakao = styled.a`
  text-decoration-line: none;
  color: #fff;
  &:hover {
    color: #fc872a;
  }
`;

export const StarImg = styled.img`
  position: absolute;
  top: 45%;
  left: 40%;
  width: 20px;
  height: 20px;
  z-index: 5;
`;

export const StarNum = styled.div`
  position: absolute;
  top: 47%;
  right: 40%;
  color: #ffffff;
  // font-weight: bold;
  z-index: 5;
`;

export const Flag = styled.div`
  position: absolute;
  top: 65%;
  left: 42.5%;
  width: 20px;
  height: 20px;
  font-size: 20px;
  // background-color: blue;
  z-index: 5;
  cursor: pointer;
`;
