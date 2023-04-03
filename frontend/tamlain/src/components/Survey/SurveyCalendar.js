import React, { useState, useEffect } from "react";
import * as D from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Link } from "react-router-dom";
import moment from "moment";
import * as S from "./SurveyCalendar.styled";

const SurveyCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    // console.log("useEffect 실행");
    const storedStartDate =
      localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");
    // console.log("storedStartDate");
    // console.log(storedStartDate);
    // console.log("storedEndDate");
    // console.log(storedEndDate);
    if (storedStartDate && storedEndDate) {
      setStartDate(moment(storedStartDate));
      setEndDate(moment(storedEndDate));
    }
  }, []);

  // 확정하기 버튼 클릭 시
  const onClickIsConfirm = () => {
    if (startDate === null || endDate === null) {
      alert("일정을 지정해주세요.");
    } else {
      setIsConfirm((cur) => !cur);

      localStorage.setItem(
        "startDate",
        startDate.format("YYYY-MM-DD")
      );
      localStorage.setItem(
        "endDate",
        endDate.format("YYYY-MM-DD")
      );
    }
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      const diffDays = moment(endDate).diff(
        startDate,
        "days"
      );

      if (diffDays > 5) {
        alert("선택 가능일은 최대 5일 입니다.");
        endDate = moment(startDate).add(4, "days");
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

  return (
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/Icon/goback.png`}
        alt="뒤로가기"
        style={{ float: "Left", marginLeft: "50px" }}
      />
      <Link to="/surveyTheme">
        <img
          src={`${process.env.PUBLIC_URL}/assets/Icon/gofront.png`}
          alt="다음으로"
          style={{ marginLeft: "190px" }}
        />
      </Link>
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
          <S.ConfirmButton onClick={onClickIsConfirm}>
            확정 하기
          </S.ConfirmButton>
        ) : (
          <S.Confirmed>
            <S.ConfirmedButton>확정 완료</S.ConfirmedButton>
            <S.CancelButton onClick={onClickCancelBtn}>
              취소
            </S.CancelButton>
          </S.Confirmed>
        )}
      </S.DatePickerWrapper>
    </div>
  );
};
export default SurveyCalendar;
