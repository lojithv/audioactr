interface Phrase{
  id:any;
  layerId:any;
  phrase:string;
  startTime:number;
}

interface Track{
  id:any;
  voice?:string;
  text: string,
  width: number,
  layerIndex: number,
}

export interface EditorState {
  tracks: Track[];
  phrases: Phrase[];
}
