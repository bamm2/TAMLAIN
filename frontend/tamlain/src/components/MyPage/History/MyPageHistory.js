import { useState, useEffect } from "react";
import * as S from "./MyPageHistory.styled";
import MyPageHistoryItem from "./MyPageHistoryItem";
import { getScheduleHistory } from "../../../utils/api/historyApi";

const MyPageHistory = () => {
  const key = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");
  const [idArr, setIdArr] = useState([]);

  const [starRegistOk, setStarRegistOk] = useState([]);
  const [starRegistScheduleId, setStarRegistScheduleId] = useState([]);

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
    //  일정 목록 불러오기 
    getScheduleHistory(key, user_id)
      .then((res) => {
        console.log(res);
        let size = res.data.data.length;
        
        let tmpArr = [];
        let tmpArr2 = [];
        for (let i = 0; i < size; i++) {
          tmpArr[i] = false;
          tmpArr2[i] = 0;
        }
        // 유저의 일정이 별점을 부여했는지 
        setStarRegistOk(tmpArr);
        // 유저의 스케줄id 를 담을 배열 
        setStarRegistScheduleId(tmpArr2);

        const tmp = [];
        const scheduleIdArr = [];
        // 유저 일정 데이터 가져오기 
        for (var idx = 0; idx < size; idx++) {
          scheduleIdArr.push(res.data.data[idx].scheduleId);
          tmp[idx] = {
            scheduleId: res.data.data[idx].scheduleId,
            thumbnailImageUrl: res.data.data[idx].thumbnailImageUrl,
            nickNameL: res.data.data[idx].nickName,
            name: res.data.data[idx].name,
            startDate: res.data.data[idx].startDate.replaceAll("-", "."),
            endDate: res.data.data[idx].endDate.replaceAll("-", "."),
            period:res.data.data[idx].period - 1 + "박 " +res.data.data[idx].period +"일",
            review: res.data.data[idx].review,
          };

          //일정 별점 등록 체크용
          starRegistOk[idx] = res.data.data[idx].review;
          setStarRegistOk([...starRegistOk]);
          //일정 별점 스케줄아이디 체크용 
          starRegistScheduleId[idx] = res.data.data[idx].scheduleId;
          setStarRegistScheduleId([...starRegistScheduleId]);

          // 일정의 개수 
          localStorage.setItem("starRegistSize", size);
        }

        
        // axios 가져온 데이터 저장해주기 
        setScheduleList(tmp);

        // 별점 등록 여부 체크용 배열크기 기본값 적용해서 넣어주기 
        localStorage.setItem("starRegistArr", JSON.stringify(starRegistOk));
        // 별점 등록 스케줄아이디 체크용 배열크기 기본값 적용해서 넣어주기   
        localStorage.setItem("starRegistIdx", JSON.stringify(starRegistScheduleId));
 
        localStorage.setItem("scheduleId", JSON.stringify(scheduleIdArr));
        setIdArr(JSON.parse(localStorage.getItem("scheduleId")));
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
            idx={idArr[index]}
            img={items.thumbnailImageUrl}
            title={items.name}
            date={items.startDate + " ~ " + items.endDate}
            period={items.period.substring(
              items.period.length - 2,
              items.period.length - 1
            )}
            starRegistOk={starRegistOk}
            starRegistScheduleId={starRegistScheduleId}
          ></MyPageHistoryItem>
        </S.Container>
      ))}
    </S.Wrap>
  );
};

export default MyPageHistory;
