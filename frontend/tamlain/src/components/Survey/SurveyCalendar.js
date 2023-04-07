import React, { useState, useEffect } from "react";
import * as D from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Link } from "react-router-dom";
import moment from "moment";
import * as S from "./SurveyCalendar.styled";
import { motion } from "framer-motion";
import client from "../../utils/client";
import Swal from "sweetalert2";

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
const SurveyCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [dayCnt, setDayCnt] = useState(() => {
    return JSON.parse(localStorage.getItem(`DayCnt`)) || 0;
  });

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate && storedEndDate) {
      setStartDate(moment(storedStartDate));
      setEndDate(moment(storedEndDate));
    }
    if (localStorage.getItem("endDate")) {
      setIsConfirm(true);
    }
  }, []);

  // 확정하기 버튼 클릭 시
  const onClickIsConfirm = () => {
    if (startDate === null || endDate === null) {
      Swal.fire({
        icon: "question",
        title: "일정을 지정해주세요.",
        confirmButtonColor: "#fc872a",
      });
    } else {
      setIsConfirm((cur) => !cur);

      localStorage.setItem("DayCnt", dayCnt);
      localStorage.setItem("startDate", startDate.format("YYYY-MM-DD"));
      localStorage.setItem("endDate", endDate.format("YYYY-MM-DD"));
    }
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      const diffDays = moment(endDate).diff(startDate, "days");
      setDayCnt(parseInt(diffDays) + 1);
      if (diffDays > 5) {
        Swal.fire({
          icon: "question",
          title: "선택 가능일은 최대 5일입니다.",
          confirmButtonColor: "#fc872a",
        });
      }
    }

    setStartDate(startDate);
    // console.log(startDate);
    setEndDate(endDate);
    // console.log(endDate);
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  // 취소 버튼 클릭 시
  const onClickCancelBtn = () => {
    setIsConfirm((cur) => !cur);

    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
  };

  const resetData = () => {
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
  };
  //확정 안누르고 못넘어가게 하기
  const checkCalendar = () => {
    if (!isConfirm) {
      Swal.fire({
        icon: "question",
        title: "일정등록을 확정해주세요!",
        confirmButtonColor: "#fc872a",
        outline: 0,
      });
      return;
    }
    window.location.href = `${client.defaults.url}/surveyTheme`;
  };
  return (
    <div>
      <Link to="/main">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
          alt="뒤로가기"
          style={{ float: "Left", marginLeft: "50px" }}
          onClick={resetData}
        />
      </Link>

      <img
        src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
        alt="다음으로"
        style={{ marginLeft: "190px", cursor: "pointer" }}
        onClick={checkCalendar}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <S.DatePickerWrapper>
          <D.DateRangePicker
            startDate={startDate}
            endDate={endDate}
            startDatePlaceholderText="출발일"
            endDatePlaceholderText="도착일"
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={handleFocusChange}
            minimumNights={0}
            numberOfMonths={2}
            displayFormat="YYYY / MM / DD"
            disabled={isConfirm}
          />
          {!isConfirm ? (
            <S.ConfirmButton onClick={onClickIsConfirm}>확정</S.ConfirmButton>
          ) : (
            <S.Confirmed>
              <S.CancelButton onClick={onClickCancelBtn}>취소</S.CancelButton>
            </S.Confirmed>
          )}
        </S.DatePickerWrapper>
      </motion.div>
    </div>
  );
};
export default SurveyCalendar;
