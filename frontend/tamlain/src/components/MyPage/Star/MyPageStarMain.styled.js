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
    position: absolute;
    z-index: 5;
    top: 23%;
    left: 23%;
    right: 23%;
    width: 50%;
    height: 120px;
    margin-top: 5%;
    margin-left: 25px;   

    display:flex;
  `;

export const BackBtn = styled.img`
  position:absolute;  
  z-index: 5;
  width: 20px;
  height: 30px;
  margin-left:20px;
  margin-top: 48px;
  
  cursor:pointer;
`;

export const Hr = styled.hr`
  position:absolute;
  z-index:5;
  width:45%;
  height:1px;
  margin-top:26.5%;
  margin-left:27.5%;
  background:#D9D9D9;  
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 20px;
  margin-left: 60px;
`;

export const TextContainer = styled.div`
  width: 350px;
  height: 100%;
  // background-color: pink;
  text-align: center;
`;

export const TextOne = styled.div`
  width: 80%;
  text-align: left;
  font-weight:bold;
  font-size: 20px;
  margin-top: 12%;
  margin-left: 30px;
  margin-bottom: 2%;
  color:#FC872A;
`;

export const TextTwo = styled.div`
  margin-left: 30px;
  font-size: 15px;
  text-align: left;
  color: #727272;
`;
export const TextThree = styled.div`
  margin-left: 30px;
  margin-bottom: 20%;
  font-size: 15px;
  text-align: left;
  color: #727272;
`;

export const Test = styled.div`
    position:absolute;
    
`;