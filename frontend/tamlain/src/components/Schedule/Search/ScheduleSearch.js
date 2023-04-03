import * as S from "./ScheduleSearch.styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { searchPlace } from "../../../utils/api/scheduleApi";
import SchduleSearchItem from "./SchduleSearchItem";

import client from "../../../utils/client";

const ScheduleSearch = () => {
  var idx = window.location.href.substring(
    String(window.location.href).length - 1
  );
  // const products = [
  //   {
  //     title: "카카오",
  //     latlng: { La: 33.450705, Ma: 126.570677 },
  //   },
  //   {
  //     title: "제주공항",
  //     latlng: { La: 33.5066211, Ma: 126.49281 },
  //   },
  //   {
  //     title: "테마파크",
  //     latlng: { La: 33.2906595, Ma: 126.322529 },
  //   },
  //   {
  //     title: "수목원",
  //     latlng: { La: 33.4696849, Ma: 126.493305 },
  //   },
  // ];
  const [mount, setMount] = useState(false);
  const [arr, setArr] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = "token";
    searchPlace(token).then((res) => {
      console.log(res);
      setProducts(res.data);
      setMount(true);
    });
  }, []);

  useEffect(() => {
    const radioBtns = document.querySelectorAll(".radio-btn label");
    const registBtns = document.querySelectorAll(".registBtn");
    const backBtns = document.querySelectorAll(".backBtn");
    if (radioBtns === undefined) return;
    for (let i = 0; i < radioBtns.length; i++) {
      radioBtns[i].style.display = "none";
    }
    registBtns[0].style.display = "none";
    backBtns[0].style.display = "none";
    const tmp = JSON.parse(localStorage.getItem(`marker${idx}`));
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (tmp[i].title == products[j].title) {
          products.splice(j, 1);
          break;
        }
      }
    }
    setArr(products);
  }, [mount]);

  const goBack = () => {
    window.location.href = `${client.defaults.url}/scheduleMain/${idx}`;
  };

  // 검색
  const [text, setText] = useState("");

  const onChangeKeyword = (e) => {
    setText(e.target.value);
  };

  const submitKeyword = (e) => {
    e.preventDefault();
    console.log(text);
  };

  console.log(text);

  return (
    <>
      <Link to={`/scheduleMain/${idx}`}>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={goBack}
        />
      </Link>
      <S.SearchInput type="text" value={text} onChange={onChangeKeyword} />
      <S.SearchIcon
        src={`${process.env.PUBLIC_URL}/assets/Icon/icon_searchlogo.png`}
        alt="검색아이콘"
        onClick={submitKeyword}
      />
      <SchduleSearchItem></SchduleSearchItem>
      <SchduleSearchItem></SchduleSearchItem>
    </>
  );
};
export default ScheduleSearch;
