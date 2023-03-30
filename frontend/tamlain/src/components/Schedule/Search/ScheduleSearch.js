import * as S from "./ScheduleSearch.styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ScheduleSearch = () => {
  var idx = window.location.href.substring(
    String(window.location.href).length - 1
  );
  const products = [
    {
      title: "카카오",
      latlng: { La: 33.450705, Ma: 126.570677 },
    },
    {
      title: "제주공항",
      latlng: { La: 33.5066211, Ma: 126.49281 },
    },
    {
      title: "테마파크",
      latlng: { La: 33.2906595, Ma: 126.322529 },
    },
    {
      title: "수목원",
      latlng: { La: 33.4696849, Ma: 126.493305 },
    },
  ];

  const [arr, setArr] = useState([]);

  useEffect(() => {
    const radioBtns = document.querySelectorAll(".radio-btn label");
    if (radioBtns === undefined) return;
    for (let i = 0; i < radioBtns.length; i++) {
      radioBtns[i].style.display = "none";
    }
    const tmp = JSON.parse(localStorage.getItem(`marker${idx}`));
    for (let i = 0; i < tmp.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (tmp[i].title == products[j].title) {
          products.splice(j, 1);
          break;
        }
      }
    }
    console.log(products);
    setArr(products);
  }, []);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredProducts = arr.filter((product) => {
    return product.title.includes(searchValue);
  });

  const Submit = (product) => {
    const arr = JSON.parse(localStorage.getItem(`marker${idx}`));
    arr.push(product);
    console.log(arr);
    localStorage.setItem(`marker${idx}`, JSON.stringify(arr));
  };

  return (
    <div>
      <Link to={`/scheduleMain/${idx}`}>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
        />
      </Link>
      <S.SearchBtn
        type="text"
        value={searchValue}
        onChange={handleInputChange}
      />
      <S.SearchIcon
        src={`${process.env.PUBLIC_URL}/assets/Icon/icon_searchlogo.png`}
        alt="검색아이콘"
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {filteredProducts.map((product, index) => (
        <div
          key={index}
          style={{ textAlign: "left", marginTop: "20px", marginLeft: "10%" }}
        >
          <span>{product.title}</span>
          <Link to={`/scheduleMain/${idx}`}>
            <button
              onClick={() => {
                Submit(product);
              }}
            >
              선택
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default ScheduleSearch;
