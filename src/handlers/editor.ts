import { axiosInstance } from "../config/axiosInstance";
import { EditorState, Phrase } from "../interfaces/EditorState";
import { PlayerState } from "../interfaces/PlayerState";
import { PlayerStore } from "../store/PlayerStore";

export const handlePlay = (
  playerState: PlayerState,
  editorState: EditorState,
  voice: string
) => {
  if (!playerState.isPlaying) {
    PlayerStore.setPlayerState({ isPlaying: true });
    autoPlay(editorState);
  } else {
    PlayerStore.setPlayerState({ isPlaying: !playerState.isPlaying });
  }
};

function compare(a: Phrase, b: Phrase) {
  if (a.phraseIndex < b.phraseIndex) {
    return -1;
  }
  if (a.phraseIndex > b.phraseIndex) {
    return 1;
  }
  return 0;
}

export const autoPlay = (editorState: EditorState) => {
  const sortedPhrases = editorState.phrases.sort(compare);
  axiosInstance
    .post("/audio", { phrases: sortedPhrases, tracks: editorState.tracks })
    .then((res: any) => {
      console.log("completed");
      if (res) {
        PlayerStore.setPlayerState({ isPlaying: false });
      }
    });
};

export const playSinglePhrase = (editorState: EditorState,phrase:any) => {
  const track = editorState.tracks.find((t)=>t.trackIndex === phrase.trackIndex)
  axiosInstance
    .post("/play-single-phrase", { phrase: phrase, track: track })
    .then((res: any) => {
      console.log("completed");
    });
};

export const downloadAudio = (editorState: EditorState) => {
  const sortedPhrases = editorState.phrases.sort(compare);
  axiosInstance
    .post("/convert-text-to-audio", {
      phrases: sortedPhrases,
      tracks: editorState.tracks,
    })
    .then((res: any) => {
      fetch("http://localhost:5000/get-audio-file")
        .then((response) => response.blob())
        .then((blob) => {
          // Create a download link and click on it
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "audio.MP3";
          link.click();
        });
    });
};

export const downloadSinglePhraseAsAudio = (editorState: EditorState, phrase:any) => {
  
  const track = editorState.tracks.find((t)=>t.trackIndex === phrase.trackIndex)
  axiosInstance
    .post("/convert-single-phrase-to-audio", {
      phrase: phrase,
      track: track,
    })
    .then((res: any) => {
      fetch("http://localhost:5000/get-audio-file")
        .then((response) => response.blob())
        .then((blob) => {
          // Create a download link and click on it
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${track?.trackIndex}_${phrase.phraseIndex}`+".MP3";
          link.click();
        });
    });
};

export const stopPlayer = () => {
  axiosInstance.get("/stop-player").then((res) => {
    if (res.data?.length) {
      console.log(res.data);
    }
  });
};

export const pausePlayer = () => {
  axiosInstance.get("/pause-player").then((res) => {
    if (res.data?.length) {
      console.log(res.data);
    }
  });
};

export const handleKeyDown = (
  event: KeyboardEvent,
  playerState: PlayerState,
  editorState: EditorState,
  voice: string
) => {
  console.log(event.code);
  if (event.code === "Space") handlePlay(playerState, editorState, voice);
};
