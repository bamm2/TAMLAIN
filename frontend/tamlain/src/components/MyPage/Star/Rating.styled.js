import styled from "styled-components";

export const Stars = styled.div`
  display: flex;
  margin-top: 4.5%;
  margin-left: 5%;

  & svg {
    margin-right: 3%;
    color: gray;
    cursor: pointer;
    text-shadow: 0 0 3px #fc872a;
  }

  .yellowStar {
    color: #fc872a;
  }
`;
