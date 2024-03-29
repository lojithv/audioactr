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
import {
  setNetworkMode,
  setUser,
  useNetworkMode,
  useUser,
} from "../store/GlobalStore";
import { AuthService } from "../services/auth";
import { projectService } from "../services/project";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const windowDimensions = useWindowDimensions();

  const inputFile = useRef(null as any);

  const projects = useProjects();
  const networkMode = useNetworkMode();

  const user = useUser();

  useEffect(() => {
    localforage.getItem("projects").then((cachedProjects: any) => {
      console.log(cachedProjects);
      if (cachedProjects) {
        setProjects(cachedProjects);
      } else {
        localforage.getItem("user").then((usr: any) => {
          console.log(usr);
          if (usr) {
            projectService.getAllProjects(usr).then((res) => {
              console.log(res);
              if (res.status === 200) {
                const fetchedProjects = res.data.map((p: any) => {
                  return p.state;
                });
                setProjects(fetchedProjects);
              }
            });
          }
        });
      }
    });
    localforage.getItem("networkMode").then((nm: any) => {
      setNetworkMode(nm);
    });
    localforage.getItem("user").then((usr: any) => {
      AuthService.getSelf({ usr })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setUser(usr);
    });
  }, []);

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

  const handleLogout = () => {
    localforage.removeItem("user");
    navigate("/signin");
  };

  const handleClearCache = () => {
    localforage.removeItem("projects");
    setProjects([]);
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
            <Button
              variant="contained"
              onClick={() => {
                // navigate("/editor");
                handleClearCache();
              }}
            >
              Clear Cache
            </Button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <NetworkSwitch />
            {networkMode && (
              <>
                {((user && !user.paidUser) || !user) && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/pricing");
                    }}
                  >
                    Pricing
                  </Button>
                )}

                {!user && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </Button>
                )}
                {user && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Log Out
                  </Button>
                )}
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
