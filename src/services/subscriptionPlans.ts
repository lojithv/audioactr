import { serverConnInstance } from "../config/axiosInstance";

export namespace SubscriptionPlansService {
 export const getAllSubscriptionPlans = async () => {
    return await serverConnInstance.get("/get-all-plans").then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };
}
