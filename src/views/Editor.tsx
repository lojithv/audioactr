import * as React from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import SequenceEditor from "../components/SequeneEditor";
import { axiosInstance } from "../config/axiosInstance";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { IconButton } from "@mui/material";

type Props = {};

const Editor = () => {
  const [value, setValue] = React.useState<number>(0);
  const [play, setPlay] = React.useState(false);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => setValue((v) => v + 1), 1);
      return () => {
        clearInterval(interval);
      };
    }
  }, [play]);

  const handleKeyDown = (event: { key: any }) => {
    handlePlay();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [play]);

  const handlePlay = () => {
    if (!play) {
      setPlay(true);
      axiosInstance.get("/audio");
    } else {
      setPlay(!play);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div>
        <div style={{ color: "white" }}>{value}</div>
        {!play && (
          <IconButton onClick={() => handlePlay()}>
            <PlayArrowRoundedIcon />
          </IconButton>
        )}

        {play && (
          <IconButton onClick={() => handlePlay()}>
            <PauseRoundedIcon />
          </IconButton>
        )}

        <div style={{ color: "white" }} onClick={() => setValue(0)}>
          reset
        </div>
      </div>
      <SequenceEditor timer={value} />
    </div>
  );
};

export default Editor;
