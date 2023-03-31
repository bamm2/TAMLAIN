import Calendar from "react-calendar";
import * as S from "./SurveyCalendar.styled";
import "react-calendar/dist/Calendar.css";
import moment from "moment/moment";
import { useState } from "react";
import { Link } from "react-router-dom";

const SurveyCalendar = () => {
  const [value, onChange] = useState(new Date());

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
      <S.Calendar>
        <Calendar
          onChange={onChange}
          value={value}
          minDate={new Date()}
          maxDate={
            new Date(
              moment(
                new Date().setDate(new Date().getDate() + 4)
              ).format("YYYY-MM-DD")
            )
          }
          selectRange={true}
        />
        <div className="text-gray-500 mt-4"></div>
      </S.Calendar>
    </div>
  );
};
export default SurveyCalendar;
