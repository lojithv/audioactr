import { axiosInstance } from "../config/axiosInstance";
import { EditorState } from "../interfaces/EditorState";
import { PlayerState } from "../interfaces/PlayerState";
import { PlayerStore } from "../store/PlayerStore";

export const handlePlay = (playerState:PlayerState,editorState:EditorState) => {
  if (!playerState.isPlaying) {
    PlayerStore.setPlayerState({ isPlaying: true });
    autoPlay(editorState);
  } else {
    PlayerStore.setPlayerState({ isPlaying: !playerState.isPlaying });
  }
};

export const autoPlay = (editorState:EditorState) => {
  axiosInstance
    .post("/audio", { textLayers: editorState.phrases })
    .then((res: any) => {
      console.log("completed");
      if (res) {
        PlayerStore.setPlayerState({ isPlaying: false });
      }
    });
};

export const handleKeyDown = (event: KeyboardEvent,playerState:PlayerState,editorState:EditorState) => {
  console.log(event.code);
  if (event.code === "Space") handlePlay(playerState,editorState);
};
