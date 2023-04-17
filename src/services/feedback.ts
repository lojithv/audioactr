import { serverConnInstance } from "../config/axiosInstance";

export namespace FeedbackService {
  export const giveFeedback = async (data:any) => {
    return await serverConnInstance.post("/add-feedback",data).then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };
}
