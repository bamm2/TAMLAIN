import Rating from "./Rating";
import * as S from "./MyPageStarInfo.styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registReview } from "../../../utils/api/reviewApi";
import { getReview } from "../../../utils/api/reviewApi";
import { getScheduleHistory } from "../../../utils/api/historyApi";

const MyPageStarInfo = () => {
  // 토큰
  const key = localStorage.getItem("token");
  // user_id 값
  const id = localStorage.getItem("id");

  //  별점 체크용
  const [starArr, setStarArr] = useState([]);
  const [starCount, setStarCount] = useState(0);
  const [starIdx, setStarIdx] = useState(0);

  // 보여줄 데이터 저장 useState
  const [dataList, setDataList] = useState([]);

  // 미방문 ,방문 -> 제출 할 때 미방문은 0 점으로 변경
  const [visited, setVisited] = useState([]);
  
  //  일정 장소 개수 
  const size = localStorage.getItem("size");


  let scheduleId = localStorage.getItem("scheduleId");
  console.log(scheduleId);

  useEffect(() => {
    // 장소데이터 가져오기
    let datas = [];
    for (let i = 0; i < size; i++) {
      datas[i] = JSON.parse(localStorage.getItem("placeList" + i));
    }
    
    //  가져온 장소데이터 배열로 tmp라는 이름으로 넣기 
    localStorage.setItem("tmp", JSON.stringify(datas));
    // setDataList(datas);

    //  방문 ,비방문 체크용
    let visitedInit = [];
    for (let i = 0; i < size; i++) {
      visitedInit[i] = false;
    }
    setVisited(visitedInit);

    //  별점 체크용
    let starInit = [];
    for (let i = 0; i < size; i++) {
      starInit[i] = 0;
    }
    setStarArr(starInit);

    // 클릭한 scheduleId와 같은 거의 별점 부여 여부 찾기 
    getScheduleHistory(key, id).then((res) => {
      let size = res.data.data.length;
      // 유저 일정 데이터 가져오기 
      for (let idx = 0; idx < size; idx++) {
        if (scheduleId == res.data.data[idx].scheduleId) {
          setChkActive(res.data.data[idx].review);
          return;
        }
      }
    });
  }, []);

  // 등록버튼 활성화 비활성화
  const [chkActive, setChkActive] = useState(false);

  useEffect(() => {
  // 이미 등록했다면 , 
  if (chkActive) {
    // 이미 등록한 일정의 별점을 가져오기  
    getReview(key, scheduleId).then((res) => {
      console.log(res);
        let data = [];
        // 등록된 별점들 가져오기 
        for (let i = 0; i < size; i++){
          let datas = res.data.data.reviewItemList[i];
          data[i] = {
            jejuPlaceImgUrl:datas.jejuPlaceImgUrl,
            jejuPlaceName: datas.jejuPlaceName,
            score: datas.score,
            visit : datas.visit,
          }
        }
        // 등록된 별점 데이터 
        setAxiosData(data);
      });
  }  
}, [chkActive]);


  //  등록된 별점 데이터를 가져올 변수 
  const [axiosData, setAxiosData] = useState([]);
  
  // 장소 데이터 가져오기 
  useEffect(() => {
    setDataList(JSON.parse(localStorage.getItem("tmp")));
    localStorage.removeItem("tmp");
  }, [localStorage.getItem("tmp")]);

  const navigate = useNavigate();
  
  // 별점등록 버튼 누르면 별점등록 axios 쏘고 마이페이지 메인으로 이동
  const registStar = () => {

    // 보내줄 데이터 만들어주기
    for (let i = 0; i < size; i++) {
      // 방문을 했는데 별점을 안줬으면 alert 창 띄우기 
      if (!visited[i] && starArr[i] === 0) {
        window.alert("등록하지 않은 별점이 존재합니다.");
        return;
      }
    }


    let tmp = [];
    //  별점 등록 데이터 쌓아주기 
    for (let i = 0; i < size; i++) {
      tmp[i] = {
        jejuPlaceId: dataList[i].jejuPlaceId,
        scheduleItemId: dataList[i].scheduleItemId,
        score: starArr[i],
      };
    }

    let sendDatas = {};
    // 유저id와 함께 axios 태워줄 data형태 
    sendDatas = {
      userId: id,
      reviewRegistItemList: tmp,
    };

    // 리뷰 등록 버튼 요청 발송 
    registReview(key, sendDatas).then((res) => console.log(res));
    // 일정 메인 페이지로 이동 
    navigate("/history");
    window.location.reload();

    setChkActive(false);
  };



  // 미방문 체크시 별점 0개로 변환 시키기 
  const [select, setSelect] = useState(false);

  // 방문 미방문 배열 업데이트
  const toggleHandler = (e) => {
    visited[e.target.value] = !visited[e.target.value];
    setVisited([...visited]);
    // 방문 처리 체크 로직 
    if (visited[e.target.value] == true) {
      setSelect(true);
      localStorage.setItem("chkedVisited", e.target.value);
      //  방문 안했으면 별점 0으로 바꿔줘서 데이터 넘겨줌 
      starArr[e.target.value] = 0;
      setStarArr([...starArr]);
    } else {
      setSelect(false);
      localStorage.setItem("chkedVisited", -1);
    }
  };
  console.log(visited);
  // 별점 배열 업데이트
  useEffect(() => {
    starArr[starIdx] = starCount;
    setStarArr([...starArr]);
  }, [starCount, starIdx]);
  console.log(starArr);

  // 별점을 등록했을 경우 등록버튼 뒤로가기버튼으로 변경
  const reDirectMypage = () => {
    navigate("/history");
  };

  return (
    <>
      <S.Wrap>
        미방문
        {/* 컨테이너 장소 갯수만큼 for문 돌리면 될 듯 ,
        별점 클릭하면 ui는 별점 다르게 보이는데 데이터가 다 동일하게 찍혀서
        idx와 결합하거나 방법 찾아보기 */}
        {!chkActive ? (
          <>
            {dataList?.map((items, index) => (
              <S.Container key={index}>
                <S.RadioBtn
                  type="checkbox"
                  value={index}
                  onClick={toggleHandler}
                ></S.RadioBtn>
                {items.jejuPlaceImgUrl !== "" && (
                  <S.Img src={`https://${items.jejuPlaceImgUrl}`} />
                )}
                {items.jejuPlaceImgUrl === "" && (
                  <S.Img
                    src={`${process.env.PUBLIC_URL}/assets/Icon/SquareEmptyImg.png`}
                  />
                )}
                <S.TitleText>{items.jejuPlaceName}</S.TitleText>
                <Rating
                  index={index}
                  setStarCount={setStarCount}
                  setStarIdx={setStarIdx}
                  setSelect={select}
                  starArr={starArr}
                  visited={visited}
                ></Rating>
              </S.Container>
            ))}
            <S.RegistBtn onClick={registStar}>등록</S.RegistBtn>
          </>
        ) : (
          <>
            {axiosData?.map((items, index) => (
              <S.Container key={index}>
                <S.RadioBtn
                  disabled
                  type="checkbox"
                ></S.RadioBtn>
                {items.jejuPlaceImgUrl !== "" && (
                  <S.Img src={`https://${items.jejuPlaceImgUrl}`} />
                )}
                {items.jejuPlaceImgUrl === "" && (
                  <S.Img
                    src={`${process.env.PUBLIC_URL}/assets/Icon/SquareEmptyImg.png`}
                  />
                )}
                <S.TitleText>{items.jejuPlaceName}</S.TitleText>
                <Rating
                  index={index}
                  setStarCount={setStarCount}
                  setStarIdx={setStarIdx}
                  existStar={items.score}
                  chk={visited}
                  chkActive={chkActive}
                ></Rating>
              </S.Container>
            ))}
            <S.RegistBtn onClick={reDirectMypage}>
              이미 등록된 별점입니다 (뒤로가기)
            </S.RegistBtn>
          </>
        )}
      </S.Wrap>
    </>
  );
};
export default MyPageStarInfo;
