import client from "../client";

export const surveyApi = async (accessToken, data) => {
  const response = await client.post(`/survey/regist`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
