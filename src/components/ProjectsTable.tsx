import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { useNavigate } from "react-router-dom";
import { setActiveProject, useProjects } from "../store/ProjectsStore";
import { ProjectState } from "../interfaces/ProjectState";
import ProjectDropdownMenu from "./ProjectDropdownMenu";
import { initialEditorStateCopy } from "../dump/editor";
import { setEditorState } from "../store/EditorStore";



// const rows = [
//   createData("Project1", getNewDate(date + 1*oneDay), 6.0),
//   createData("Project2", getNewDate(date - 5*oneDay), 9.0),
//   createData("Project3", getNewDate(date - 8*oneDay), 16.0),
//   createData("Project4", getNewDate(date - 6*oneDay), 3.7),
//   createData("Project5", getNewDate(date - 10*oneDay), 16.0),
// ];

export default function ProjectsTable() {
  const navigate = useNavigate();

  const projects = useProjects()

  const handleProjectOpen = (project:ProjectState) => {
    console.log(project)
    navigate('/editor', { state: {projectState:project} })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="center">DATE</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project,i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" onClick={()=>handleProjectOpen(project)}>
                {project.name}
              </TableCell>
              <TableCell align="center" onClick={()=>handleProjectOpen(project)}>{project.createdAt.toString()}</TableCell>
              <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
              <ProjectDropdownMenu project={project}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
