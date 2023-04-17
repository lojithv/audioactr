import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import GetAppIcon from "@mui/icons-material/GetApp";
import { IconButton } from "@mui/material";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { setActiveProject, setProjects, useActiveProject, useProjects } from "../store/ProjectsStore";
import { useEditorState } from "../store/EditorStore";
import DeleteIcon from '@mui/icons-material/Delete';
import localforage from "localforage";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ProjectDropdownMenu({project}:any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const activeProject = useActiveProject();
  const editorState = useEditorState();

  const projects = useProjects()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("click");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportProject = () => {
    console.log(activeProject)
    if (activeProject) {
      const updatedProjectState = { ...activeProject, state: editorState };
      setActiveProject(updatedProjectState);
      console.log(updatedProjectState)
      const element = document.createElement("a");
      const textFile = new Blob([JSON.stringify(updatedProjectState)], {type: 'application/json'}); //pass data from localStorage API to blob
      element.href = URL.createObjectURL(textFile);
      element.download = `${activeProject.name}.json`;
      document.body.appendChild(element); 
      element.click();
    }
    handleClose()
  };

  const handleProjectDelete = () =>{
    const updatedProjectsList = projects.filter((p)=>p!==project)
    setProjects(updatedProjectsList)
    localforage.setItem("projects",updatedProjectsList)
    handleClose()
  }

  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-label="delete"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertSharpIcon />
      </IconButton>
      {/* <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button> */}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleExportProject()} disableRipple>
          <GetAppIcon />
          Export Project
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleProjectDelete} disableRipple>
          <DeleteIcon />
          Delete Project
        </MenuItem>
        {/* <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem> */}
      </StyledMenu>
    </div>
  );
}
