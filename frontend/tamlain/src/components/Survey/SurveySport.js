import * as S from "./SurveySport.styled";
import { Link } from "react-router-dom";
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
const SurveySport = () => {
  useEffect(() => {
    const checkboxes = document.getElementsByName("sport");
    const checkArr = JSON.parse(localStorage.getItem("Sport"));
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
    const checkboxes = document.getElementsByName("sport");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === false) {
        selectall.checked = false;
        return;
      }
    });
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("sport");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  const registForm = () => {
    const sport = document.querySelectorAll('input[name="sport"]:checked');
    const arr = [];
    for (let i = 0; i < sport.length; i++) {
      arr.push(sport[i].value);
    }
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginTop: "15%" }}
      >
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
              value="골프"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-1">🍊 골프</label>
          </S.FormBtn>
          <S.FormBtn>
            <input
              id="radio-2"
              type="checkbox"
              name="sport"
              value="자전거/싸이클"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-2">🍊 자전거</label>
          </S.FormBtn>
          <S.FormBtn>
            <input
              id="radio-3"
              type="checkbox"
              name="sport"
              value="해양"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-3">🍊 해양</label>
          </S.FormBtn>
        </S.Sport>
      </motion.div>
    </div>
  );
};
export default SurveySport;
