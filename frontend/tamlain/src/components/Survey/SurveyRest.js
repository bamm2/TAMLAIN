import * as S from "./SurveyRest.styled";
import { Link } from "react-router-dom";
import { surveyApi } from "../../utils/api/surveyApi";
import moment from "moment/moment";
import client from "../../utils/client";
import { useEffect } from "react";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const SurveyRest = () => {
  useEffect(() => {
    const checkboxes = document.getElementsByName("rest");
    const checkArr = JSON.parse(localStorage.getItem("Rest"));
    if (checkArr === null) {
      return;
    }
    for (let j = 0; j < checkArr.length; j++) {
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value === checkArr[j]) {
          checkboxes[i].checked = true;
        }
      }
    }
  }, []);

  const checkSelectAll = (e) => {
    const selectall = document.querySelector('input[name="selectall"]');
    selectall.checked = true;
    if (e.target.checked === false) {
      selectall.checked = false;
      return;
    }
    const checkboxes = document.getElementsByName("rest");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === false) {
        selectall.checked = false;
        return;
      }
    });
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
    const startDate = localStorage.getItem("startDate");
    const endDate = localStorage.getItem("endDate");

    const theme = JSON.parse(localStorage.getItem("Theme"));

    const arr = {
      1: JSON.parse(localStorage.getItem("Food")),
      2: JSON.parse(localStorage.getItem("Cafe")),
      3: JSON.parse(localStorage.getItem("Activity")),
      4: JSON.parse(localStorage.getItem("Sport")),
      5: JSON.parse(localStorage.getItem("Exhibition")),
      6: JSON.parse(localStorage.getItem("Rest")),
    };

    const id = localStorage.getItem("id");
    const data = {
      userId: id,
      startDate: startDate,
      endDate: endDate,
      travelTheme: theme,
      surveyFavorCategoryMap: arr,
    };
    console.log(data);
    surveyApi(token, data).then((res) => {
      console.log(res);
      if (res.data.success) {
        const surveyId = res.data.data;
        localStorage.setItem("surveyId", JSON.stringify(surveyId));
      } else {
        const page = res.data.data;
        console.log(`${client.defaults.url}/surveyCalendar`);
        alert(res.data.message);
        if (page === 1) {
          window.location.href = `${client.defaults.url}/surveyCalendar`;
        } else if (page === 2) {
          window.location.href = `${client.defaults.url}/surveyTheme`;
        } else if (page === 3) {
          window.location.href = `${client.defaults.url}/surveyFood`;
        } else if (page === 4) {
          window.location.href = `${client.defaults.url}/surveyCafe`;
        } else if (page === 5) {
          window.location.href = `${client.defaults.url}/surveyActivity`;
        } else if (page === 6) {
          window.location.href = `${client.defaults.url}/surveySport`;
        } else if (page === 7) {
          window.location.href = `${client.defaults.url}/surveyExhibition`;
        } else if (page === 8) {
          window.location.href = `${client.defaults.url}/surveyRest`;
        }
        return;
      }
      localStorage.removeItem("Rest");
      localStorage.removeItem("Food");
      localStorage.removeItem("Sport");
      localStorage.removeItem("Cafe");
      localStorage.removeItem("Exhibition");
      localStorage.removeItem("Activity");
      localStorage.removeItem("Theme");
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      window.location.href = `${client.defaults.url}/loading`;
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
      <img
        src={`${process.env.PUBLIC_URL}/assets/Icon/recommBtn.png`}
        alt="다음으로"
        style={{ marginLeft: "190px", cursor: "pointer" }}
        onClick={registSurvey}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
              name="rest"
              value="공원"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-1">🍊 공원</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input
              id="radio-2"
              type="checkbox"
              name="rest"
              value="도보"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-2">🍊 도보</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input
              id="radio-3"
              type="checkbox"
              name="rest"
              value="올레길"
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
              value="산"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-4">🍊 산</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input
              id="radio-5"
              type="checkbox"
              name="rest"
              value="섬"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-5">🍊 섬</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input
              id="radio-6"
              type="checkbox"
              name="rest"
              value="수목원/식물원"
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
              value="오름"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-7">🍊 오름</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input
              id="radio-8"
              type="checkbox"
              name="rest"
              value="해변"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-8">🍊 해변</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input
              id="radio-9"
              type="checkbox"
              name="rest"
              value="온천"
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
              value="자연생태"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-10">🍊 자연생태</label>
          </S.FormBtn>
        </S.Rest>
      </motion.div>
    </div>
  );
};
export default SurveyRest;
