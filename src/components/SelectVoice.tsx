import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  EditorStore,
  setEditorState,
  setSelectedVoice,
  setVoices,
  useSelectedVoice,
  useVoices,
} from "../store/EditorStore";
import { useSelectedTrack } from "../store/TrackConfigStore";
import { axiosInstance } from "../config/axiosInstance";

export default function SelectVoice() {
  const voices = useVoices();

  const selectedVoice = useSelectedVoice();

  const editorState = EditorStore.useEditorState();

  const selectedLayer = useSelectedTrack();

  React.useEffect(() => {
    if (!voices.length) {
      axiosInstance.get("/voices").then((res) => {
        if (res.data?.length) {
          setVoices(res.data);
          console.log(res.data);
        }
      });
      if (selectedLayer?.voice) {
        setSelectedVoice(selectedLayer.voice);
      } else {
        setSelectedVoice(null);
      }
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedVoice(event.target.value);
    if (editorState)
      setEditorState({
        ...editorState,
        tracks: editorState.tracks.map((t) => {
          if (t.id === selectedLayer?.id) {
            return { ...t, voice: event.target.value };
          } else {
            return t;
          }
        }),
      });
  };

  return (
    <FormControl
      sx={{ marginBottom: "15px", marginTop: "15px", minWidth: 120 }}
      size="small"
      fullWidth
    >
      <InputLabel id="demo-select-small">Select Voice</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectedVoice}
        label="Select Voice"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {voices.map((v) => {
          return (
            <MenuItem key={v.id} value={v.id}>
              <em>{v.name}</em>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
