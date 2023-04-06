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
  font-weight: bold;
  width: 95%;
  font-size: 28px;
  padding-left: 3%;
  color: #646464;
`;
export const DetailDiv = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  font-weight: bold;
  width: 95%;
  font-size: 28px;
  padding-left: 3%;
  color: #646464;
`;
export const CircleTitle = styled.div`
  margin-top: 10%;
  font-weight: bold;
  width: 95%;
  font-size: 28px;
  padding-left: 3%;
  text-align: center;
  color: #646464;
`;

export const Rating = styled.div`
  @keyframes donut-graph {
    to {
      /* 30% */
      stroke-dasharray: 70 30;
    }
  }

  .donut-graph {
    display: block;
    width: 200px;
    height: 200px;
    margin: 0;
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
    width: 90px;
    height: 105px;
    margin: -48px 0 0 -48px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .donut-graph_caption-value {
    order: 1;
    /* unit size 24px /2 */
    padding-left: 12px;
    font-size: 25px;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.05em;
    white-space: nowrap;
    color: #fc872a;
  }
  float: left;
  margin-left: 22%;
`;

export const ReviewCnt = styled.div`
  @keyframes donut-graph {
    to {
      /* 30% */
      stroke-dasharray: 70 30;
    }
  }
  .donut-graph {
    display: block;
    width: 200px;
    height: 200px;
    margin: 0;
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
    width: 90px;
    height: 105px;
    margin: -48px 0 0 -48px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .donut-graph_caption-value {
    order: 1;
    /* unit size 24px /2 */
    padding-left: 12px;
    font-size: 25px;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.05em;
    white-space: nowrap;
    color: #fc872a;
  }
  float: left;
`;
