import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  top: 50%;
  // width: 100%;
  // height: 50%;
  background-color: #f1efef;
`;

export const CategoryName = styled.span`
  margin-left: 25px;
`;

export const ReRecommendBtn = styled.button`
  display: inline-block;
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export const CarouselContainer = styled.div`
  // height: 20vh;
  // background-color: red;
`;

export const BtnNext = styled.img`
  z-index: 99;
  width: 8px;
  height: 8px;
  right: 12px;
  object-fit: cover;
`;

export const BtnPre = styled.img`
  z-index: 99;
  left: 6px;
  width: 8px;
  height: 8px;
  object-fit: cover;
`;
