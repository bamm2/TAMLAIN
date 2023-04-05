import Rating from "./Rating";
import * as S from "./MyPageStarInfo.styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPageStarInfo = () => {
  // 토큰
  const key = localStorage.getItem("token");
  // user_id 값
  const id = localStorage.getItem("id");
  // 별점
  const [starCount, setStarCount] = useState(0);
  // 보여줄 데이터 저장 useState
  const [dataList, setDataList] = useState([]);

  const size = localStorage.getItem("size");

  //  넘겨받은 데이터 꺼내 쓰기
  useEffect(() => {
    let datas = [];
    for (let i = 0; i < size; i++) {
      datas[i] = JSON.parse(localStorage.getItem("placeList" + i));
    }
    setDataList(datas);
  }, []);

  console.log(dataList);
  // //  페이지 이동 시 , 로컬 비워주기
  // localStorage.removeItem("size");
  // for (let i = 0; i < size; i++) {
  //   localStorage.removeItem("placeList" + i);
  // }
  // // 여기 까지

  const navigate = useNavigate();
  // 등록 버튼 누르면 별점등록 axios 쏘고 마이페이지 메인으로 이동
  const registStar = () => {
    // registReview(key,).then((res) => "데이터 담기" );
    navigate("/history");

    //  페이지 이동 시 , 로컬 비워주기
    localStorage.removeItem("size");
    for (let i = 0; i < size; i++) {
      localStorage.removeItem("placeList" + i);
    }
    // 여기 까지
  };
  return (
    <>
      <S.Wrap>
        미방문
        {/* 컨테이너 장소 갯수만큼 for문 돌리면 될 듯 ,
        별점 클릭하면 ui는 별점 다르게 보이는데 데이터가 다 동일하게 찍혀서
        idx와 결합하거나 방법 찾아보기 */}
        {dataList?.map((items) => (
          <S.Container key={items.jejuPlaceId}>
            <S.RadioBtn type="checkbox" value="인덱스번호"></S.RadioBtn>
            {items.jejuPlaceImgUrl !== "" && (
              <S.Img src={`https://${items.jejuPlaceImgUrl}`} />
            )}
            {items.jejuPlaceImgUrl === "" && (
              <S.Img
                src={`${process.env.PUBLIC_URL}/assets/Icon/Square_NonePicture.png`}
              />
            )}
            <S.TitleText>{items.jejuPlaceName}</S.TitleText>
            <div>{starCount}</div>
            <Rating setStarCount={setStarCount}></Rating>
          </S.Container>
        ))}
        <S.RegistBtn onClick={registStar}>등록</S.RegistBtn>
      </S.Wrap>
    </>
  );
};
export default MyPageStarInfo;
