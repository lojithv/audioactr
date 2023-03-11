import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { Track } from "../interfaces/EditorState";

export const [editorVisibilityChange$, setEditorVisibility] =
  createSignal<boolean>();
export const [useEditorVisibility, editorVisibility$] = bind<boolean>(
  editorVisibilityChange$,
  false
);

export const [selectedTrackChange$, setSelectedTrack] =
  createSignal<Track|null>();
export const [useSelectedTrack, selectedTrack$] = bind<Track|null>(
  selectedTrackChange$,null
);
