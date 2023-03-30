import * as S from "./SurveyRest.styled";
import { Link } from "react-router-dom";

const SurveyRest = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');

    if (e.target.checked === false) {
      selectall.checked = false;
    }
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("rest");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };
  return (
    <div>
      <Link to="/surveyExhibition">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/loading">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
      <S.Rest>
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
          style={{ marginRight: "550px", marginTop: "2.5px", color: "#666" }}
        >
          전체선택
        </div>
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-1"
            type="checkbox"
            name="rest"
            value="park"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-1">🍊 공원</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-2"
            type="checkbox"
            name="rest"
            value="walk"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-2">🍊 도보</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-3"
            type="checkbox"
            name="rest"
            value="site"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-3">🍊 문화유적</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-4"
            type="checkbox"
            name="rest"
            value="mountain"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-4">🍊 산</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-5"
            type="checkbox"
            name="rest"
            value="island"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-5">🍊 섬</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-6"
            type="checkbox"
            name="rest"
            value="garden"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-6">🍊 식물원</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-7"
            type="checkbox"
            name="rest"
            value="oreum"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-7">🍊 오름</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-8"
            type="checkbox"
            name="rest"
            value="beach"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-8">🍊 해변</label>
        </S.FormBtn>
        <S.FormBtn style={{ marginLeft: "55px" }}>
          <input
            id="radio-9"
            type="checkbox"
            name="rest"
            value="onsen"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-9">🍊 온천</label>
        </S.FormBtn>
        <br />
        <br />
        <br />
        <S.FormBtn style={{ marginLeft: "100px" }}>
          <input
            id="radio-10"
            type="checkbox"
            name="rest"
            value="natural"
            onClick={checkSelectAll}
          />
          <label htmlFor="radio-10">🍊 자연생태</label>
        </S.FormBtn>
      </S.Rest>
    </div>
  );
};
export default SurveyRest;
