import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { initialEditorState } from "../dump/editor";

export namespace EditorStore {
  export const [editorChange$, setEditorState] = createSignal();

  export const [useEditorState, editorState$] = bind<any>(editorChange$, initialEditorState);
}
