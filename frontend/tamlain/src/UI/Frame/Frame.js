import { Outlet, useOutlet } from "react-router-dom";
import * as S from "./Frame.styled";
const Frame = () => {
  const dayIdx = useOutlet();
  return (
    <S.Frame>
      <S.FrameContainer>
        <S.FrameIcon></S.FrameIcon>
        <Outlet context={dayIdx} />
      </S.FrameContainer>
    </S.Frame>
  );
};
export default Frame;
