import * as React from "react";
import { useEffect, useState } from "react";
import Storyboard from "../core/Storyboard";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { IconButton, TextField } from "@mui/material";
import {
  EditorStore,
  setEditorState,
  setSelectedPhrase,
  useSelectedPhrase,
} from "../store/EditorStore";
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

  const selectedPhrase = useSelectedPhrase();

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
        <div style={{ display: "flex" }}>
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
        <TextField
          id="outlined-multiline-static"
          multiline
          fullWidth
          value={selectedPhrase?.phrase}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedPhrase({
              ...selectedPhrase,
              phrase: event.target.value,
            });
            setEditorState({
              ...editorState,
              phrases: editorState.phrases.map((p) => {
                if (p.id === selectedPhrase?.id) {
                  return { ...p, phrase: event.target.value };
                } else {
                  return p;
                }
              }),
            });
          }}
          rows={4}
        />
        <Storyboard />
      </Subscribe>
    </div>
  );
};

export default Editor;
