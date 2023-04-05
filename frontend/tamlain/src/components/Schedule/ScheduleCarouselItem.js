import * as S from "./ScheduleCarouselItem.styled";
import ScheduleImgContainer from "./ScheduleImgContainer";

const ScheduleCarouselItem = (props) => {
  return (
    <S.Container>
      <ScheduleImgContainer
        ImgUrl={props.image}
        size={props.size}
        index={props.id}
        setFlag={props.setFlag}
      ></ScheduleImgContainer>
      <S.Text1 htmlFor="place"> {props.tag}</S.Text1>
      <S.Text2 htmlFor="place">{props.name}</S.Text2>
    </S.Container>
  );
};

export default ScheduleCarouselItem;
