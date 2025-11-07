import { AxiosError } from "axios";

export const handleError = (err: any, setError: (err: any) => void) => {
  if (err instanceof AxiosError) {
    setError(err.response?.data.error);
  } else {
    setError((err as Error).message);
  }
};

