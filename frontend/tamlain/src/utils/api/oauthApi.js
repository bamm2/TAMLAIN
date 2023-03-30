import client from "../client";

// 로그인

// 로그아웃
export const logout = async (accessToken, data) => {
  const response = await client.post(
    `/oauth/logout`,
    data,
    {
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    }
  );

  return response;
};

// access token 갱신
export const refreshAccessToken = async (
  accessToken,
  data
) => {
  const response = await client.post(`/oauth/token`, data, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });

  return response;
};
