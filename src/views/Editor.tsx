import * as React from "react";
import { useEffect, useState } from "react";
import Storyboard from "../core/Storyboard";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { IconButton } from "@mui/material";
import { EditorStore } from "../store/EditorStore";
import { initialEditorState } from "../dump/editor";
import { Subscribe } from "@react-rxjs/core";
import { PlayerStore } from "../store/PlayerStore";
import { handleKeyDown, handlePlay } from "../handlers/editor";

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

  useEffect(() => {
    window.addEventListener("keydown", (e) =>
      handleKeyDown(e, playerState, editorState)
    );
    return () => {
      window.removeEventListener("keydown", (e) =>
        handleKeyDown(e, playerState, editorState)
      );
    };
  }, [playerState.isPlaying]);

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
            <IconButton onClick={() => handlePlay(playerState, editorState)}>
              <PlayArrowRoundedIcon />
            </IconButton>
          )}

          {playerState.isPlaying && (
            <IconButton onClick={() => handlePlay(playerState, editorState)}>
              <PauseRoundedIcon />
            </IconButton>
          )}
        </div>
        <Storyboard />
      </Subscribe>
    </div>
  );
};

export default Editor;
