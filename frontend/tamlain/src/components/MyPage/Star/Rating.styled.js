import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 20%;
  margin-top: 20px;
  display: flex;
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 30px;
`;

export const PlaceName = styled.div`
  float: left;
  margin-right: 30px;
  font-size: 20px;
`;

export const Wrap = styled.div`
  //   margin-top: 10px;
  flex-direction: column;
  padding-top: 15px;
`;

export const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
    text-shadow: 0 0 3px #fc872a;
  }

  :hover svg {
    color: #fc872a;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fc872a;
  }
`;
