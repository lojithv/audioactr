import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { initialEditorState } from "../dump/editor";
import { EditorState } from "../interfaces/EditorState";

export const [editorChange$, setEditorState] = createSignal<EditorState>();

export const [useEditorState, editorState$] = bind<EditorState>(editorChange$, initialEditorState);

export const EditorStore = {
  editorChange$,
  setEditorState,
  useEditorState,
};
