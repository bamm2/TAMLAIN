import Rating from "./Rating";
import * as S from "./MyPageStarInfo.styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPageStarInfo = (props) => {
  // const DummyData = [
  //   {
  //     id: 0,
  //     image: "assets/Background/mainCarousel_0.jpg",
  //     tag: "#태그명 #태그명 #태그명",
  //     name: "장소1",
  //   },
  //   {
  //     id: 1,
  //     image: "assets/Background/mainCarousel_1.jpg",
  //     tag: "#태그명 #태그명 #태그명",
  //     name: "장소2",
  //   },
  //   {
  //     id: 2,
  //     image: "assets/Background/mainCarousel_2.jpg",
  //     tag: "#태그명 #태그명 #태그명",
  //     name: "장소3",
  //   },
  //   {
  //     id: 3,
  //     image: "assets/Background/mainCarousel_3.jpg",
  //     tag: "#태그명 #태그명 #태그명",
  //     name: "장소4",
  //   },
  //   {
  //     id: 4,
  //     image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_4.jpg`,
  //     tag: "#태그명 #태그명 #태그명",
  //     name: "장소5",
  //   },
  // ];

  // return (
  //   <>
  //     {DummyData.map((el, idx) => {
  //       <S.Container key={idx}>
  //         <S.Img src={el.image} />
  //         <S.PlaceName>{el.name}</S.PlaceName>
  //         <S.Wrap>
  //           {/* <S.Stars>
  //             {ARRAY.map((el2, idx2) => {
  //               return (
  //                 <FaStar
  //                   key={idx2}
  //                   size="50"
  //                   onClick={() => handleStarClick(el2)}
  //                   className={clicked[el2] && "yellowStar"}
  //                 />
  //               );
  //             })}
  //           </S.Stars> */}
  //           <Rating props={DummyData} />
  //         </S.Wrap>
  //       </S.Container>;
  //     })}
  //   </>
  // );

  // 토큰
  const key = localStorage.getItem("token");
  // user_id 값
  const id = localStorage.getItem("id");

  // 별점
  const [starCount, setStarCount] = useState(0);
  // 데이터 저장 후 axios 쏴주기 위해
  const [dataList, setDataList] = useState({
    userId: id,
    reviewRegistItemList: [
      {
        scheduleItemId: 0,
        jejuPlaceId: 0,
        score: 0,
      },
    ],
  });

  console.log(props.schedulePlaceInfo);

  const navigate = useNavigate();
  // 등록 버튼 누르면 별점등록 axios 쏘고 마이페이지 메인으로 이동
  const registStar = () => {
    // registReview(key,).then((res) => "데이터 담기" );
    navigate("/history");
  };
  const size = props.schedulePlaceInfo.length;
  console.log(size);
  return (
    <>
      <S.Wrap>
        미방문
        {/* 컨테이너 장소 갯수만큼 for문 돌리면 될 듯 ,
        별점 클릭하면 ui는 별점 다르게 보이는데 데이터가 다 동일하게 찍혀서
        idx와 결합하거나 방법 찾아보기 */}
        <S.Container>
          <S.RadioBtn type="checkbox" value="인덱스번호"></S.RadioBtn>
          <S.Img
            src={`${process.env.PUBLIC_URL}/assets/Background/mainCarousel_4.jpg`}
          />
          <S.TitleText>장소명</S.TitleText>
          <div>{starCount}</div>
          <Rating setStarCount={setStarCount}></Rating>
        </S.Container>
        <S.RegistBtn onClick={registStar}>등록</S.RegistBtn>
      </S.Wrap>
    </>
  );
};
export default MyPageStarInfo;
