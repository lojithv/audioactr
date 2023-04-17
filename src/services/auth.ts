import { serverConnInstance } from "../config/axiosInstance";

export namespace AuthService {
  export const signin = async (data:any) => {
    return await serverConnInstance.post("/signin",data).then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };

  export const signup = async (data:any) => {
    return await serverConnInstance.post("/signup",data).then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };
}
