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

  const [mount, setMount] = useState(false);
  const [arr, setArr] = useState([]);
  const [products, setProducts] = useState([]);

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

  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      searchResult();
    }
  };
  const [flag, setFlag] = useState(true);
  const searchResult = () => {
    setProducts([]);
    const token = localStorage.getItem("token");
    searchPlace(token, searchValue).then((res) => {
      console.log(res);
      if (res.data.data.length === 0) {
        setFlag(false);
        return;
      }
      setProducts(res.data.data);
      setFlag(true);
      setSearchValue("");
    });
  };
  const goBack = () => {
    window.location.href = `${client.defaults.url}/scheduleMain/${idx}`;
  };

  return (
    <>
      <Link to={`/scheduleMain/${idx}`}>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={goBack}
        />
      </Link>
      <S.SearchInput
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={(e) => activeEnter(e)}
      />
      <S.SearchIcon
        src={`${process.env.PUBLIC_URL}/assets/Icon/icon_searchlogo.png`}
        alt="검색아이콘"
        onClick={searchResult}
      />
      {flag ? (
        products.map((product, index) => {
          return <SchduleSearchItem name={product} key={index} page={idx} />;
        })
      ) : (
        <S.SearchEmpty>검색결과가 없습니다.</S.SearchEmpty>
      )}
    </>
  );
};
export default ScheduleSearch;
