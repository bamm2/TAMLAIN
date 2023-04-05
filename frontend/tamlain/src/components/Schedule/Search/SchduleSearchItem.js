import { useEffect, useState } from "react";
import * as S from "./SchduleSearchItem.styled";
import client from "../../../utils/client";

const SchduleSearchItem = (props) => {
  var idx = props.page;
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const data = props.name;
    setProduct(data);
  }, []);
  const addPlace = () => {
    const obj = {
      title: product.title,
      latlng: product.latlng,
    };
    const arr = JSON.parse(localStorage.getItem(`marker${idx}`));
    arr.push(obj);
    localStorage.setItem(`marker${idx}`, JSON.stringify(arr));
    window.location.href = `${client.defaults.url}/scheduleMain/${idx}`;
  };

  return (
    <S.Container>
      {product.imgUrl !== "" && (
        <S.Img src={`https://${product.imgUrl}`}></S.Img>
      )}
      {product.imgUrl === "" && (
        <S.Img
          src={`${process.env.PUBLIC_URL}/assets/Icon/Circle_NonPicture.png`}
        ></S.Img>
      )}
      <S.TextContainer>
        <S.TextOne>{product.title}</S.TextOne>
        <S.TextTwo>{product.roadAddress}</S.TextTwo>
      </S.TextContainer>
      <S.SelectBtn onClick={addPlace}> 선택</S.SelectBtn>
    </S.Container>
  );
};

export default SchduleSearchItem;
