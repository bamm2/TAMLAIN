import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  // object-fit: contain;
  width: 150px;
  height: 150px;
  box-shadow: 0 17px 20px -18px rgba(0, 0, 0, 1);
  border-radius: 5px;
  :hover {
    width: 153px;
    height: 153px;
    transition: 0.2s;
  }
`;

export const ImgContainer = styled.img`
  width: 100%;
  height: 100%;
  background-color: green;
  border-radius: 6px;
  cursor: pointer;
`;

export const ExitButton = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 10px;
  // font-weight: bold;
  transform: translate(-10%, 20%);
  cursor: pointer;
  left: 2%;
`;

export const Category = styled.span`
  position: absolute;
  top: 3%;
  right: 4%;
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
  cursor: pointer;
  border-radius: 5px;
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
  left: 37%;
  width: 20px;
  height: 20px;
  z-index: 5;
`;

export const StarNum = styled.div`
  position: absolute;
  top: 47%;
  right: 36%;
  color: #ffffff;
  // font-weight: bold;
  z-index: 5;
`;

export const Flag = styled.div`
  position: absolute;
  top: 65%;
  left: 45%;
  font-size: 20px;
  // background-color: blue;
  z-index: 5;
  cursor: pointer;
`;

export const FlagImg = styled.img`
  width: 20px;
  height: 25px;
  :hover {
    width: 25px;
    height: 30px;
    transition: 0.3s;
  }
`;
