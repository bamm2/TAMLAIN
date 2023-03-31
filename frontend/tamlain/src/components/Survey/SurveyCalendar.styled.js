import styled from "styled-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: center;
  padding-bottom: 500px;

  // 오른쪽 구석의 화살표를 안보이게 한다.
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }

  // 달력 각 칸의 기본 스타일.
  .CalendarDay__default {
    border: none;
    border-radius: 50%;
    vertical-align: middle;
    outline: none;
  }

  // 달력 각 칸에 호버가 되었을 때 스타일
  .CalendarDay__default:hover {
    background: #fc872a;
    border: none;
    color: white;
    font-weight: bold;
  }

  // 체크인 체크아웃이 선택되었을 때 그 사의 날짜들에 대한 스타일
  .CalendarDay__selected_span {
    background-color: #ffc08e;
    border: none;
    color: white;
    font-weight: bold;
  }

  // 체크인 체크아웃이 선택되었을 때 그 사의 날짜들에 호버 혹은 클릭했을 시 스타일
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    color: white;
    background-color: #ffc08e;
    font-weight: bold;
  }

  // 선택된 체크인 체크아웃 날짜에 대한 스타일
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: #fc872a;
    border: none;
    color: white;
    font-weight: bold;
  }

  // 블록된 날짜에 대한 스타일링
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: #fc872a;
    border: none;
    color: #d2d2d2;
    box-shadow: none;
    text-decoration: line-through;
  }

  // 선택될 범위에 대한 스타일링
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    color: white;
    background-color: #ffc08e;
    border: none;
  }
`;
