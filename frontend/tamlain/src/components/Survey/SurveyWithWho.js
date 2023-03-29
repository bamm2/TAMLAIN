import * as S from "./SurveyWithWho.styled";
import { Link } from "react-router-dom";

const SurveyWithWho = () => {
  return (
    <div>
      <Link to="/surveyGenderAndAge">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyCar">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
      <S.WithWho>
        <S.FormBtn>
          <input id="radio-1" type="radio" name="who" value="alone" />
          <label htmlFor="radio-1">🍊 나혼자 여행</label>
        </S.FormBtn>
        <S.FormBtn>
          <input id="radio-2" type="radio" name="who" value="couple" />
          <label htmlFor="radio-2">🍊 연인과 함께</label>
        </S.FormBtn>
        <S.FormBtn>
          <input id="radio-3" type="radio" name="who" value="child" />
          <label htmlFor="radio-3">🍊 아이와 함께</label>
        </S.FormBtn>
        <S.FormBtn>
          <input id="radio-4" type="radio" name="who" value="friend" />
          <label htmlFor="radio-4">🍊 친구와 함께</label>
        </S.FormBtn>
        <S.FormBtn>
          <input id="radio-5" type="radio" name="who" value="parent" />
          <label htmlFor="radio-5">🍊 부모님과 함께</label>
        </S.FormBtn>
      </S.WithWho>
    </div>
  );
};
export default SurveyWithWho;
