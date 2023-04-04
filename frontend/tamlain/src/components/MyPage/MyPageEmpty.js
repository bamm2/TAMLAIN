import { Link } from "react-router-dom";
import GoButton from "../../UI/Button/GoButton";
import "./MyPageEmpty.scss";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 1,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const MyPageEmpty = () => {
  // const [view, viewSet] = useState(false);

  // useEffect(() => {
  //   const isView = setTimeout(() => {
  //     viewSet(true);
  //   }, 3100);
  //   return () => clearTimeout(isView);
  // }, []);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
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
