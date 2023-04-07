import * as S from "./MyPageDetail.styled";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import {
  getScheduleDetail,
  modifyScheduleName,
} from "../../utils/api/historyApi";
import Frame from "./../../UI/Frame/Frame";
import { useState } from "react";
import client from "../../utils/client";
import Swal from "sweetalert2";

const MyPageDetail = () => {
  var idx = window.location.href.substring(
    String(window.location.href).length - 1
  );
  const navigate = useNavigate();
  // axios 쏴줄 스케줄 id
  const scheduleId = localStorage.getItem("scheduleId");
  const key = localStorage.getItem("token");

  const [mypageCommonInfo, setMypageCommonInfo] = useState({
    title: "",
    startDate: "",
    endDate: "",
    period: "",
  });

  // 수정 준비 상태
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState("");

  const [period, setPeriod] = useState(0);

  // axios로 데이터 전부 가져오기
  let mypageInfo = {};
  getScheduleDetail(key, scheduleId).then((res) => {
    const data = res.data.data.mypageCommonInfo;
    localStorage.setItem(
      "scheduleDetailItemMap",
      JSON.stringify(Object.values(res.data.data.scheduleDetailItemMap))
    );

    mypageInfo = {
      title: data.name,
      startDate: data.startDate.replaceAll("-", "."),
      endDate: data.endDate.replaceAll("-", "."),
      period: data.period - 1 + "박 " + data.period + "일",
    };
    setMypageCommonInfo(mypageInfo);
    setTitle(data.name);
    setPeriod(data.period);
    localStorage.setItem("period", data.period);
    return;
  });
  useEffect(() => {
    const period = localStorage.getItem("period");
    localStorage.removeItem("period");
    const radioBtns = document.querySelectorAll(".radio-btn label");
    if (radioBtns === undefined) return;
    radioBtns[idx - 1].style.backgroundColor = "#fc872a";
    radioBtns[idx - 1].style.color = "#fff";
    const arr = day;
    setDay(arr.slice(0, period));
  }, []);

  // 뒤로 가기 버튼
  const redirectPage = () => {
    navigate("/history");
  };

  // 타이틀 수정 버튼
  const updateTitle = () => {
    setIsUpdate((cur) => !cur);

    if (isUpdate) {
      const token = localStorage.getItem("token");

      const data = {
        name: title,
        scheduleId: scheduleId,
      };

      if (data.name.length === 0) {
        Swal.fire({
          icon: "question",
          title: "일정명은 1자 이상 20자 이하여야 합니다.",
          confirmButtonColor: "#fc872a",
        });
        setIsUpdate(true);
        return;
      } else {
        modifyScheduleName(token, data).then((res) => {
          console.log(res);
        });
        Swal.fire({
          icon: "success",
          title: "수정 완료되었습니다!",
          confirmButtonColor: "#fc872a",
        });
      }
    }
  };

  const onChangeTitle = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      // 글자 길이가 20자 이하인 경우에만 처리
      setTitle(inputValue);
    } else {
      Swal.fire({
        icon: "question",
        title: "일정명은 1자 이상 20자 이하여야 합니다.",
        confirmButtonColor: "#fc872a",
      });
    }
  };

  var dayArr = [
    { id: 1, name: "1일차" },
    { id: 2, name: "2일차" },
    { id: 3, name: "3일차" },
    { id: 4, name: "4일차" },
    { id: 5, name: "5일차" },
  ];
  const [day, setDay] = useState(dayArr);

  const movepage = (period) => {
    window.location.href = `${client.defaults.url}/detail/${scheduleId}/${period}`;
  };

  return (
    <>
      <S.BackGround>
        <S.BackGroundFilter />
      </S.BackGround>
      <Frame />
      <S.Container>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={redirectPage}
        />
        <S.FlexBox>
          {!isUpdate ? (
            <S.TextOne>
              <input value={title} disabled />
            </S.TextOne>
          ) : (
            <S.TextOneModify>
              <input value={title} onChange={onChangeTitle} />
            </S.TextOneModify>
          )}
          {!isUpdate ? (
            <S.TitleUpdateImg
              src={`${process.env.PUBLIC_URL}/assets/Icon/Pencil.png`}
              onClick={updateTitle}
            ></S.TitleUpdateImg>
          ) : (
            <S.TitleUpdateImgReady
              src={`${process.env.PUBLIC_URL}/assets/Icon/Pencil.png`}
              onClick={updateTitle}
            ></S.TitleUpdateImgReady>
          )}
        </S.FlexBox>
        <S.FlexBox>
          <S.TextTwo>
            {mypageCommonInfo.startDate} ~ {mypageCommonInfo.endDate}
          </S.TextTwo>
          <S.TextThree>{mypageCommonInfo.period}</S.TextThree>
          {/* 지도 시작  */}
          {day.map((item) => (
            <div key={item.id} style={{ float: "left" }}>
              <S.DayBtn
                className="radio-btn"
                style={{ left: `${item.id * 90}px` }}
              >
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
        </S.FlexBox>
        {/* ----------- 일정명 , 여행 날짜 -----------  */}

        {/* <Outlet /> */}
      </S.Container>
    </>
  );
};

export default MyPageDetail;
