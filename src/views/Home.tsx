import { Box, Button } from "@mui/material";
import ProjectsTable from "../components/ProjectsTable";
import Spacing from "../components/Spacing";
import React from "react";
import {
  // existing code
  useNavigate,
} from "react-router-dom";
import { useWindowDimensions } from "../store/EditorStore";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const windowDimensions = useWindowDimensions();
  return (
    <Box
      sx={{
        width: windowDimensions.width - 20,
        maxWidth: "100%",
      }}
    >
      <div style={{ padding: "50" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/editor");
            }}
          >
            New Project
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/editor");
            }}
          >
            Open Project
          </Button>
        </div>
        <Spacing space={40} />
        <ProjectsTable />
      </div>
    </Box>
  );
};

export default Home;
