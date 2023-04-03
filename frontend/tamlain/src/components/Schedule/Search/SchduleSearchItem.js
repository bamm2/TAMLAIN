import { useEffect, useState } from "react";
import * as S from "./SchduleSearchItem.styled";
import client from "../../../utils/client";

const SchduleSearchItem = (props) => {
  var idx = props.page;
  const [product, setProduct] = useState([]);
  const [select, setSelect] = useState(() => {
    return JSON.parse(localStorage.getItem(`marker${idx}`)) || [];
  });
  useEffect(() => {
    const data = props.name;
    setProduct(data);
  }, []);
  const addPlace = () => {
    const arr = [];
    const obj = {
      title: product.title,
      latlng: product.latlng,
    };
    arr.push(obj);
    setSelect((product) => [...product, arr]);
    console.log(arr);
    console.log(select);
    localStorage.setItem(`marker${idx}`, JSON.stringify(select));
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
