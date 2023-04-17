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
import { useProjects } from "../store/ProjectsStore";



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

  const handleProjectOpen = () => {
    navigate('/editor')
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
          {projects.map((row,i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={()=>handleProjectOpen()}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.createdAt.toString()}</TableCell>
              <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton aria-label="delete" disabled color="primary">
                  <MoreVertSharpIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
