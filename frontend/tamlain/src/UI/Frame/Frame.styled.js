import styled from "styled-components";

export const Frame = styled.div`
  display: flex;
  justify-content: center;
`;

export const FrameContainer = styled.div`
  width: 50%;
  height: 75%;
  position: absolute;
  z-index: 3;
  margin-top: 210px;
  display: table-cell;
  // text-align: end;
  vertical-align: middle;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const FrameIcon = styled.div`
  position: absolute;
  width: 138px;
  height: 9px;
  left: 320px;
  top: 10px;
  z-index: 5;
  background: #d9d9d9;
  border-radius: 50px;
`;
