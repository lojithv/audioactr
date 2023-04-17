import { EditorState } from "./EditorState";

export interface ProjectState {
    name: string;
    createdAt:any;
    state:EditorState;
  }