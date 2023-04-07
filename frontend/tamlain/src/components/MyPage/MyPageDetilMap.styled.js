import styled from "styled-components";

export const BackBtn = styled.img`
  float: left;
  width: 25px;
  height: 40px;
  margin-top: 7.5%;
  margin-left: 25px;
`;

export const Div = styled.div`
  float: left;
  width: 20%;
  height: 350px;
  background-color: #f9f9f9;
  overflow: auto;
  position: relative;
  margin-top: 29%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CarouselDiv = styled.div`
  margin-top: 100px;
`;

export const EmptySpace = styled.div`
  color: #fc872a;
  text-align: center;
  position: relative;
  transform: translateY(450%);
`;
export const Number = styled.span`
  color: #fc872a;
  margin-left: 3%;
`;

export const TitleDiv = styled.div`
  font-weight: bold;
  width: 95%;
  font-size: 28px;
  padding-left: 3%;
  color: #646464;
`;

export const Tag = styled.span`
  color: #646464;
`;

export const Hr = styled.hr`
  width: 95%;
  height: 0.5px;
  background: #ebebeb;
  border: 1px solid #ebebeb;
`;

export const Banner = styled.img`
  width: 90%;
  height: 300px;
  margin-left: 5%;
  border-radius: 5px;
  box-shadow: 0 17px 20px -18px rgba(0, 0, 0, 1);
`;

export const AddressDiv = styled.div`
  margin-top: 5%;
  margin-left: 5%;
  font-weight: normal;
  width: 95%;
  font-size: 23px;
  padding-left: 3%;
  color: #646464;
`;
export const DetailDiv = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  // font-weight: bold;
  width: 95%;
  font-size: 28px;
  padding-left: 3%;
  color: #646464;
`;
export const DetailA = styled.a`
  text-decoration-line: none;
  background-color: #646464;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  color: #fff;
  &:hover {
    // border: 2px solid #fc872a;
    background-color: #fc872a;
    color: #fff;
    transition: 0.2s;
  }
`;
export const CircleTitle = styled.div`
  margin-top: 15%;
  font-weight: bold;
  width: 95%;
  font-size: 25px;
  padding-left: 3%;
  text-align: center;
  color: #fc872a;
`;

export const Rating = styled.div`
  .moving-outline circle {
    stroke-dasharray: 1360;
    animation: dash 2s linear infinite;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 2720;
    }
  }

  .donut-graph {
    display: block;
    width: 200px;
    height: 200px;
    margin-left: 15%;
    padding: 0;
    position: relative;
  }

  .donut-graph_svg {
    transform: rotate(-90deg);
  }

  .donut-segment {
    animation: donut-graph 3s ease-out forwards;
  }

  .donut-graph_caption {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 85px;
    height: 105px;
    margin: 0 148px 148px 0;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .donut-graph_caption-value {
    order: 1;
    /* unit size 24px /2 */
    padding-right: 113px;
    padding-bottom: 125px;
    font-size: 25px;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.05em;
    white-space: nowrap;
    color: #fc872a;
  }
  margin-left: 15%;

  float: left;
`;

export const ReviewCnt = styled.div`
  .moving-outline circle {
    stroke-dasharray: 1360;
    animation: dash 2s linear infinite;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 2720;
    }
  }

  .donut-graph {
    display: block;
    width: 200px;
    height: 200px;
    margin-left: 15%;
    padding: 0;
    position: relative;
  }

  .donut-graph_svg {
    transform: rotate(-90deg);
  }

  .donut-segment {
    animation: donut-graph 3s ease-out forwards;
  }

  .donut-graph_caption {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 85px;
    height: 105px;
    margin: 0 148px 148px 0;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .donut-graph_caption-value {
    order: 1;
    /* unit size 24px /2 */
    padding-right: 113px;
    padding-bottom: 125px;
    font-size: 25px;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.05em;
    white-space: nowrap;
    color: #fc872a;
  }
  margin-left: 5%;

  float: left;
`;
