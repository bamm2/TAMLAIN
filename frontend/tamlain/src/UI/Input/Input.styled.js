import styled from "styled-components";

export const FormContainer = styled.div`
  $primary: #11998e;
  $secondary: #38ef7d;
  $white: #fff;
  $gray: #9b9b9b;
`;

export const FormGroup = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
`;
export const FormLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
`;
export const FormField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ ${FormLabel} {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
  &:required,
  &:invalid {
    box-shadow: none;
  }
  :focus {
    ~ ${FormLabel} {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: $primary;
      font-weight: 700;
      background-color: red;
    }
    background-color: green;
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, $primary, $secondary);
    border-image-slice: 1;
  }
`;
