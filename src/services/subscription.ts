import { serverConnInstance } from "../config/axiosInstance";

export namespace SubscriptionService {
  export const subscribeToAPlan = async (data:any) => {
    return await serverConnInstance.post("/subscribe-to-a-plan",data).then((res) => {
      return res
    });
  };

  export const cancelSubscription = async (data:any) => {
    return await serverConnInstance.post("/cancel-subscription",data).then((res) => {
      if (res.data) {
        console.log(res.data);
      }
    });
  };

  export const getSubscriptionStatus = async () => {
    return await serverConnInstance.get("/get-subscription-status").then((res) => {
      if (res.data) {
        console.log(res.data);
      }
    });
  };
}
