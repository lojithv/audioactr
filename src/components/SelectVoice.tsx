import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { setSelectedVoice, useSelectedVoice, useVoices } from '../store/EditorStore';

export default function SelectVoice() {
    const voices = useVoices()

  const selectedVoice = useSelectedVoice()

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedVoice(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Voice</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={selectedVoice}
        label="Voice"
        onChange={handleChange}
      > 
           <MenuItem value="">
          <em>None</em>
        </MenuItem>
      {voices.map((v)=>{
        return (
            <MenuItem key={v.id} value={v.id}>
            <em>{v.name}</em>
          </MenuItem>
        )
      })}
      </Select>
    </FormControl>
  );
}