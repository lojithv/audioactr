import { serverConnInstance } from "../config/axiosInstance";

export namespace PaymentService {
  export const getClientSecret = async () => {
    return await serverConnInstance.post("/create-payment-intent",{}).then((res) => {
      return res
    });
  };
}
