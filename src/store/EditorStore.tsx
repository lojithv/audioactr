import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { KonvaEventObject } from "konva/lib/Node";
import { initialEditorState } from "../dump/editor";
import { EditorHelper } from "../helpers/editor";
import { EditorState } from "../interfaces/EditorState";

export const [editorChange$, setEditorState] = createSignal<EditorState>();
export const [useEditorState, editorState$] = bind<EditorState|null>(
  editorChange$,
  null
);

export const [windowDimensionChange$, setWindowDimensions] =
  createSignal<any>();
export const [useWindowDimensions, windowDimensions$] = bind<any>(
  windowDimensionChange$,
  EditorHelper.getWindowDimensions()
);

export const EditorStore = {
  editorChange$,
  setEditorState,
  useEditorState,
};

export const [selectedPhraseChange$, setSelectedPhrase] = createSignal<any>();
export const [useSelectedPhrase, selectedPhrase$] = bind<any>(
  selectedPhraseChange$,
  null
);

export const [contextMenuChange$, setContextMenuState] = createSignal<{open:boolean,event?:KonvaEventObject<MouseEvent>|null}>();
export const [useContextMenuState, contextMenuState$] =  bind<{open:boolean,event?:KonvaEventObject<MouseEvent>|null}>(contextMenuChange$,{open:false})

export const [voicesChange$, setVoices] = createSignal<any[]>();
export const [useVoices, voices$] = bind<any[]>(voicesChange$,[]);

export const [selectedVoiceChange$,setSelectedVoice] = createSignal<any>()
export const [useSelectedVoice, selectedVoice$] = bind<any>(selectedVoiceChange$,'')
