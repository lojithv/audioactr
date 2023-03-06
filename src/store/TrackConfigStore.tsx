import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";

export const [editorVisibilityChange$, setEditorVisibility] =
  createSignal<boolean>();
export const [useEditorVisibility, editorVisibility$] = bind<boolean>(
  editorVisibilityChange$,
  false
);

export const [selectedTrackIdChange$, setSelectedTrackId] =
  createSignal<number>();
export const [useSelectedTrackId, selectedTrackId$] = bind<number>(
  selectedTrackIdChange$,0
);
