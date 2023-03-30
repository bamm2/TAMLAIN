import * as S from "./SurveyCar.styled";
import { Link } from "react-router-dom";

const SurveyCar = () => {
  return (
    <div>
      <Link to="/surveyWithWho">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyTheme">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
      <S.Car>
        <S.FormBtn>
          <input id="radio-1" type="radio" name="car" value="true" />
          <label htmlFor="radio-1">🍊 예</label>
        </S.FormBtn>
        <S.FormBtn>
          <input id="radio-2" type="radio" name="car" value="false" />
          <label htmlFor="radio-2">🍊 아니오</label>
        </S.FormBtn>
      </S.Car>
    </div>
  );
};
export default SurveyCar;
