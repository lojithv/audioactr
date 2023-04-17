import { identity } from "rxjs";
import { EditorState, Track } from "../interfaces/EditorState";
import { EditorStore } from "../store/EditorStore";
import {
  setEditorVisibility,
  setSelectedTrack,
} from "../store/TrackConfigStore";

export const handleStepClick = (track: Track) => {
  setSelectedTrack(track);
  setEditorVisibility(true);
};

export const openSublayerEditor = (subLayerEditorRef: any, id: any) => {
  subLayerEditorRef?.current?.getAlert(id);
};

export const handleStepDataChange = (
  layerData: any[],
  editorState: EditorState,
  id: any,
  newData: any
) => {
  console.log(newData,id);
  const newSequenceData = [...layerData];
  const index = newSequenceData.findIndex((step) => step.id === id);
  console.log(index)
  if (newSequenceData[index]) {
    console.log(newSequenceData[index])
    newSequenceData[index] = newData
      ? {
          ...newSequenceData[index],
          volume: newData.volume,
          text: newData.text,
          speechRate:newData.speechRate
        }
      : newSequenceData[index];
      console.log(newSequenceData[index])
    EditorStore.setEditorState({ ...editorState, tracks: newSequenceData });
  }
};
