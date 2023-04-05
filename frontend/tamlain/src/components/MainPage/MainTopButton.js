import React, { useState, useEffect } from "react";
import * as S from "./MainTopButton.styled";

const MainTopButton = () => {
  const [showBtn, setShowBtn] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const ShowBtnClick = () => {
      if (window.scrollY > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", ShowBtnClick);
    return () => {
      window.removeEventListener("scroll", ShowBtnClick);
    };
  }, []);

  return (
    <>
      {showBtn && (
        <S.Container>
          <S.Button onClick={scrollToTop} type="button">
            Top
          </S.Button>
        </S.Container>
      )}
    </>
  );
};

export default MainTopButton;
