import * as S from "./SurveyActivity.styled";
import { Link } from "react-router-dom";

const SurveyActivity = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');
    selectall.checked = true;
    if (e.target.checked === false) {
      selectall.checked = false;
      return;
    }
    const checkboxes = document.getElementsByName("activity");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === false) {
        selectall.checked = false;
        return;
      }
    });
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("activity");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };
  const registForm = () => {
    const selectedEls = document.querySelectorAll(
      'input[name="activity"]:checked'
    );
    const arr = [];
    selectedEls.forEach((el) => {
      arr.push(el.value);
    });
    localStorage.setItem("Activity", JSON.stringify(arr));
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
          onClick={registForm}
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
            value="테마체험"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-1">🍊 테마체험</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-2"
            type="checkbox"
            name="activity"
            value="유원지/민속촌"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-2">🍊 민속촌</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-3"
            type="checkbox"
            name="activity"
            value="승마"
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
            value="동물원"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-4">🍊 동물원</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-5"
            type="checkbox"
            name="activity"
            value="관광농원"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-5">🍊 관광농원</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-6"
            type="checkbox"
            name="activity"
            value="과학"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-6">🍊 과학</label>
        </S.FormBtn>
      </S.Activity>
    </div>
  );
};
export default SurveyActivity;
