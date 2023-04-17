export interface Phrase{
  trackIndex: any;
  phraseIndex: any;
  id:any;
  trackId:any;
  phrase:string;
}

export interface Track{
  id:any;
  voice?:string|boolean;
  text: string,
  trackIndex: number,
  volume:number,
  speechRate:number,
 
}

export interface EditorState {
  tracks: Track[];
  phrases: Phrase[];
}
