import styled from "styled-components";

export const NavFrame = styled.div`
  position: absolute;
  height: 8%;
  width: 50%;
  left: 25%;
  z-index: 10;
  margin: 0;
`;

export const NavContainer = styled.div`
  margin: 5px 5px 10px 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;

  z-index: 10;
`;

export const RightContainer = styled.div`
  font-size: 0.5rem;
  margin: 5px 20px 10px 10px;
  display: flex;
  color: white;

  z-index: 10;
`;

export const RightItem = styled.div`
  margin-right: 2px;
  margin-left: 3px;
  margin-top: 10px;

  z-index: 10;
  cursor: pointer;
`;

export const ExitLogoImg = styled.img`
  width: 10px;
  height: 10px;
  margin-top: 10px;
  margin-left: 2px;
  object-fit: contain;
  cursor: pointer;

  z-index: 10;
`;

export const MainLogoImg = styled.img`
  width: 70px;
  height: 30px;
  object-fit: contain;
  cursor: pointer;

  z-index: 10;
`;
