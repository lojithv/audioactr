import { Box, Button } from "@mui/material";
import ProjectsTable from "../components/ProjectsTable";
import Spacing from "../components/Spacing";
import React, { useEffect, useRef } from "react";
import {
  // existing code
  useNavigate,
} from "react-router-dom";
import { useWindowDimensions } from "../store/EditorStore";
import { date, getNewDate, oneDay } from "../helpers/projects.helper";
import { setProjects, useProjects } from "../store/ProjectsStore";
import { initialEditorState } from "../dump/editor";
import CreateProjectFormDialog from "../components/CreateProjectForm";
import localforage from "localforage";
import NetworkSwitch from "../components/NetworkSwitch";
import { useNetworkMode } from "../store/GlobalStore";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const windowDimensions = useWindowDimensions();

  const inputFile = useRef(null as any);

  const projects = useProjects();
  const networkMode = useNetworkMode();

  const rows = [
    // {
    //   name: "Project1",
    //   createdAt: getNewDate(date + 1 * oneDay),
    //   state: initialEditorState,
    // },
    // {
    //   name: "Project2",
    //   createdAt: getNewDate(date + 1 * oneDay),
    //   state: initialEditorState,
    // },
    // {
    //   name: "Project3",
    //   createdAt: getNewDate(date + 1 * oneDay),
    //   state: initialEditorState,
    // },
    // {
    //   name: "Project4",
    //   createdAt: getNewDate(date + 1 * oneDay),
    //   state: initialEditorState,
    // },
  ];

  useEffect(() => {
    localforage.getItem("projects").then((cachedProjects: any) => {
      console.log(cachedProjects);
      if (cachedProjects) {
        setProjects(cachedProjects);
      }
    });
  }, []);

  const handleNewProjectCreate = () => {};

  const openCreateProjectForm = () => {};

  const handleImportProject = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
    // const updatedProjectsList = [...projects, {name:"Import", date: getNewDate(date + 1*oneDay)}]
    // setProjects(updatedProjectsList)
  };

  const onChangeFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0] as File;
    file.text().then((data) => {
      console.log(data);
      const importedProjectData = JSON.parse(data);
      const updatedProjectsList = [...projects, importedProjectData];
      setProjects(updatedProjectsList);
      localforage.setItem("projects", updatedProjectsList);
    });
  };

  return (
    <Box
      sx={{
        width: windowDimensions.width - 20,
        maxWidth: "100%",
      }}
    >
      <div style={{ padding: "50" }}>
        <div
          style={{ display: "flex", gap: 10, justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={onChangeFile}
            />
            <CreateProjectFormDialog />
            <Button
              variant="contained"
              onClick={() => {
                // navigate("/editor");
                handleImportProject();
              }}
            >
              Import Project
            </Button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <NetworkSwitch />
            {networkMode && (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/pricing");
                  }}
                >
                  Pricing
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
        <Spacing space={40} />
        <ProjectsTable />
      </div>
    </Box>
  );
};

export default Home;
