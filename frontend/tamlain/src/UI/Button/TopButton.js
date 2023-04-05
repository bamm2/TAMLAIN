import React, { useEffect, useState } from "react";
import "./TopButton.scss";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    // window.scrollTo(0, 0);
    window.scroll({
      top: -100,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      window.scrollY > 100 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);
  return (
    showButton && (
      <div className="scroll">
        <button onClick={scrollToTop}>Top</button>
      </div>
    )
  );
};

export default TopButton;
