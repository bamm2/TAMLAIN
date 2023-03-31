import * as S from "./SurveyRest.styled";
import { Link } from "react-router-dom";
import { surveyApi } from "../../utils/api/surveyApi";
import moment from "moment/moment";

const SurveyRest = () => {
  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');
    selectall.checked = true;
    if (e.target.checked === false) {
      selectall.checked = false;
      return;
    }
    const checkboxes = document.getElementsByName("rest");
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
    const checkboxes = document.getElementsByName("rest");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  const registSurvey = () => {
    registForm();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const dateController = new Date();
    let year = dateController.getFullYear(); // 년도
    let month = dateController.getMonth() + 1; // 월
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let date = dateController.getDate();
    if (parseInt(date) < 10) {
      date = "0" + date;
    }

    const EndDateController = new Date(
      moment(new Date().setDate(new Date().getDate() + 4)).format("YYYY-MM-DD")
    );
    console.log(EndDateController);
    let Eyear = EndDateController.getFullYear(); // 년도
    let Emonth = EndDateController.getMonth() + 1; // 월
    if (parseInt(Emonth) < 10) {
      Emonth = "0" + Emonth;
    }
    let Edate = EndDateController.getDate();
    if (parseInt(Edate) < 10) {
      Edate = "0" + Edate;
    }

    //2007-12-03 10:15
    const startDate = `${year}-${month}-${date}`;
    const endDate = `${Eyear}-${Emonth}-${Edate}`;

    const theme = JSON.parse(localStorage.getItem("Theme"));

    const arr = {
      1: JSON.parse(localStorage.getItem("Food")),
      2: JSON.parse(localStorage.getItem("Cafe")),
      3: JSON.parse(localStorage.getItem("Activity")),
      4: JSON.parse(localStorage.getItem("Sport")),
      5: JSON.parse(localStorage.getItem("Exhibition")),
      6: JSON.parse(localStorage.getItem("Rest")),
    };
    console.log(userId);
    console.log(startDate);
    console.log(endDate);
    console.log(theme);
    console.log(arr);

    const data = {
      userId: parseInt(userId),
      startDate: startDate,
      endDate: endDate,
      travelTheme: theme,
      surveyFavorCategoryMap: arr,
    };
    // const data = {
    //   userId: 1,
    //   startDate: "2023-03-01",
    //   endDate: "2023-03-04",
    //   travelTheme: "history",
    //   surveyFavorCategoryMap: {
    //     1: ["양식", "한식"],
    //     2: ["카페"],
    //     3: [],
    //     4: [],
    //     5: [],
    //     6: ["공원", "도보"],
    //   },
    // };
    console.log(data);
    console.log(token);
    surveyApi(token, data).then((res) => {
      console.log(res);
    });
  };

  const registForm = () => {
    const selectedEls = document.querySelectorAll('input[name="rest"]:checked');
    const arr = [];
    selectedEls.forEach((el) => {
      arr.push(el.value);
    });
    localStorage.setItem("Rest", JSON.stringify(arr));
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
      {/* <Link to="/loading"> */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
        alt="다음으로"
        style={{ marginLeft: "190px" }}
        onClick={registSurvey}
      />
      {/* </Link> */}
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
          <label htmlFor="radio-3">🍊 올레길</label>
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
