import { Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import Navbar from "./UI/Navbar/Navbar";
import OAuthRedirectPage from "./components/Login/OAuthRedirectPage";
import Loading from "./UI/Loading/Loading";
import Frame from "./UI/Frame/Frame";

import SurveyMain from "./components/Survey/SurveyMain";
import SurveyCalendar from "./components/Survey/SurveyCalendar";
// import SurveyGenderAndAge from "./components/Survey/SurveyGenderAndAge";
// import SurveyWithWho from "./components/Survey/SurveyWithWho";
// import SurveyCar from "./components/Survey/SurveyCar";
import SurveyTheme from "./components/Survey/SurveyTheme";
import SurveyFood from "./components/Survey/SurveyFood";
import SurveyCafe from "./components/Survey/SurveyCafe";
import SurveyActivity from "./components/Survey/SurveyActivity";
import SurveySport from "./components/Survey/SurveySport";
import SurveyExhibition from "./components/Survey/SurveyExhibition";
import SurveyRest from "./components/Survey/SurveyRest";

import ScheduleMain from "./components/Schedule/ScheduleMain";
import ScheduleMap from "./components/Schedule/ScheduleMap";
import ScheduleSearch from "./components/Schedule/Search/ScheduleSearch";

import MyPageMain from "./components/MyPage/MyPageMain";

import MyPageHistory from "./components/MyPage/History/MyPageHistory";

import MyPageEmpty from "./components/MyPage/MyPageEmpty";
import MyPageStarInfo from "./components/MyPage/Star/MyPageStarInfo";

const App = () => {
  return (
    <>
      <AnimatePresence>
        <Routes>
          {/* -- ----  -- - - - - -  */}
          <Route
            path="oauth/callback/kakao"
            element={<OAuthRedirectPage />}
          />
          <Route path="/login" element={<Login />} />;
          <Route
            path="/"
            element={<Navigate to="/main" />}
          />
          <Route path="/loading" element={<Loading />} />
          <Route element={<Navbar />}>
            {/* 메인페이지 */}
            <Route path="/main" element={<MainPage />} />

            {/**질문페이지 */}
            <Route element={<SurveyMain />}>
              <Route element={<Frame />}>
                <Route
                  path="/surveyCalendar"
                  element={<SurveyCalendar />}
                />
                {/* <Route
                  path="/surveyGenderAndAge"
                  element={<SurveyGenderAndAge />}
                />
                <Route path="/surveyWithWho" element={<SurveyWithWho />} />
                <Route path="/surveyCar" element={<SurveyCar />} /> */}
                <Route
                  path="/surveyTheme"
                  element={<SurveyTheme />}
                />
                <Route
                  path="/surveyFood"
                  element={<SurveyFood />}
                />
                <Route
                  path="/surveyCafe"
                  element={<SurveyCafe />}
                />
                <Route
                  path="/surveyActivity"
                  element={<SurveyActivity />}
                />
                <Route
                  path="/surveySport"
                  element={<SurveySport />}
                />
                <Route
                  path="/surveyExhibition"
                  element={<SurveyExhibition />}
                />
                <Route
                  path="/surveyRest"
                  element={<SurveyRest />}
                />
              </Route>
            </Route>
            {/**일정페이지 */}
            <Route
              path="/scheduleMain/"
              element={<ScheduleMain />}
            >
              <Route element={<Frame />}>
                <Route
                  path=":id"
                  element={<ScheduleMap />}
                ></Route>
                <Route
                  path="search/:searchId"
                  element={<ScheduleSearch />}
                />
              </Route>
            </Route>
            {/* 마이 페이지 */}
            <Route element={<MyPageMain />}>
              <Route element={<Frame />}>
                <Route
                  path="history"
                  element={<MyPageHistory />}
                />

                <Route
                  path="/myPageEmpty"
                  element={<MyPageEmpty />}
                />
                <Route
                  path="/myPageStarInfo"
                  element={<MyPageStarInfo />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
