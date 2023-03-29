import * as S from "./ScheduleMain.styled";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";

const ScheduleMain = () => {
  var idx = window.location.href.substring(
    String(window.location.href).length - 1
  );
  console.log(idx);
  const navigate = useNavigate();
  var dayArr = [
    { id: 1, name: "1일차" },
    { id: 2, name: "2일차" },
    { id: 3, name: "3일차" },
    { id: 4, name: "4일차" },
    { id: 5, name: "5일차" },
  ];
  const [day, setDay] = useState(dayArr);

  const [modaltest, setModaltest] = useState(false);
  const ModalTest = () => {
    setModaltest((modaltest) => !modaltest);
  };

  useEffect(() => {
    const radioBtns = document.querySelectorAll(".radio-btn label");
    if (radioBtns === undefined) return;
    radioBtns[idx - 1].style.backgroundColor = "#fc872a";
    radioBtns[idx - 1].style.color = "#fff";
  }, []);
  const movepage = (num) => {
    window.location.href = `http://localhost:3000/scheduleMain/${num}`;
  };
  return (
    <div>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>

      <div>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={ModalTest}
        />
        {modaltest && (
          <Modal
            name="정말 일정 등록을 그만하시겠습니까?"
            name2="(작성중인 일정은 저장되지 않습니다.)"
          ></Modal>
        )}
      </div>
      {day.map((item) => (
        <div key={item.id} style={{ float: "left" }}>
          <S.DayBtn className="radio-btn" style={{ left: `${item.id * 90}px` }}>
            <input
              id={`radio${item.id}`}
              type="radio"
              name="car"
              onClick={() => {
                movepage(item.id);
              }}
            />
            <label htmlFor={`radio${item.id}`}>{item.name}</label>
          </S.DayBtn>
        </div>
      ))}
      <Outlet />
    </div>
  );
};
export default ScheduleMain;
