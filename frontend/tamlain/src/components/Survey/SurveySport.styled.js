import styled from "styled-components";

export const Sport = styled.div`
  top: 55%;
  left: 60%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  position: absolute;
  z-index: 10;
  text-align: center;
  font-size: 20px;
`;

export const FormBtn = styled.div`
  width: 600px;
  height: 50px;
  border: 1px solid #eae7e7;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 3px 1px #dadce0;
  input[type="checkbox"] {
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
  input[type="checkbox"]:checked + label {
    background: #fc872a;
    color: #fff;
  }
  input[type="checkbox"] + label {
    background: #f9fafc;
    color: #666;
    &:hover {
      background: #fc872a;
      color: #fff;
    }
  }
`;

export const FormAllBtn = styled.div`
  float: left;
  input[id="selectAll"] + label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #bcbcbc;
    border-radius: 5px;
    cursor: pointer;
  }
  input[id="selectAll"]:checked + label {
    background-color: #fc872a;
    border: 2px solid #fc872a;
  }
  input[id="selectAll"] {
    display: none;
  }
  input[id="labelAll"] {
    position: relative;
    top: 10px;
  }
  label[id="all"] {
    color: #666;
    position: relative;
    top: -10px;
  }
`;
