import * as S from "./ScheduleCarouselItem.styled";
import ScheduleImgContainer from "./ScheduleImgContainer";

const ScheduleCarouselItem = (props) => {
  return (
    <S.Container>
      {props.imgUrl !== "" && (
        <ScheduleImgContainer
          ImgUrl={`https://${props.image}`}
          size={props.size}
          id={props.id}
          setFlag={props.setFlag}
          tag={props.tag}
          removeItem={props.removeItem}
          checkSelect={props.checkSelect}
          select={props.select}
          setSelect={props.setSelect}
          flag={props.flag}
        />
      )}
      {props.imgUrl === "" && (
        <ScheduleImgContainer
          ImgUrl={""}
          size={props.size}
          id={props.id}
          setFlag={props.setFlag}
          tag={props.tag}
          removeItem={props.removeItem}
          checkSelect={props.checkSelect}
          select={props.select}
          setSelect={props.setSelect}
          flag={props.flag}
        />
      )}
      {/* <S.Text1 htmlFor="place"> {props.tag}</S.Text1> */}
      <S.Text2 htmlFor="place">{props.name}</S.Text2>
    </S.Container>
  );
};

export default ScheduleCarouselItem;
