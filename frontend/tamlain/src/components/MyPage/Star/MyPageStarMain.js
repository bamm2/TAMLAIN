import * as S from "./MyPageStarMain.styled";
import Rating from "./Rating";

const MyPageStarMain = () => {
  const DummyData = [
    {
      id: 0,
      image: "assets/Background/mainCarousel_0.jpg",
      tag: "#태그명 #태그명 #태그명",
      name: "장소1",
    },
    {
      id: 1,
      image: "assets/Background/mainCarousel_1.jpg",
      tag: "#태그명 #태그명 #태그명",
      name: "장소2",
    },
    {
      id: 2,
      image: "assets/Background/mainCarousel_2.jpg",
      tag: "#태그명 #태그명 #태그명",
      name: "장소3",
    },
    {
      id: 3,
      image: "assets/Background/mainCarousel_3.jpg",
      tag: "#태그명 #태그명 #태그명",
      name: "장소4",
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/assets/Background/mainCarousel_4.jpg`,
      tag: "#태그명 #태그명 #태그명",
      name: "장소5",
    },
  ];

  return (
    <>
      {DummyData.map((el, idx) => {
        <S.Container key={idx}>
          <S.Img src={el.image} />
          <S.PlaceName>{el.name}</S.PlaceName>
          <S.Wrap>
            {/* <S.Stars>
              {ARRAY.map((el2, idx2) => {
                return (
                  <FaStar
                    key={idx2}
                    size="50"
                    onClick={() => handleStarClick(el2)}
                    className={clicked[el2] && "yellowStar"}
                  />
                );
              })}
            </S.Stars> */}
            <Rating props={DummyData} />
          </S.Wrap>
        </S.Container>;
      })}
    </>
  );
};

export default MyPageStarMain;
