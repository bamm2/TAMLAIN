import { useEffect } from "react";
import { getScheduleHistory } from "../../utils/api/historyApi";
import { useNavigate } from "react-router-dom";
 
//  일정 등록한 거 있는지 체크 후 리다이렉트 

const MyPageRedirect = () => {
    const key = localStorage.getItem("token");
    const user_id = localStorage.getItem("id");
    const navigate = useNavigate();

    useEffect(() => {
        getScheduleHistory(key, user_id).then((res) =>
        {if (res.data.length === 0) {
            navigate("/myPageEmpty");
        } else {
            navigate("/history");
        }
    });
    }, []);
};

export default MyPageRedirect;