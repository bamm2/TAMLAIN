import Rating from "./Rating";
import * as S from "./MyPageStarInfo.styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registReview } from "../../../utils/api/reviewApi";

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

  const size = localStorage.getItem("size");

  //  가끔 데이터 로드 안되는 경우 해결 해야함 ( reload 강제 한번 시키기 ? )
  useEffect(() => {
    //  데이터 가져오기
    let datas = [];
    for (let i = 0; i < size; i++) {
      datas[i] = JSON.parse(localStorage.getItem("placeList" + i));
      // datas[i] = localStorage.getItem("placeList" + i);
    }
    console.log(datas);
    localStorage.setItem("tmpData", JSON.stringify(datas));

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
  }, []);

  console.log("visited배열 : " + visited);
  console.log("star 배열1 : " + starArr);

  console.log(dataList);

  const navigate = useNavigate();
  // 등록 버튼 누르면 별점등록 axios 쏘고 마이페이지 메인으로 이동
  const registStar = () => {
    // 보내줄 데이터 만들어주기
    let tmp = [];

    for (let i = 0; i < size; i++) {
      tmp[i] = {
        jejuPlaceId: dataList[i].jejuPlaceId,
        scheduleItemId: dataList[i].scheduleItemId,
        score: starArr[i],
      };
    }

    let sendDatas = {};
    sendDatas = {
      userId: id,
      reviewRegistItemList: tmp,
    };

    console.log(sendDatas);
    registReview(key, sendDatas).then((res) => console.log(res));
    navigate("/history");

    //  페이지 이동 시 , 로컬 비워주기
    // localStorage.removeItem("size");
    // for (let i = 0; i < size; i++) {
    //   localStorage.removeItem("placeList" + i);
    // }
  };

  // 방문 비방문 배열 업데이트
  const toggleHandler = (e) => {
    visited[e.target.value] = !visited[e.target.value];
    setVisited([...visited]);
    starArr[e.target.value] = 0;
    setStarArr([...starArr]);
  };

  // 별점 배열 업데이트
  useEffect(() => {
    starArr[starIdx] = starCount;
    setStarArr([...starArr]);
  }, [starCount, starIdx]);

  return (
    <>
      <S.Wrap>
        미방문
        {/* 컨테이너 장소 갯수만큼 for문 돌리면 될 듯 ,
        별점 클릭하면 ui는 별점 다르게 보이는데 데이터가 다 동일하게 찍혀서
        idx와 결합하거나 방법 찾아보기 */}
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
              chk={visited}
            ></Rating>
          </S.Container>
        ))}
        <S.RegistBtn onClick={registStar}>등록</S.RegistBtn>
      </S.Wrap>
    </>
  );
};
export default MyPageStarInfo;
