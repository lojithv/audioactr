import * as React from "react";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import { setNetworkMode, useNetworkMode } from "../store/GlobalStore";

export default function NetworkSwitch() {
  const networkMode = useNetworkMode();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNetworkMode(event.target.checked);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography>{networkMode ? "Online" : "Offline"}</Typography>
      <Switch
        checked={networkMode}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
}
