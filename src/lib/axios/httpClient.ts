import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_UR;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in environment variables");
}

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
  try {
    const response = await axiosInstance().get(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    console.log(`GET request failed to ${endpoint}`, error);
    throw error;
  }
};

const httpPost = async (
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
) => {
  try {
    const response = await axiosInstance().post(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    console.log(`POST failed to ${endpoint}`, error);
  }
};



export const httpClient = {
  get: httpGet,
  post: httpPost,

};
