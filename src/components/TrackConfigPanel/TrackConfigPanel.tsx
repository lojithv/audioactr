import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { handleStepDataChange } from "../../handlers/storyboard";
import { EditorStore } from "../../store/EditorStore";
import { setEditorVisibility, useEditorVisibility, useSelectedTrack } from "../../store/TrackConfigStore";
import SelectVoice from "../SelectVoice";
import { useEffect } from "react";

interface Props{
    handleValueChange?:any
}

const TrackConfigPanel = () => {
  const selectedTrack = useSelectedTrack()
  const open = useEditorVisibility()
  const [text,setText]=React.useState('')
  const stepId = useSelectedTrack()

  const editorState = EditorStore.useEditorState()

  const layerData = editorState.tracks;

  useEffect(() => {
    setText(selectedTrack?.text || "")
  }, [selectedTrack])

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
