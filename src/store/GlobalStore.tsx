import { createSignal } from "@react-rxjs/utils";
import { Track } from "../interfaces/EditorState";
import { ProjectState } from "../interfaces/ProjectState";
import { bind } from "@react-rxjs/core";

export const [networkModeChange$, setNetworkMode] = createSignal<boolean>();
export const [useNetworkMode, networkMode$] = bind<boolean>(
  networkModeChange$,
  false
);

export const [userChange$, setUser] = createSignal<any>();
export const [useUser, user$] = bind<any>(userChange$, null);
