import * as S from "./ScheduleSearch.styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { searchPlace } from "../../../utils/api/scheduleApi";

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
        console.log(products[j].title);
        if (tmp[i].title == products[j].title) {
          products.splice(j, 1);
          break;
        }
      }
    }
    setArr(products);
    console.log(arr);
  }, [mount]);
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

  const goBack = () => {
    window.location.href = `http://localhost:3000/scheduleMain/${idx}`;
  };

  return (
    <div>
      <Link to={`/scheduleMain/${idx}`}>
        <S.BackBtn
          src={`${process.env.PUBLIC_URL}/assets/Icon/back.png`}
          alt="뒤로가기"
          onClick={goBack}
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
