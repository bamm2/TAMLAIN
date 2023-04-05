// import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoButton from "../../UI/Button/GoButton";
import "./MyPageEmpty.scss";

const MyPageEmpty = () => {
  // const [view, viewSet] = useState(false);

  // useEffect(() => {
  //   const isView = setTimeout(() => {
  //     viewSet(true);
  //   }, 3100);
  //   return () => clearTimeout(isView);
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="emptySecond">
        <div className="typewriter">
          <h1>등록한 일정이 없어요😢</h1>
        </div>

        <Link to="/surveyCalendar">
          <GoButton value="일정 등록하러 가기" />
        </Link>
      </div>
    </motion.div>
  );
};
export default MyPageEmpty;
