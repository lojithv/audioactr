import React from "react";
import { EditorState } from "../interfaces/EditorState";

export const initialEditorState:EditorState = {
    tracks: [
        {
          id: 1,
          text: "Step 1",
          width: 100,
          layerIndex: 1,
          voice:false 
        },
        {
          id: 2,
          text: "Step 2",
          width: 100,
          layerIndex: 2,
          voice:false 
        },
        {
          id: 3,
          text: "Step 3",
          width: 100,
          layerIndex: 3,
          voice:false 
        },
        {
          id: 4,
          text: "Step 4",
          width: 100,
          layerIndex: 4,
          voice:false 
        },
        {
          id: 5,
          text: "Step 5",
          width: 100,
          layerIndex: 5,
          voice:false 
        },
      ],
    phrases:[
        { id:1, layerId: 1, phrase: "hello", trackIndex:1,phraseIndex:0},
        {id:2, layerId: 2, phrase: "world", trackIndex:2,phraseIndex:1},
        {id:3, layerId: 1, phrase:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",trackIndex:1,phraseIndex:3 },
        {id:4, layerId: 2, phrase: "Hello world!", trackIndex:2,phraseIndex:4},
        {id:5, layerId: 3, phrase: "THE", trackIndex:3,phraseIndex:2},
        {id:6, layerId: 4, phrase: "LAZY", trackIndex:4,phraseIndex:5},
        {id:7, layerId: 5, phrase: "DOG", trackIndex:5,phraseIndex:3},
    
      ],
  };