import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { Track } from "../interfaces/EditorState";
import { ProjectState } from "../interfaces/ProjectState";

export const [projectsChange$, setProjects] = createSignal<any[]>();
export const [useProjects, projects$] = bind<any[]>(projectsChange$, []);

export const [activeProjectChange$, setActiveProject] = createSignal<ProjectState>();
export const [useActiveProject, activeProject$] = bind<ProjectState|null>(activeProjectChange$, null);