import * as React from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import SequenceEditor from "../components/SequeneEditor";
import { axiosInstance } from "../config/axiosInstance";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { IconButton } from "@mui/material";

type Props = {};

const Editor = () => {
  const [value, setValue] = React.useState<number>(0);
  const [play, setPlay] = React.useState(false);

  const [currentTextLayer, setCurrentTextLayer] = useState(0);

  const [layerData, setLayerData] = useState<any[]>([
    {
      id: 1,
      text: "Step 1",
      width: 100,
      layerIndex: 1,
    },
    {
      id: 2,
      text: "Step 2",
      width: 100,
      layerIndex: 2,
    },
    {
      id: 3,
      text: "Step 3",
      width: 100,
      layerIndex: 3,
    },
    {
      id: 4,
      text: "Step 4",
      width: 100,
      layerIndex: 4,
    },
    {
      id: 5,
      text: "Step 5",
      width: 100,
      layerIndex: 5,
    },
  ]);

  const [textLayers, setTextLayers] = useState([
    { layerId: 1, phrase: "hello", startTime: 0 },
    { layerId: 2, phrase: "world", startTime: 100 },
    { layerId: 1, phrase: "JUMPS", startTime: 200 },
    { layerId: 2, phrase: "OVER", startTime: 300 },
    { layerId: 3, phrase: "THE", startTime: 400 },
    { layerId: 4, phrase: "LAZY", startTime: 500 },
    { layerId: 5, phrase: "DOG", startTime: 600 },
  ]);

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => setValue((v) => v + 1), 1);
      return () => {
        clearInterval(interval);
      };
    }
  }, [play]);

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event.code);
    if (event.code === "Space") handlePlay();
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
      autoPlay();
    } else {
      setPlay(!play);
    }
  };

  const autoPlay = () => {
    axiosInstance
      .post("/audio", { textLayers: textLayers })
      .then((res: any) => {
        console.log("completed");
      });
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
        <IconButton
          onClick={() => {
            setValue(0);
            setPlay(false);
          }}
        >
          <StopRoundedIcon />
        </IconButton>

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
      </div>
      {/* <SequenceEditor
        timer={value}
        layerData={layerData}
        setLayerData={setLayerData}
        textLayers={textLayers}
        setTextLayers={setTextLayers}
      /> */}
    </div>
  );
};

export default Editor;
