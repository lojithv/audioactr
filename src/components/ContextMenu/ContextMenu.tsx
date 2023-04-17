import * as React from "react";
import {
  setContextMenuState,
  setEditorState,
  useContextMenuState,
  useEditorState,
  useSelectedPhrase,
} from "../../store/EditorStore";
import { ContextMenu } from "./styles";
import { downloadSinglePhraseAsAudio, playSinglePhrase } from "../../handlers/editor";

export default function ConetxtMenu() {
  const contextMenu = useContextMenuState();

  const editorState = useEditorState();

  const selectedPhrase = useSelectedPhrase();

  const deleteSelectedPhrase = () => {
    if (selectedPhrase) {
      const updatedPhrases = editorState.phrases.filter(
        (p) => p !== selectedPhrase
      );
      console.log(updatedPhrases);
      setEditorState({ ...editorState, phrases: updatedPhrases });
    }
  };

  const handleOptionClick = (action: string) => {
    switch (action) {
      case "delete":
        console.log("delete");
        deleteSelectedPhrase();
        break;
      case "copy":
        console.log("copy");
        break;
      case "download":
        console.log("edit");
        downloadSinglePhraseAsMp3();
        break;
      case "play":
        console.log("play");
        startPlaySinglePhrase();
        break;
    }
    setContextMenuState({ open: false, event: null });
  };

  const downloadSinglePhraseAsMp3 = () => {
    downloadSinglePhraseAsAudio(editorState, selectedPhrase);
  };

  const startPlaySinglePhrase = () => {
    playSinglePhrase(editorState,selectedPhrase)
  }

  return (
    <div>
      {contextMenu.open && (
        <ContextMenu
          top={contextMenu.event?.evt.pageY}
          left={contextMenu.event?.evt.pageX}
        >
          <ul>
            <li onClick={() => handleOptionClick("play")}>Play</li>
            <li onClick={() => handleOptionClick("download")}>Download</li>
            <li onClick={() => handleOptionClick("copy")}>Copy</li>
            <li onClick={() => handleOptionClick("delete")}>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
  );
}
