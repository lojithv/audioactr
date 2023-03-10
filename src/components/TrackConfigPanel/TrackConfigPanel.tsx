import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef } from "react";
import { handleStepDataChange } from "../../handlers/storyboard";
import { EditorStore } from "../../store/EditorStore";
import { setEditorVisibility, useEditorVisibility, useSelectedTrackId } from "../../store/TrackConfigStore";
import SelectVoice from "../SelectVoice";

interface Props{
    handleValueChange?:any
}

const TrackConfigPanel = () => {
  const open = useEditorVisibility()
  const [text,setText]=React.useState("")
  const stepId = useSelectedTrackId()

  const editorState = EditorStore.useEditorState()

  const layerData = editorState.tracks;

  const handleClose = () => {
    setEditorVisibility(false)
  };

  const handleSubmit = () =>{
    handleStepDataChange(layerData,editorState,stepId,text)
    setEditorVisibility(false)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ color: "white" }}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            fullWidth
            variant="standard"
          />
          <SelectVoice/>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "white" }} onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TrackConfigPanel;
