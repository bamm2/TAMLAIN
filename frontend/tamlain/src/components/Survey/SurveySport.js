import * as S from "./SurveySport.styled";
import { Link } from "react-router-dom";

const SurveySport = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');
    selectall.checked = true;
    if (e.target.checked === false) {
      selectall.checked = false;
      return;
    }
    const checkboxes = document.getElementsByName("sport");
    console.log(checkboxes);

    checkboxes.forEach((checkbox) => {
      console.log(checkbox.checked);
      if (checkbox.checked === false) {
        selectall.checked = false;
        return;
      }
    });
    if (!selectall.checked) {
      return;
    }
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("sport");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  const registForm = () => {
    const selectedEls = document.querySelectorAll(
      'input[name="sport"]:checked'
    );
    const arr = [];
    selectedEls.forEach((el) => {
      arr.push(el.value);
    });
    localStorage.setItem("Sport", JSON.stringify(arr));
  };

  return (
    <div>
      <Link to="/surveyActivity">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyExhibition">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
          onClick={registForm}
        />
      </Link>
      <S.Sport>
        <S.FormAllBtn>
          <input
            id="selectAll"
            type="checkbox"
            name="selectall"
            value="selectall"
            onClick={selectAll}
          />
          <label id="labelAll" htmlFor="selectAll"></label>
        </S.FormAllBtn>
        <div
          style={{ marginRight: "650px", marginTop: "2.5px", color: "#666" }}
        >
          전체선택
        </div>
        <br />
        <S.FormBtn>
          <input
            id="radio-1"
            type="checkbox"
            name="sport"
            value="golf"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-1">🍊 골프</label>
        </S.FormBtn>
        <S.FormBtn>
          <input
            id="radio-2"
            type="checkbox"
            name="sport"
            value="bike"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-2">🍊 자전거</label>
        </S.FormBtn>
        <S.FormBtn>
          <input
            id="radio-3"
            type="checkbox"
            name="sport"
            value="ocean"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-3">🍊 해양</label>
        </S.FormBtn>
      </S.Sport>
    </div>
  );
};
export default SurveySport;
