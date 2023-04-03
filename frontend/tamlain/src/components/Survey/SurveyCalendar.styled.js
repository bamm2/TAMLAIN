import styled from "styled-components";

export const DatePickerWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 150px;
  left: 20px;
  padding-bottom: 500px;
  z-index: 9999;

  .DateRangePickerInput {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 5px solid #fc872a;
  }

  .DateInput {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 60px;
    border-radius: 4px;
    margin: 8px 8px;
    font-size: 16px;
    text-align: center;
    transition: border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
  }

  .DateInput__small {
    font-size: 80%;
    padding: 5px 8px;
  }

  .DateInput__input {
    margin-left: 8px;
    margin-right: 8px;
    text-align: center;
    cursor: pointer;
  }

  .DateRangePickerInput_arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
  }

  // 오른쪽 구석의 화살표를 안보이게 한다.
  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }

  // Month 커스텀
  .CalendarMonth_caption {
    color: #fc872a;
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
    font-weight: bolder;
  }

  // 체크인 체크아웃이 선택되었을 때 그 사의 날짜들에 대한 스타일
  .CalendarDay__selected_span {
    background: #f8c7a0;
    border: none;
    color: white;
    font-weight: bolder;
  }

  // 체크인 체크아웃이 선택되었을 때 그 사의 날짜들에 호버 혹은 클릭했을 시 스타일
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    color: white;
    background: #fc872a;
    font-weight: bolder;
  }

  // 선택된 체크인 체크아웃 날짜에 대한 스타일
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: #fc872a;
    font-weight: bolder;
    border: none;
    color: white;
  }

  // 블록된 날짜에 대한 스타일링
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: #fc872a;
    border: none;
    color: white;
    box-shadow: none;
    text-decoration: line-through;
    font-weight: bolder;
  }

  // 선택될 범위에 대한 스타일링
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    color: white;
    background-color: #f8c7a0;
    border: none;
    font-weight: bolder;
  }
`;

export const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #fc872a;
  border: none;
  font-weight: bolder;
  border-radius: 5px;
  width: 130px;
  height: 50px;
  font-size: 20px;
  margin: 20px;
  cursor: pointer;

  :hover {
    background-color: #9c795e;
  }
`;

export const Confirmed = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const ConfirmedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #9c795e;
  border: none;
  font-weight: bolder;
  border-radius: 5px;
  width: 130px;
  height: 50px;
  font-size: 20px;
  margin: 20px;
`;

export const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: red;
  border: none;
  font-weight: bolder;
  border-radius: 5px;
  width: 130px;
  height: 50px;
  font-size: 20px;
  margin: 0 10px 0 0;
  cursor: pointer;

  :hover {
    background-color: #9e6b6b;
  }
`;
