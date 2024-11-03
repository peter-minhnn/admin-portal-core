import axios, { AxiosResponse } from "axios";
import { getSession } from "@/actions";

interface IErrorResponse {
  code: number;
  message: string;
}

class CustomError extends Error {
  response: IErrorResponse;
  constructor(message: string, response: IErrorResponse) {
    super(message);
    this.response = response;
  }
}

const globalAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});

globalAxiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session?.session_id}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

globalAxiosInstance.interceptors.response.use(function (
  response: AxiosResponse,
) {
  if (
    typeof response.data == "string" &&
    response.data.includes(
      "The request / response that are contrary to the Web firewall security policies have been blocked",
    )
  ) {
    const customError = new CustomError("firewallError", {
      code: 400,
      message: "firewallError",
    });
    return Promise.reject(customError);
  }

  return response;
});

export default globalAxiosInstance;
