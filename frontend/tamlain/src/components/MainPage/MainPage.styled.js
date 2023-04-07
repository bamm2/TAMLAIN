import styled from "styled-components";

export const Container = styled.div`
  background-size: cover;
  // background-color: #bbbbbb;
  position: absolute;
  height: 100%;
  width: 50%;
  left: 25%;
  z-index: 1;
  @media all and (min-width: 412px) and (max-width: 760px) {
    width: 100%;
    left: 0%;
  }
  @media all and (min-width: 390px) and (max-width: 411px) {
    width: 100%;
    left: 0%;
  }
  @media all and (max-width: 389px) {
    width: 100%;
    left: 0%;
  }
`;

export const CarouselContainer = styled.div`
  background-size: contain;
  height: 50%;
  width: 100%;
  // background-color: gray;
  @media all and (min-width: 412px) and (max-width: 760px) {
    width: 100%;
    height: 20%;
  }
  @media all and (min-width: 390px) and (max-width: 411px) {
    width: 100%;
    left: 0%;
  }
  @media all and (max-width: 389px) {
    width: 100%;
    left: 0%;
  }
`;
