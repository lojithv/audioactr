import { serverConnInstance } from "../config/axiosInstance";

export namespace projectService {
 export const createProject = async (data:any) => {
    return await serverConnInstance.post("/create-project",data).then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };

  export const saveProject = async (data:any) => {
    return await serverConnInstance.post("/save-project",data).then((res) => {
      return res
    });
  };

  export const getAllProjects = async () => {
    return await serverConnInstance.get("/get-all-projects").then((res) => {
      console.log(process.env.SERVER_API_URL);
      console.log(process.env.REACT_APP_API_URL);
      if (res.data) {
        console.log(res.data);
      }
    });
  };
}
