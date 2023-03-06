import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { EditorState } from "../interfaces/EditorState";

export const [editorChange$, setEditorState] = createSignal<EditorState>();

export const [useEditorState, editorState$] = bind<any>(editorChange$, {});

export const EditorStore = {
  editorChange$,
  setEditorState,
  useEditorState,
};
