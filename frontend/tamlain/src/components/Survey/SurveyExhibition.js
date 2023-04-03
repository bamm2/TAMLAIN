import * as S from "./SurveyExhibition.styled";
import { Link } from "react-router-dom";

const SurveyExhibition = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');
    selectall.checked = true;
    if (e.target.checked === false) {
      selectall.checked = false;
      return;
    }
    const checkboxes = document.getElementsByName("exhibition");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === false) {
        selectall.checked = false;
        return;
      }
    });
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("exhibition");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };
  const registForm = () => {
    const selectedEls = document.querySelectorAll(
      'input[name="exhibition"]:checked'
    );
    const arr = [];
    selectedEls.forEach((el) => {
      arr.push(el.value);
    });
    localStorage.setItem("Exhibition", JSON.stringify(arr));
  };
  return (
    <div>
      <Link to="/surveySport">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyRest">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
          onClick={registForm}
        />
      </Link>
      <S.Exhibition>
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
            name="exhibition"
            value="공연/연극"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-1">🍊 공연장</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-2"
            type="checkbox"
            name="exhibition"
            value="기념관"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-2">🍊 기념관</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-3"
            type="checkbox"
            name="exhibition"
            value="미술관"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-3">🍊 미술관</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-4"
            type="checkbox"
            name="exhibition"
            value="박물관"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-4">🍊 박물관</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-5"
            type="checkbox"
            name="exhibition"
            value="전시관"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-5">🍊 전시관</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-6"
            type="checkbox"
            name="exhibition"
            value="문화유적"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-6">🍊 문화유적</label>
        </S.FormBtn>
      </S.Exhibition>
    </div>
  );
};
export default SurveyExhibition;
