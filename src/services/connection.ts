import { serverConnInstance } from "../config/axiosInstance";

export const testServerConn = () => {
    serverConnInstance.get("/test").then((res) => {
        console.log(process.env.SERVER_API_URL)
        console.log(process.env.REACT_APP_API_URL)
      if (res.data?.length) {
        console.log(res.data);
      }
    });
  };