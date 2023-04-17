import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { Track } from "../interfaces/EditorState";

export const [projectsChange$, setProjects] = createSignal<any[]>();
export const [useProjects, projects$] = bind<any[]>(projectsChange$, []);
