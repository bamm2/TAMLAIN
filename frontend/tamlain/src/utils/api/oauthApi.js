import client from "../client";

// 로그인

// 로그아웃
export const logout = async (accessToken) => {
  console.log("accessToken : " + accessToken);
  const response = await client.get(`/oauth/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

// access token 갱신
export const refreshAccessToken = async (accessToken) => {
  const response = await client.post(`/oauth/token`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
