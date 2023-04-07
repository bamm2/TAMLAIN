import "./VideoPopUp.css";
import { useState } from "react";
import { motion } from "framer-motion";

const VideoPopUp = (props) => {
  const closeModal = () => {
    props.setDoSignup(false);
    document.body.style = `overflow:auto`;
  };

  const Test = () => {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{
        opacity: 0,
      }}
      className={"popup-div"}
    >
      <div className="windowBack" onClick={Test} />
      <div className="window">
        <nav>
          <motion.li style={{ fontFamily: "GmarketSans", fontWeight: "bold" }}>
            💡 사용자 가이드 💡
          </motion.li>
        </nav>
        <main style={{ overflow: "overlay" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: false }}
          >
            <div>
              <div className="updateImg">
                <img
                  src="assets/MainLogoBlack.png"
                  alt="로고"
                  style={{
                    width: "550px",
                    marginTop: "700px",
                  }}
                />
              </div>
              <u />
              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                출발일과 도착일 확정
              </span>
              <p>◾️여행날짜는 최대 5일로 지정 가능</p>
              <p>◾꼭 확정버튼을 눌러 확정해주어야 함</p>
              <br />
              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                이번 여행의 테마 지정
              </span>
              <p>◾️여행 테마는 단수 선택 가능</p>
              <br />

              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                6개의 카테고리별 가고 싶은 장소의 세부 카테고리 지정
              </span>

              <p>
                ◾ 6개의 카테고리 중 최소 3개의 카테고리에서는 세부 카테고리를
                지정해야 함
              </p>
              <p>◾️ 세부 카테고리는 미선택 or 전체 선택도 가능</p>
              <p>◾ 선택할 갯수는 상관 없음</p>
              <br />

              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                로딩 페이지
              </span>
              <p>
                ◾ 장소가 추천되는 동안 제주도 여행에 관한 짧은 팁들을 확인할 수
                있다.
              </p>
              <br />

              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                일차별로 추천 받은 장소 담기
              </span>

              <p>
                ◾ 카테고리별로 추천받은 장소 중 마음에 드는 장소들을 눌러
                담는다.
              </p>
              <p>◾ 장소를 담으면 지도에 찍힌 돌하르방 마커를 확인한다. </p>
              <p>
                ◾ 카테고리별로 추천받은 장소 중 마음에 드는 장소들을 눌러
                담는다.
              </p>
              <p>◾ 한 번 클릭 시, 그 장소의 상세 정보를 확인 가능 </p>
              <p>
                ◾ 추천 받은 목록에서 마음에 들지 않는 장소는 X 표시를 눌러
                지운다.
              </p>
              <br />

              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                일정 등록하기
              </span>

              <p>◾ 일정을 모두 계획했으면 등록하기 버튼을 누른다. </p>
              <p>
                ◾ 썸네일 장소 이미지를 하나 정하고, 일정명을 정하고 등록한다.
              </p>
              <br />

              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                일정 조회하기
              </span>

              <p>◾️ 마이페이지에서 본인이 등록한 일정들을 조회 가능 </p>
              <p>◾ 본인이 담은 장소들에 대해서 각각 상세 정보를 확인 가능 </p>
              <br />

              <span
                style={{
                  fontSize: "15px",
                  backgroundColor: "#FAA15A",
                  color: "#ffffff",
                }}
              >
                장소 리뷰
              </span>

              <p>
                ◾ 여행이 끝나는 날짜 다음날부터 장소 별점 매기는 기능이 열린다.
              </p>
              <p>
                ◾ 다녀오지 않은 장소에 대해서는 “미방문” 체크하여 별점을 매기지
                않아도 된다.
              </p>
              <br />
            </div>
          </motion.div>
        </main>
        <div className="closeBtnDiv">
          <button
            className="closeBtn"
            style={{
              cursor: "pointer",
              fontFamily: "GmarketSans",
              border: "1px solid",
              fontSize: "9px",
              width: "33px",
              height: "27px",
              borderRadius: "10px",
            }}
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default VideoPopUp;
