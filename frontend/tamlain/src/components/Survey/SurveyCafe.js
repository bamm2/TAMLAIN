import * as S from "./SurveyCafe.styled";
import { Link } from "react-router-dom";

const SurveyCafe = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');

    if (e.target.checked === false) {
      selectall.checked = false;
    }
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("cafe");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };
  return (
    <div>
      <Link to="/surveyFood">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyActivity">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
      <S.Cafe>
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
            name="cafe"
            value="cafe"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-1">🍊 카페</label>
        </S.FormBtn>
        <S.FormBtn>
          <input
            id="radio-2"
            type="checkbox"
            name="cafe"
            value="specialcafe"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-2">🍊 이색카페</label>
        </S.FormBtn>
        <S.FormBtn>
          <input
            id="radio-3"
            type="checkbox"
            name="cafe"
            value="dessert"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-3">🍊 디저트</label>
        </S.FormBtn>
      </S.Cafe>
    </div>
  );
};
export default SurveyCafe;
