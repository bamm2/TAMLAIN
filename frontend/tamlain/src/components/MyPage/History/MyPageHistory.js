import {useState,useEffect } from "react";
import * as S from "./MyPageHistory.styled";
import MyPageHistoryItem from "./MyPageHistoryItem";
import { getScheduleHistory } from "../../../utils/api/historyApi";


const MyPageHistory = () => {
  // const Dummy = [
  //   {
  //     id: 0,
  //     image: "assets/Background/mainCarousel_0.jpg",
  //     title: "제주 먹방 뿌셔",
  //     date: "2023.03.02~2023.03.06",
  //     period: "4박5일",
  //   },
  //   {
  //     id: 1,
  //     image: "assets/Background/mainCarousel_1.jpg",
  //     title: "스무글자가넘어가면어떻게되는지체크해보자",
  //     date: "2023.03.03~2023.03.04",
  //     period: "1박2일",
  //   },
  //   {
  //     id: 2,
  //     image: "assets/Background/mainCarousel_1.jpg",
  //     title: "제주 먹방 뿌셔 뿌셔",
  //     date: "2023.03.03~2023.03.04",
  //     period: "12박2일",
  //   },
  //   {
  //     id: 3,
  //     image: "assets/Background/mainCarousel_0.jpg",
  //     title: "제주 먹방 뿌셔 뿌셔",
  //     date: "2023.03.03~2023.03.04",
  //     period: "13박2일",
  //   },
  //   {
  //     id: 4,
  //     image: "assets/Background/mainCarousel_4.jpg",
  //     title: "제주 먹방 뿌셔 뿌셔",
  //     date: "2023.03.03~2023.03.04",
  //     period: "14박2일",
  //   },
  //   {
  //     id: 5,
  //     image: "assets/Background/mainCarousel_3.jpg",
  //     title: "제주 먹방 뿌셔 뿌셔",
  //     date: "2023.03.03~2023.03.04",
  //     period: "15박2일",
  //   },
  //   {
  //     id: 6,
  //     image: "assets/Background/mainCarousel_2.jpg",
  //     title: "제주 먹방 뿌셔 뿌셔",
  //     date: "2023.03.03~2023.03.04",
  //     period: "16박2일",
  //   },
  // ];

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
  // const resetList = null;
  useEffect(() => {
    getScheduleHistory(key, user_id).then((res) => {
      let size = res.data.length;
      const tmp = [{}];
      for (var idx = 0; idx < size; idx++) {
        tmp[idx] = {
          scheduleId: res.data[idx].scheduleId,
          thumbnailImageUrl: res.data[idx].thumbnailImageUrl,
          nickNameL: res.data[idx].nickName,
          name: res.data[idx].name,
          startDate: (res.data[idx].startDate).replaceAll('-','.'),
          endDate:(res.data[idx].endDate).replaceAll('-','.'),
          period: (res.data[idx].period-1)+"박 "+res.data[idx].period+"일",
          review: res.data[idx].review,
        }
      }
      // console.log(res.data);
      // setScheduleList([...resetList, ...res.data]);
      // console.log(tmp); 
      setScheduleList(tmp);
    }).catch(e => {
      console.error(e);
    })
  }, []);
  console.log(scheduleList);
  
  

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
