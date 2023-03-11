interface Phrase{
  trackIndex: any;
  phraseIndex: any;
  id:any;
  trackId:any;
  phrase:string;
}

interface Track{
  id:any;
  voice?:string|boolean;
  text: string,
  trackIndex: number,
}

export interface EditorState {
  tracks: Track[];
  phrases: Phrase[];
}
