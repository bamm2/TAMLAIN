import { Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Loading from "./UI/Loading/Loading";
import Login from "./components/Login/Login";

// import VideoRoomComponent from "./components/Openvidu/components/VideoRoomComponent";
const App = () => {
  // const location = useLocation();
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/login" element={<Login />} />;
        <Route path="/" element={<Navigate to="/loading" />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
