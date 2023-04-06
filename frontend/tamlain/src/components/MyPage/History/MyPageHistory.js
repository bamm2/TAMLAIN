import {useState,useEffect } from "react";
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
      thumbnailImageUrl: '',
      nickName: '',
      name: '',
      startDate: '',
      endDate: '',
      period: '',
      review: false,
    }
  ]);
  
  useEffect(() => {
    getScheduleHistory(key, user_id).then((res) => {
      let size = res.data.data.length;
      const tmp = [{}];
      for (var idx = 0; idx < size; idx++) {
        tmp[idx] = {
          scheduleId: res.data.data[idx].scheduleId,
          thumbnailImageUrl: res.data.data[idx].thumbnailImageUrl,
          nickNameL: res.data.data[idx].nickName,
          name: res.data.data[idx].name,
          startDate: (res.data.data[idx].startDate).replaceAll('-','.'),
          endDate:(res.data.data[idx].endDate).replaceAll('-','.'),
          period: (res.data.data[idx].period-1)+"박 "+res.data.data[idx].period+"일",
          review: res.data.data[idx].review,
        }
      }
      console.log(res.data);
      setScheduleList(tmp);
    }).catch(e => {
      console.error(e);
    })
  }, []);


  return (
    <S.Wrap>
      {scheduleList.map((items) => (
        <S.Container key={items.scheduleId}>
          <MyPageHistoryItem
            idx={items.scheduleId}
            img={items.thumbnailImageUrl}
            title={items.name}
            date={items.startDate+" ~ "+items.endDate}
            period={items.period}
          ></MyPageHistoryItem>
        </S.Container>
      ))}
    </S.Wrap>
  );
};

export default MyPageHistory;
