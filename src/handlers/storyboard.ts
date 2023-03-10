import { EditorState } from "../interfaces/EditorState";
import { EditorStore } from "../store/EditorStore";
import { setEditorVisibility, setSelectedTrackId } from "../store/TrackConfigStore";

export const handleStepClick = ( id: number) => {
    setSelectedTrackId(id)
    setEditorVisibility(true)
  };

 export const openSublayerEditor = (subLayerEditorRef:any,id: any) => {
    subLayerEditorRef?.current?.getAlert(id);
  };

 export const handleStepDataChange = (layerData:any[],editorState:EditorState,id: any, newData: any) => {
    const newSequenceData = [...layerData];
    const index = newSequenceData.findIndex((step) => step.id === id);
    newSequenceData[index].text = newData ? newData : "";
    EditorStore.setEditorState({...editorState,tracks:newSequenceData})
  };