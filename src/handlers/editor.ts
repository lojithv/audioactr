import { axiosInstance } from "../config/axiosInstance";
import { EditorState, Phrase } from "../interfaces/EditorState";
import { PlayerState } from "../interfaces/PlayerState";
import { PlayerStore } from "../store/PlayerStore";

export const handlePlay = (playerState:PlayerState,editorState:EditorState,voice:string) => {
  if (!playerState.isPlaying) {
    PlayerStore.setPlayerState({ isPlaying: true });
    autoPlay(editorState,voice);
  } else {
    PlayerStore.setPlayerState({ isPlaying: !playerState.isPlaying });
  }
};

function compare( a:Phrase, b:Phrase ) {
  if ( a.phraseIndex < b.phraseIndex ){
    return -1;
  }
  if ( a.phraseIndex > b.phraseIndex ){
    return 1;
  }
  return 0;
}

export const autoPlay = (editorState:EditorState,voice:string) => {
  const sortedPhrases = editorState.phrases.sort(compare)
  axiosInstance
    .post("/audio", { phrases: sortedPhrases, tracks:editorState.tracks })
    .then((res: any) => {
      console.log("completed");
      if (res) {
        PlayerStore.setPlayerState({ isPlaying: false });
      }
    });
};

export const handleKeyDown = (event: KeyboardEvent,playerState:PlayerState,editorState:EditorState,voice:string) => {
  console.log(event.code);
  if (event.code === "Space") handlePlay(playerState,editorState,voice);
};
