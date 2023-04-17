import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { Track } from "../interfaces/EditorState";
import { ProjectState } from "../interfaces/ProjectState";

export const [projectsChange$, setProjects] = createSignal<ProjectState[]>();
export const [useProjects, projects$] = bind<ProjectState[]>(projectsChange$, []);

export const [activeProjectChange$, setActiveProject] = createSignal<ProjectState>();
export const [useActiveProject, activeProject$] = bind<ProjectState|null>(activeProjectChange$, null);