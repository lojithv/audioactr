import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { handleStepDataChange } from "../../handlers/storyboard";
import { EditorStore, setSelectedVoice } from "../../store/EditorStore";
import {
  setEditorVisibility,
  useEditorVisibility,
  useSelectedTrack,
} from "../../store/TrackConfigStore";
import SelectVoice from "../SelectVoice";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Typography } from "@mui/material";

interface Props {
  handleValueChange?: any;
}

function valuetext(value: number) {
  return `${value} words per minute`;
}

const TrackConfigPanel = () => {
  const selectedTrack = useSelectedTrack();
  const open = useEditorVisibility();
  const [text, setText] = React.useState("");
  const stepId = useSelectedTrack();

  const editorState = EditorStore.useEditorState();

  const layerData = editorState?.tracks;

  useEffect(() => {
    setText(selectedTrack?.text || "");
    setVolume(selectedTrack?.volume || 100);
    setSpeechRate(selectedTrack?.speechRate || 200);
  }, [selectedTrack]);

  const handleClose = () => {
    setEditorVisibility(false);
  };

  const handleSubmit = () => {
    if (layerData)
      handleStepDataChange(layerData, editorState, selectedTrack?.id, {
        text,
        volume: volume,
        speechRate: speechRate,
      });
    console.log("handle submit");
    setEditorVisibility(false);
    setSelectedVoice(null);
  };

  const [volume, setVolume] = React.useState<number>(100);
  const [speechRate, setSpeechRate] = React.useState<number>(200);

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleSpeechRateChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSpeechRate(newValue as number);
  };

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
            onChange={(e) => setText(e.target.value)}
            fullWidth
            variant="standard"
          />
          <SelectVoice />
          <Stack spacing={2} direction="row" sx={{ mb: 2 }} alignItems="center">
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolumeChange}
            />
            <VolumeUp />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Typography variant="body2" component="h2">
              Speech Rate
            </Typography>
            <Slider
              aria-label="Change Speech Rate"
              value={speechRate}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              onChange={handleSpeechRateChange}
              step={20}
              marks
              min={40}
              max={400}
            />
          </Stack>
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
