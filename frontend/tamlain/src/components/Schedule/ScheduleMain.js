import * as S from "./ScheduleMain.styled";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import ModalRegist from "../../UI/Modal/ModalRegist";
import ScheduleMap from "./ScheduleMap";
import { useCallback } from "react";

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

  //  exit 모달
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [exitDesign, setExitDesign] = useState(false);
  const ModalHandler = () => {
    setExitModalOpen(true);
    document.body.style = `overflow:hidden`;
  };

  // regist 모달
  const [registModalOpen, setRegistModalOpen] = useState(false);
  const RegistModalHandler = () => {
    setRegistModalOpen(true);
    document.body.style = `overflow:hidden`;
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
    <S.Container>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>
      <div>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={ModalHandler}
          className="backBtn"
        />
        {exitModalOpen && (
          <Modal
            name="정말 일정 등록을 그만하시겠습니까?"
            name2="(작성중인 일정은 저장되지 않습니다.)"
            setExitModalOpen={setExitModalOpen}
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
      <S.RegistBtn onClick={RegistModalHandler}>등록하기</S.RegistBtn>
      {registModalOpen && (
        <ModalRegist setRegistModalOpen={setRegistModalOpen}></ModalRegist>
      )}
      <Outlet />
    </S.Container>
  );
};
export default ScheduleMain;
