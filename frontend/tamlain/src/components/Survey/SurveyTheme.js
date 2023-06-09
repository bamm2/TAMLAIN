import * as S from "./SurveyTheme.styled";
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
const SurveyTheme = () => {
  useEffect(() => {
    const checkboxes = document.getElementsByName("theme");
    const check = JSON.parse(localStorage.getItem("Theme"));
    if (check === null) {
      return;
    }
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value === check) {
        checkboxes[i].checked = true;
      }
    }
  }, []);
  const registForm = () => {
    const theme = document.querySelector('input[name="theme"]:checked').value;
    localStorage.setItem("Theme", JSON.stringify(theme));
  };

  return (
    <div>
      <Link to="/surveyCalendar">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
        />
      </Link>
      <Link to="/surveyFood">
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
        <S.Theme>
          <S.FormBtn style={{ marginLeft: "100px" }}>
            <input
              id="radio-1"
              type="radio"
              name="theme"
              value="pictureWithFriend"
            />
            <label htmlFor="radio-1">#친구와 인생사진 찰칵 📷</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input id="radio-2" type="radio" name="theme" value="couple" />
            <label htmlFor="radio-2">#연인과 추억 만들기 🏄</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "100px" }}>
            <input id="radio-3" type="radio" name="theme" value="family" />
            <label htmlFor="radio-3">#가족과 행복한 여행 🚗</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input id="radio-4" type="radio" name="theme" value="animal" />
            <label htmlFor="radio-4">#반려동물과 제주로 🐶</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "100px" }}>
            <input id="radio-5" type="radio" name="theme" value="history" />
            <label htmlFor="radio-5">#제주 역사 속으로 ⛺</label>
          </S.FormBtn>
          <S.FormBtn style={{ marginLeft: "55px" }}>
            <input id="radio-6" type="radio" name="theme" value="nature" />
            <label htmlFor="radio-6">#자연과 힐링 🌳</label>
          </S.FormBtn>
        </S.Theme>
      </motion.div>
    </div>
  );
};
export default SurveyTheme;
