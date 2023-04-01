import client from "../client";

// 마이페이지에서 나의 일정 내역 조회하기
export const getScheduleHistory = async (
  accessToken,
  userId
) => {
  const response = await client.get(`/history/${userId}`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });

  return response;
};

// 마이페이지에서 나의 일정 삭제하기
export const deleteScheduleHistory = async (
  accessToken,
  scheduleId
) => {
  const response = await client.patch(
    `/history/delete/${scheduleId}`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

// 일정 내역에서 원하는 일정명 수정하기
export const modifyScheduleName = async (
  accessToken,
  data
) => {
  const response = await client.patch(
    `/history/modify`,
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

// 세부 일정 내역 조회하기
export const getScheduleDetail = async (
  accessToken,
  scheduleId
) => {
  const response = await client.get(
    `/history/scheduleDetail/${scheduleId}`,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );

  return response;
};
