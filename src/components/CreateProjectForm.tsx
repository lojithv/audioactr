import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { setProjects, useProjects } from "../store/ProjectsStore";
import { initialEditorState } from "../dump/editor";
import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

export default function CreateProjectFormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [projectName, setProjectName] = React.useState("");

  const projects = useProjects();

  const createNewProject = () => {
    const updatedProjectsList = [
      ...projects,
      {
        name: projectName,
        state: initialEditorState,
        createdAt: Date.now(),
        projectId: uuidv4(),
      },
    ];
    setProjects(updatedProjectsList);
    localforage.setItem("projects", updatedProjectsList);
    handleClose();
  };

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectName(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={handleProjectNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createNewProject}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
