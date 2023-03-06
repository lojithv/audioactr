import * as React from "react";
import { useEffect, useState } from "react";
import SequenceEditor from "../components/SequeneEditor";
import { axiosInstance } from "../config/axiosInstance";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { IconButton } from "@mui/material";
import { EditorStore } from "../store/EditorStore";
import { initialEditorState } from "../dump/editor";
import Storyboard from "../components/SequeneEditor/Storyboard";
import { Subscribe } from "@react-rxjs/core";
import { PlayerStore } from "../store/PlayerStore";

type Props = {};

const Editor = () => {
  const playerState = PlayerStore.usePlayerState();
  const editorState = EditorStore.useEditorState();

  const timer = PlayerStore.useTimer();

  useEffect(() => {
    EditorStore.setEditorState(initialEditorState);
    PlayerStore.setPlayerState({ isPlaying: false });
  }, []);

  useEffect(() => {
    if (playerState.isPlaying) {
      const interval = setInterval(() => PlayerStore.setTimerValue(1), 100);
      return () => {
        clearInterval(interval);
      };
    }
  }, [playerState.isPlaying]);

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event.code);
    if (event.code === "Space") handlePlay();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerState.isPlaying]);

  const handlePlay = () => {
    if (!playerState.isPlaying) {
      PlayerStore.setPlayerState({ isPlaying: true });
      autoPlay();
    } else {
      PlayerStore.setPlayerState({ isPlaying: !playerState.isPlaying });
    }
  };

  const autoPlay = () => {
    axiosInstance
      .post("/audio", { textLayers: editorState.phrases })
      .then((res: any) => {
        console.log("completed");
        if (res) {
          PlayerStore.setPlayerState({ isPlaying: false });
        }
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
      <Subscribe>
        <div>
          <div style={{ color: "white" }}>{timer}</div>
          <IconButton
            onClick={() => {
              PlayerStore.setTimerValue(0);
              PlayerStore.setPlayerState({ isPlaying: false });
            }}
          >
            <StopRoundedIcon />
          </IconButton>

          {!playerState.isPlaying && (
            <IconButton onClick={() => handlePlay()}>
              <PlayArrowRoundedIcon />
            </IconButton>
          )}

          {playerState.isPlaying && (
            <IconButton onClick={() => handlePlay()}>
              <PauseRoundedIcon />
            </IconButton>
          )}
        </div>
        <SequenceEditor />
        <Storyboard />
      </Subscribe>
    </div>
  );
};

export default Editor;
