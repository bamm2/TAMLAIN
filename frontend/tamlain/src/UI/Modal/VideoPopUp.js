import "./VideoPopUp.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../store/popup";

const VideoPopUp = () => {
  const [selectedTab, setSelectedTab] = useState("video");

  const item = ["video", "update"];

  const dispatch = useDispatch();

  const popupOk = useSelector((state) => state.popup.isOk);

  const Test = () => {
    dispatch(popupActions.popupOk());
    console.log(popupOk);
  };

  //   if (popupOk) {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = "";
  //     window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  //   }
  //   if (!popupOk) {
  //     document.body.style.cssText = `
  //     position:fixed;
  //     top: -${window.scrollY}px;
  //     overflow-y:scroll;
  //     width:100%`;
  //   }

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
          <ul>
            <motion.li
              layout
              key={item[0]}
              className={item[0] === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab("video")}
            >
              🕹 게임 설명 🕹
              {item[0] === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </motion.li>
            <motion.li
              layout
              key={item[1]}
              className={item[1] === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab("update")}
            >
              💡 업데이트 💡
              {item[1] === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </motion.li>
          </ul>
        </nav>
        <main style={{ overflow: "overlay" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: false }}
          >
            {selectedTab === "video" ? (
              <div className="video">
                <div className="descMargin">
                  <p className="descVideo">
                    <img src="assets/Background/mainCarousel_0.jpg" alt="" />
                  </p>
                  <p className="descVideo">
                    <span>회원가입</span>은 <span>웹페이지 오른쪽 상단</span>
                    에서 할 수 있으니 참고해주세요 🍅
                  </p>
                </div>
                <video loop muted controls autoPlay className="iframe">
                  <source
                    src={`${process.env.PUBLIC_URL}/video/game_rule.mp4`}
                    type="video/mp4"
                  />
                </video>
              </div>
            ) : (
              <div>
                <div className="updateImg">
                  <img
                    src="assets/Background/mainCarousel_0.jpg"
                    alt=""
                    style={{ width: "200px", marginTop: "555px" }}
                  />
                </div>
                <p>안녕하세요 Cookscape 입니다.</p>
                <p>
                  4월 6일(목) 업데이트를 통해 적용된 사항을 안내드리며, 더욱
                  즐거운 아일랜드 생활을 위해 노력하겠습니다 :)
                </p>
                <br />
                <p>[신규 업데이트]</p>
                <p>◾️ UI 추가 및 개선</p>
                <p>◾️ 채팅기능 추가</p>
                <p>◾️ 경고 및 알림 메세지 기능 추가</p>
                <p>◾️ 메타버스 </p>
                <p>&nbsp;&nbsp;&nbsp; - 입장시 캐릭터 선택 기능 추가 </p>
                <p>&nbsp;&nbsp;&nbsp; - 채팅 기능 추가 </p>
                <p>&nbsp;&nbsp;&nbsp; - 미니맵 기능 추가 </p>
                <p>
                  &nbsp;&nbsp;&nbsp; - 탑승 가능한 오브젝트 추가(롤러코스터,
                  자이로드롭, 회전그네, 열기구, 관람차, 요트){" "}
                </p>
                <p>◾️ 인게임 </p>
                <p>&nbsp;&nbsp;&nbsp; - 채팅 및 보이스 채팅 추가 </p>
                <p>&nbsp;&nbsp;&nbsp; - 칭호 기능 추가 </p>
                <p>
                  &nbsp;&nbsp;&nbsp; - 캐릭터 악세사리 추가(모자) 및 착용 가능
                </p>
                <br />
                <p>[버그 수정]</p>
                <p>
                  - 게임 대기방 입장 이후 방 생성이 되던 문제를 수정하였습니다.
                </p>
                <p>
                  - 게임 시작 이후 타이머에 정상적인 텍스트가 출력되도록
                  수정하였습니다.
                </p>
                <p>
                  - 식재료가 상호작용 중 공격받을 시 UI가 남아있던 현상을
                  수정하였습니다.
                </p>
                <p>
                  - 요리사 상호작용 거리가 비정상적이던 문제를 수정하였습니다.
                </p>
                <p>
                  - 게임방 구석 쓰레기통을 밟고 점프하면 맵 너머로 갈 수 있던
                  버그를 수정하였습니다.
                </p>
                <p>
                  - 게임 도중 식재료 중 하나가 접속 종료시, 밸브와 솥이 전부
                  사라지던 버그를 수정하였습니다.
                </p>
                <p>
                  - 놀이공원에 음식물이 끼기 딱 알맞은 쓰레기통에 끼이지 않도록
                  수정하였습니다.
                </p>
                <p>- 아일랜드 오브젝트가 띄워져있던 현상을 수정하였습니다.</p>
                <p>- 아일랜드 전반에 끼이거나 막힌 공간을 수정하였습니다.</p>
                <p>
                  - 술래가 밸브를 거꾸로 돌릴 수 없는 현상을 수정하였습니다.
                </p>
                <p>
                  - 냄비를 전부 쓰러트려도 탈출구가 생기지 않는 버그를
                  수정하였습니다.
                </p>
              </div>
            )}
          </motion.div>
        </main>
        <div className="closeBtnDiv">
          <button className="closeBtn" onClick={Test}>
            삭제
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default VideoPopUp;
