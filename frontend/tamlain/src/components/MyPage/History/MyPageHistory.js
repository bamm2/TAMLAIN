import { useState, useEffect } from "react";
import * as S from "./MyPageHistory.styled";
import MyPageHistoryItem from "./MyPageHistoryItem";
import { getScheduleHistory } from "../../../utils/api/historyApi";

const MyPageHistory = () => {
  const key = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");

  //  일정 useState에 저장
  const [scheduleList, setScheduleList] = useState([
    {
      scheduleId: 0,
      thumbnailImageUrl: "",
      nickName: "",
      name: "",
      startDate: "",
      endDate: "",
      period: "",
      review: false,
    },
  ]);

  useEffect(() => {
    getScheduleHistory(key, user_id)
      .then((res) => {
        let size = res.data.data.length;
        const tmp = [{}];
        const scheduleIdArr = [];
        for (var idx = 0; idx < size; idx++) {
          scheduleIdArr.push(res.data.data[idx].scheduleId);
          tmp[idx] = {
            scheduleId: res.data.data[idx].scheduleId,
            thumbnailImageUrl: res.data.data[idx].thumbnailImageUrl,
            nickNameL: res.data.data[idx].nickName,
            name: res.data.data[idx].name,
            startDate: res.data.data[idx].startDate.replaceAll("-", "."),
            endDate: res.data.data[idx].endDate.replaceAll("-", "."),
            period:
              res.data.data[idx].period -
              1 +
              "박 " +
              res.data.data[idx].period +
              "일",
            review: res.data.data[idx].review,
          };
        }
        localStorage.setItem("scheduleId", JSON.stringify(scheduleIdArr));
        console.log(res.data);
        setScheduleList(tmp);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <S.Wrap>
      {scheduleList.map((items, index) => (
        <S.Container key={items.scheduleId}>
          <MyPageHistoryItem
            idx={JSON.parse(localStorage.getItem("scheduleId"))[index]}
            img={items.thumbnailImageUrl}
            title={items.name}
            date={items.startDate + " ~ " + items.endDate}
            period={items.period.substring(
              items.period.length - 2,
              items.period.length - 1
            )}
          ></MyPageHistoryItem>
        </S.Container>
      ))}
    </S.Wrap>
  );
};

export default MyPageHistory;
