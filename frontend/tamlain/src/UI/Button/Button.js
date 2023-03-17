import React from "react";
import { motion } from "framer-motion";
import * as S from "./Button.styled";

const Button = (props) => {
  const value = props.name;

  return (
    <motion.div
      className="buttonBox"
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <S.Button
        onClick={props.value}
        style={{
          marginTop: `${props.margin}`,

          marginLeft: `${props.marginLeft}`,

          fontSize: `${props.fontsize}`,
          width: `${props.width}`,
        }}
      >
        {value}123123123
      </S.Button>
    </motion.div>
  );
};

export default Button;
