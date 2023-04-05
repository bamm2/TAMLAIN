import * as S from "./SurveyCafe.styled";
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
const SurveyCafe = () => {
  useEffect(() => {
    const checkboxes = document.getElementsByName("cafe");
    const checkArr = JSON.parse(localStorage.getItem("Cafe"));
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
    const checkboxes = document.getElementsByName("cafe");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === false) {
        selectall.checked = false;
        return;
      }
    });
  };

  const selectAll = (e) => {
    const checkboxes = document.getElementsByName("cafe");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };
  const registForm = () => {
    const selectedEls = document.querySelectorAll('input[name="cafe"]:checked');
    const arr = [];
    selectedEls.forEach((el) => {
      arr.push(el.value);
    });
    localStorage.setItem("Cafe", JSON.stringify(arr));
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
          onClick={registForm}
        />
      </Link>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
              value="카페"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-1">🍊 카페</label>
          </S.FormBtn>
          <S.FormBtn>
            <input
              id="radio-2"
              type="checkbox"
              name="cafe"
              value="이색카페"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-2">🍊 이색카페</label>
          </S.FormBtn>
          <S.FormBtn>
            <input
              id="radio-3"
              type="checkbox"
              name="cafe"
              value="디저트"
              onClick={checkSelectAll}
            />
            <label htmlFor="radio-3">🍊 디저트</label>
          </S.FormBtn>
        </S.Cafe>
      </motion.div>
    </div>
  );
};
export default SurveyCafe;
