import axiosInstance from "../config";

export async function deleteRequest<T>(endpoint: string) {
  const response = await axiosInstance.delete(`${endpoint}`, {
    method: "DELETE",
  });
  return response.data as T;
}
