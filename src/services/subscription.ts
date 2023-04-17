import { serverConnInstance } from "../config/axiosInstance";

export namespace SubscriptionService {
  export const subscribeToAPlan = async (data:any) => {
    return await serverConnInstance.post("/subscribe-to-a-plan",data).then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };

  export const getSubscriptionStatus = async () => {
    return await serverConnInstance.get("/get-subscription-status").then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };
}
