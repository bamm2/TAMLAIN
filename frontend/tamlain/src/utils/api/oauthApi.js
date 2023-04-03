import client from "../client";

// 로그인

// 로그아웃
export const logout = async (accessToken) => {
  const response = await client.post(`/oauth/logout`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });

  return response;
};

// access token 갱신
export const refreshAccessToken = async (accessToken) => {
  const response = await client.post(`/oauth/token`, {
    headers: {
      "X-AUTH-TOKEN": accessToken,
    },
  });

  return response;
};
