import { LoadingState } from "../components/Loading";
import { IAlert } from "../store";

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const asyncProcess = async (asyncFunction: () => Promise<void>, alert: IAlert, loading: LoadingState) => {
  try {
    loading.setLoading(true);
    await asyncFunction();
  } catch (error: unknown) {
    if(error instanceof Error) {
      alert.setTitle("Error")
      alert.setMessage(error.message);
      alert.setShow(true);
    } else {
      alert.setMessage("Unknown error")
      alert.setTitle("Error");
      alert.setShow(true)
    }
  } finally {
    loading.setLoading(false);
  }
};