import * as S from "./SurveyTheme.styled";
import { Link } from "react-router-dom";

const SurveyTheme = () => {
  return (
    <div>
      <Link to="/surveyCalendar">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyFood">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
      <S.Theme>
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-1"
            type="radio"
            name="theme"
            value="photo"
          />
          <label htmlFor="radio-1">
            #친구와 인생사진 찰칵 📷
          </label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-2"
            type="radio"
            name="theme"
            value="sea"
          />
          <label htmlFor="radio-2">
            #연인과 추억 만들기 🏄
          </label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-3"
            type="radio"
            name="theme"
            value="drive"
          />
          <label htmlFor="radio-3">
            #가족과 행복한 여행 🚗
          </label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-4"
            type="radio"
            name="theme"
            value="inside"
          />
          <label htmlFor="radio-4">
            #반려동물과 제주로 🐶
          </label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-5"
            type="radio"
            name="theme"
            value="camping"
          />
          <label htmlFor="radio-5">
            #제주 역사 속으로 ⛺
          </label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-6"
            type="radio"
            name="theme"
            value="natural"
          />
          <label htmlFor="radio-6">#자연과 힐링 🌳</label>
        </S.FormBtn>
      </S.Theme>
    </div>
  );
};
export default SurveyTheme;
