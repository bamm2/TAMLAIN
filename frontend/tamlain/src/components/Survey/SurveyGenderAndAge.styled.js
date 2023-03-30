import styled from "styled-components";

export const GenderAndAge = styled.div`
  top: 55%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  position: absolute;
  z-index: 10;
  text-align: center;
  font-size: 20px;
`;

export const FormGenderBtn = styled.div`
  float: left;
  width: 150px;
  height: 50px;
  border: 1px solid #eae7e7;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 1px #dadce0;
  input[type="radio"] {
    display: none;
  }
  label {
    cursor: pointer;
    display: block;
    border-radius: 10px;
    text-align: center;
    padding-top: 5px;

    line-height: 45px;
  }
  input[type="radio"]:checked + label {
    background: #fc872a;
    color: #fff;
  }
  input[type="radio"] + label {
    background: #f9fafc;
    color: #666;
    &:hover {
      background: #fc872a;
      color: #fff;
    }
  }
`;

export const FormAgeBtn = styled.div`
  float: left;
  width: 150px;
  height: 50px;
  border: 1px solid #eae7e7;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 1px #dadce0;
  input[type="radio"] {
    display: none;
  }
  label {
    cursor: pointer;
    display: block;
    border-radius: 10px;
    text-align: center;
    padding-top: 5px;

    line-height: 45px;
  }
  input[type="radio"]:checked + label {
    background: #32b64f;
    color: #fff;
  }
  input[type="radio"] + label {
    background: #f9fafc;
    color: #666;
    &:hover {
      background: #32b64f;
      color: #fff;
    }
  }
`;
