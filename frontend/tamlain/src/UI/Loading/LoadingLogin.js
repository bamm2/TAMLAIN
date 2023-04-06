import * as S from "./LoadingLogin.styled";
import "./Loading.css";

const LoadingLogin = () => {
  return (
    <S.BackGround>
      <S.BackGroundFilter />

      <div className="white-grad">loading...</div>
    </S.BackGround>
  );
};
export default LoadingLogin;
