import React, { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { Link } from "react-router-dom";
import moment from "moment";
import * as S from "./SurveyCalendar.styled";

const SurveyCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      const diffDays = moment(endDate).diff(
        startDate,
        "days"
      );
      if (diffDays > 4) {
        alert("지정할 수 있는 여행일은 최대 5일입니다.");
        endDate = moment(startDate).add(4, "days");
      }
    }
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
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
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={handleFocusChange}
          startDatePlaceholderText="출발 날짜"
          endDatePlaceholderText="도착 날짜"
          minimumNights={0}
          numberOfMonths={2}
          displayFormat="YYYY / MM / DD"
          noBorder
        />
      </S.DatePickerWrapper>
    </div>
  );
};

export default SurveyCalendar;
