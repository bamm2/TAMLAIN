import * as S from "./SurveyGenderAndAge.styled";
import { Link } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { surveyActions } from "../../store/survey";

const SurveyGenderAndAge = () => {
  // const dispatch = useDispatch();
  // const genderHandler = () => {
  //   const genderNodeList = document.getElementsByName("gender");

  //   genderNodeList.forEach((node) => {
  //     if (node.checked) {
  //       dispatch(surveyActions.setGender(node.value));
  //     } else {
  //       //유효성검사(귀찮아서 안함)
  //     }
  //   });
  // };
  // const ageHandler = () => {
  //   const genderNodeList = document.getElementsByName("age");

  //   genderNodeList.forEach((node) => {
  //     if (node.checked) {
  //       dispatch(surveyActions.setAge(parseInt(node.value)));
  //     } else {
  //       //유효성검사(귀찮아서 안함)
  //     }
  //   });
  // };
  return (
    <div>
      <Link to="/surveyCalendar">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyWithWho">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
      <S.GenderAndAge>
        <div
          style={{
            marginBottom: "20px",
            color: "#646464",
          }}
        >
          성별
        </div>
        <S.FormGenderBtn style={{ marginLeft: "200px" }}>
          <input id="gender-1" type="radio" name="userSex" value="male" />
          <label htmlFor="gender-1">🍊 남성</label>
        </S.FormGenderBtn>
        <S.FormGenderBtn style={{ marginLeft: "70px" }}>
          <input id="gender-2" type="radio" name="userSex" value="female" />
          <label htmlFor="gender-2">🍊 여성</label>
        </S.FormGenderBtn>
        <div
          style={{ marginTop: "150px", marginBottom: "20px", color: "#646464" }}
        >
          나이
        </div>
        <S.FormAgeBtn style={{ marginLeft: "100px" }}>
          <input id="radio-1" type="radio" name="userAge" value="10" />
          <label htmlFor="radio-1">🌴 10대</label>
        </S.FormAgeBtn>
        <S.FormAgeBtn style={{ marginLeft: "55px" }}>
          <input id="radio-2" type="radio" name="userAge" value="20" />
          <label htmlFor="radio-2">🌴 20대</label>
        </S.FormAgeBtn>
        <S.FormAgeBtn style={{ marginLeft: "55px" }}>
          <input id="radio-3" type="radio" name="userAge" value="20" />
          <label htmlFor="radio-3">🌴 30대</label>
        </S.FormAgeBtn>
        <br />
        <br />
        <br />
        <S.FormAgeBtn style={{ marginLeft: "100px" }}>
          <input id="radio-4" type="radio" name="userAge" value="20" />
          <label htmlFor="radio-4">🌴 40대</label>
        </S.FormAgeBtn>
        <S.FormAgeBtn style={{ marginLeft: "55px" }}>
          <input id="radio-5" type="radio" name="userAge" value="20" />
          <label htmlFor="radio-5">🌴 50대</label>
        </S.FormAgeBtn>
        <S.FormAgeBtn style={{ marginLeft: "55px" }}>
          <input id="radio-6" type="radio" name="userAge" value="20" />
          <label htmlFor="radio-6">🌴 60대</label>
        </S.FormAgeBtn>
      </S.GenderAndAge>
    </div>
  );
};
export default SurveyGenderAndAge;
