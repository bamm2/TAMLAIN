import client from "../client";

// 내가 등록한 별점 조회하기
export const getReview = async (
  accessToken,
  scheduleId
) => {
  const response = await client.get(
    `/review/scheduleId=${scheduleId}`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );

  return response;
};

// 각 장소마다 별점 등록하기
export const registReview = async (accessToken, data) => {
  const response = await client.post(
    `/review/regist`,
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );

  return response;
};

// 별점을 등록할 일정 목록 조회하기
export const getReviewScheduleHistory = async (
  accessToken,
  scheduleId
) => {
  const response = await client.get(
    `/review/scheduleItem/scheduleId?scheduleId=${scheduleId}`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );

  return response;
};
