import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin-top: 70px;
  background-color: #fff;
  padding-left: 32px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryName = styled.span`
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #343a40;
`;

export const CarouselContainer = styled.div`
  margin-top: 20px;
  // height: 20vh;
`;

export const BtnNext = styled.img`
  z-index: 99;
  width: 15px;
  height: 15px;
  right: 5px;
  object-fit: cover;
`;

export const BtnPre = styled.img`
  z-index: 99;
  width: 15px;
  height: 15px;
  object-fit: cover;
`;
