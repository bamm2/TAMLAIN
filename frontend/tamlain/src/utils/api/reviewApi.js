import client from "../client";

// 내가 등록한 별점 조회하기
export const getReview = async (accessToken) => {
  const response = await client.get(`/review/scheduleId?`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });

  return response;
};

// 각 장소마다 별점 등록하기
export const registReview = async (
  accessToken,
  jejuPlaceId,
  scheduleItemId,
  score
) => {
  const response = await client.post(
    `/review/regist`,
    {
      jejuPlaceId,
      scheduleItemId,
      score,
    },
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
  accessToken
) => {
  const response = await client.get(
    `/review/scheduleItem/scheduleId?`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );

  return response;
};
