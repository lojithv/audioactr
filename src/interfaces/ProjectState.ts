import { EditorState } from "./EditorState";

export interface ProjectState {
  projectId: string;
  name: string;
  createdAt: any;
  state: EditorState | null;
}
