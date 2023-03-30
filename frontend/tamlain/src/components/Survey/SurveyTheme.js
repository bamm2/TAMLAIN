import * as S from "./SurveyTheme.styled";
import { Link } from "react-router-dom";

const SurveyTheme = () => {
  return (
    <div>
      <Link to="/surveyCar">
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
          <input id="radio-1" type="radio" name="theme" value="photo" />
          <label htmlFor="radio-1">#인생사진 찰칵찰칵 📷</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input id="radio-2" type="radio" name="theme" value="sea" />
          <label htmlFor="radio-2">#바닷가와 함께 🌊</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input id="radio-3" type="radio" name="theme" value="drive" />
          <label htmlFor="radio-3">#시원한 드라이브 🚗</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input id="radio-4" type="radio" name="theme" value="inside" />
          <label htmlFor="radio-4">#실내에서 주로 🏛</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input id="radio-5" type="radio" name="theme" value="camping" />
          <label htmlFor="radio-5">#캠핑 즐기기 ⛺</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input id="radio-6" type="radio" name="theme" value="natural" />
          <label htmlFor="radio-6">#자연과 함께 휴양 🌳</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input id="radio-7" type="radio" name="theme" value="pet" />
          <label htmlFor="radio-7">#반려동물과 함께 🐶</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input id="radio-8" type="radio" name="theme" value="tv" />
          <label htmlFor="radio-8">#TV 속 그 장소 📺</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input id="radio-9" type="radio" name="theme" value="food" />
          <label htmlFor="radio-9">#맛집 탐방 🍴</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input id="radio-10" type="radio" name="theme" value="sport" />
          <label htmlFor="radio-10">#짜릿한 스포츠 활동 🏄</label>
        </S.FormBtn>
      </S.Theme>
    </div>
  );
};
export default SurveyTheme;
