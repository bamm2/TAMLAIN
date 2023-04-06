import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin-top: 30px;
  background-color: #f1efef;
`;

export const CategoryName = styled.span`
  margin-left: 25px;
`;

export const CarouselContainer = styled.div`
  // height: 20vh;
  // background-color: red;
`;

export const BtnNext = styled.img`
  z-index: 99;
  width: 15px;
  height: 15px;
  right: 12px;
  object-fit: cover;
`;

export const BtnPre = styled.img`
  z-index: 99;
  left: 6px;
  width: 15px;
  height: 15px;
  object-fit: cover;
`;
