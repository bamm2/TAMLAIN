import styled from "styled-components";

export const Wrap = styled.div`
  margin-top: 27.5%;
  margin-left:5%;
  color:#3A3A3A;
  height:100%;
  // background-color:blue;
  font-size:13px;
`;

export const Container = styled.div`
  width:100%;
  height:130px;
  margin-top:3%;
  // background-color:red;
  display : flex;
  
  `;

  // 버튼 모양 커스텀하기 
export const RadioBtn = styled.input`
    margin-left:1%;
    width:30px;
    cursor:pointer;
  `;


export const Img = styled.img`
  object-fit:cover;
  margin-left : 4%;
  width:120px;
  hegith:100%;
  border-radius:5px;
`;

export const TitleText = styled.div`
  margin-left:4%;
  margin-top:6%;
  text-align:center;
  width:150px;
  font-size:25px;
  font-weight:bold;
`;



export const RegistBtn = styled.button`

position: absolute;

color: #ffffff;
width: 90%;
height: 55px;
box-shadow: 0 0 0 3px #ffffff;
border-radius: 20px;
border: none;
background-color: #FFC08E;
text-align: center;
font-size: 30px;
font-weight: bold;
margin: 60px 0 0 10px;
cursor: pointer;

:hover {
  background-color: #FC872A;
  transition: 0.5s;
  color: #ffffff;
}
`;

