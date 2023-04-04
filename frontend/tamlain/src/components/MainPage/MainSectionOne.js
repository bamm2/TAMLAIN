import * as S from "./MainSectionOne.styled";
import useScrollFadeIn from "./useScrollFadeIn";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.3,
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const MainSectionOne = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 1, 0.2),
    1: useScrollFadeIn("up", 1, 0.2),
    2: useScrollFadeIn("up", 1, 0.2),
    3: useScrollFadeIn("up", 1, 0.2),
  };

  return (
    <S.Container>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <S.LogoImg src="/assets/MainLogoBlack.png" />
        <S.TextOne>다양한 제주 여행지를 </S.TextOne>
        <S.TextTwo> 추천 받아보세요</S.TextTwo>
        <S.TextThree>
          설문을 통한 맞춤 추천을 받아 일정을 작성할 수 있어요
        </S.TextThree>
      </motion.div>
    </S.Container>
  );
};

export default MainSectionOne;
