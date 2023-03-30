import * as S from "./SurveyActivity.styled";
import { Link } from "react-router-dom";

const SurveyActivity = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');

    if (e.target.checked === false) {
      selectall.checked = false;
    }
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("activity");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };
  return (
    <div>
      <Link to="/surveyCafe">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveySport">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
      <S.Activity>
        <S.FormAllBtn>
          <input
            id="selectAll"
            type="checkbox"
            name="selectall"
            value="selectall"
            onClick={selectAll}
          />
          <label
            id="labelAll"
            htmlFor="selectAll"
            style={{ marginLeft: "100px" }}
          ></label>
        </S.FormAllBtn>
        <div
          style={{ marginRight: "550px", marginTop: "2.5px", color: "#666" }}
        >
          전체선택
        </div>
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-1"
            type="checkbox"
            name="activity"
            value="theme"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-1">🍊 테마체험</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-2"
            type="checkbox"
            name="activity"
            value="local"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-2">🍊 민속촌</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-3"
            type="checkbox"
            name="activity"
            value="horse"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-3">🍊 승마</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-4"
            type="checkbox"
            name="activity"
            value="zoo"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-4">🍊 동물원</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-5"
            type="checkbox"
            name="activity"
            value="farm"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-5">🍊 관광농원</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-6"
            type="checkbox"
            name="activity"
            value="science"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-6">🍊 과학</label>
        </S.FormBtn>
      </S.Activity>
    </div>
  );
};
export default SurveyActivity;
