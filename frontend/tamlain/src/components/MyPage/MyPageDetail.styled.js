import styled from "styled-components";

export const BackGround = styled.div`
  background-image: url(${process.env
    .PUBLIC_URL}/assets/Background/mainBackground.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: absolute;
  height: 40%;
  width: 50%;
  left: 25%;
  top: 0%;
  z-index: 1;
`;

export const BackGroundFilter = styled.div`
  background-color: #3a3a3a;
  opacity: 0.3;
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 2;
  `;
  

export const Container = styled.div`
position:absolute;    
z-index:100;
left:25%;
width:50%;
top:26.5%;
height:200%;
`;

export const BackBtn = styled.img`
  z-index: 5;
  width: 20px;
  margin-top: 4%;
  margin-left: 25px;
`;

export const TextOne = styled.span`
  text-align: left;
  font-weight:bold;
  font-size: 35px;
  margin-top: 3%;
  margin-left: 30px;
  margin-bottom: 2%;
`;

export const TitleUpdateImg = styled.img`
    object-fit:cover;
    margin-left:2%;
    margin-top:3.6%;
    width:25px;
    height:25px;
`;

export const TextTwo = styled.div`
  margin-left: 30px;
  font-size: 21px;
  text-align: left;
  color: #727272;
  font-weight:bold;
`;
export const TextThree = styled.div`
  margin-left: 30px;
  margin-bottom: 20%;
  font-size: 21px;
  text-align: left;
  color: #727272;
  font-weight:bold;
`;

export const FlexBox = styled.div`
display:flex;
justify-content: flex-start;
`;