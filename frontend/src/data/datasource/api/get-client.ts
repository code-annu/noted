import axiosInstance from "../config";

export async function getRequest<T>(endpoint: string) {
  const response = await axiosInstance.get(`${endpoint}`, {
    method: "GET",
  });

  return response.data as T;
}
