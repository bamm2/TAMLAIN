import * as S from "./SurveyFood.styled";
import { Link } from "react-router-dom";

const SurveyFood = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');
    selectall.checked = true;
    if (e.target.checked === false) {
      selectall.checked = false;
      return;
    }
    const checkboxes = document.getElementsByName("food");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === false) {
        selectall.checked = false;
        return;
      }
    });
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("food");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };
  const registForm = () => {
    const selectedEls = document.querySelectorAll('input[name="food"]:checked');
    const arr = [];
    selectedEls.forEach((el) => {
      arr.push(el.value);
    });
    localStorage.setItem("Food", JSON.stringify(arr));
  };
  return (
    <div>
      <Link to="/surveyTheme">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyCafe">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
          onClick={registForm}
        />
      </Link>
      <S.Food>
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
          style={{
            marginRight: "550px",
            marginTop: "2.5px",
            color: "#666",
          }}
        >
          전체선택
        </div>
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-1"
            type="checkbox"
            name="food"
            value="한식"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-1">🍊 한식</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-2"
            type="checkbox"
            name="food"
            value="일식"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-2">🍊 일식</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-3"
            type="checkbox"
            name="food"
            value="중식"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-3">🍊 중식</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-4"
            type="checkbox"
            name="food"
            value="양식"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-4">🍊 양식</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-5"
            type="checkbox"
            name="food"
            value="분식"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-5">🍊 분식</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-6"
            type="checkbox"
            name="food"
            value="아시아"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-6">🍊 아시아</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-7"
            type="checkbox"
            name="food"
            value="뷔페/레스토랑"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-7">🍊 뷔페</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-8"
            type="checkbox"
            name="food"
            value="퓨전"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-8">🍊 퓨전</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-9"
            type="checkbox"
            name="food"
            value="술집"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-9">🍊 술집</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-10"
            type="checkbox"
            name="food"
            value="샤브샤브"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-10">🍊 샤브샤브</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-11"
            type="checkbox"
            name="food"
            value="치킨"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-11">🍊 치킨</label>
        </S.FormBtn>
      </S.Food>
    </div>
  );
};
export default SurveyFood;
