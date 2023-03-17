import * as S from "./Input.styled";

const Input = () => {
  return (
    <S.FormContainer>
      <S.FormGroup>
        <S.FormField
          type="input"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <S.FormLabel htmlFor="name">Name</S.FormLabel>
      </S.FormGroup>
    </S.FormContainer>
  );
};

export default Input;
