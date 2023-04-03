import * as S from "./MainSectionFive.styled";
import useScrollFadeIn from "./useScrollFadeIn";
import { useNavigate } from "react-router-dom";

const MainSectionFive = () => {

  const navigate = useNavigate();

  const animatedItem = useScrollFadeIn("up", 1, 0.3);
  const key = localStorage.getItem("token");


  const reDirectPage = () => {
    if (key !== null) {
      navigate("/surveyCalendar");
    } else {
      navigate("/login");
    }
  }

  return (
    <S.Container>
      <S.Button {...animatedItem} onClick={reDirectPage}>탐라인 이용하기</S.Button>
    </S.Container>
  );
};

export default MainSectionFive;
