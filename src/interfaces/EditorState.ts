interface Phrase{
  trackIndex: any;
  phraseIndex: any;
  id:any;
  layerId:any;
  phrase:string;
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
