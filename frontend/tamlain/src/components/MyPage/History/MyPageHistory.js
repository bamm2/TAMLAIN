import * as S from "./MyPageHistory.styled";
import MyPageHistoryItem from "./MyPageHistoryItem";

const MyPageHistory = () => {
  const Dummy = [
    {
      id: 0,
      image: "assets/Background/mainCarousel_0.jpg",
      title: "제주 먹방 뿌셔",
      date: "2023.03.02~2023.03.06",
      period: "4박5일",
    },
    {
      id: 1,
      image: "assets/Background/mainCarousel_1.jpg",
      title: "스무글자가넘어가면어떻게되는지체크해보자",
      date: "2023.03.03~2023.03.04",
      period: "1박2일",
    },
    {
      id: 2,
      image: "assets/Background/mainCarousel_1.jpg",
      title: "제주 먹방 뿌셔 뿌셔",
      date: "2023.03.03~2023.03.04",
      period: "12박2일",
    },
    {
      id: 3,
      image: "assets/Background/mainCarousel_0.jpg",
      title: "제주 먹방 뿌셔 뿌셔",
      date: "2023.03.03~2023.03.04",
      period: "13박2일",
    },
    {
      id: 4,
      image: "assets/Background/mainCarousel_4.jpg",
      title: "제주 먹방 뿌셔 뿌셔",
      date: "2023.03.03~2023.03.04",
      period: "14박2일",
    },
    {
      id: 5,
      image: "assets/Background/mainCarousel_3.jpg",
      title: "제주 먹방 뿌셔 뿌셔",
      date: "2023.03.03~2023.03.04",
      period: "15박2일",
    },
    {
      id: 6,
      image: "assets/Background/mainCarousel_2.jpg",
      title: "제주 먹방 뿌셔 뿌셔",
      date: "2023.03.03~2023.03.04",
      period: "16박2일",
    },
  ];

  return (
    <S.Wrap>
      {Dummy.map((items) => (
        <S.Container key={items.id}>
          <MyPageHistoryItem
            img={items.image}
            title={items.title}
            date={items.date}
            period={items.period}
          ></MyPageHistoryItem>
        </S.Container>
      ))}
    </S.Wrap>
  );
};

export default MyPageHistory;
