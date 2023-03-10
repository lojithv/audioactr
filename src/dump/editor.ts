import React from "react";
import { EditorState } from "../interfaces/EditorState";

export const initialEditorState:EditorState = {
    tracks: [
        {
          id: 1,
          text: "Step 1",
          width: 100,
          layerIndex: 1,
        },
        {
          id: 2,
          text: "Step 2",
          width: 100,
          layerIndex: 2,
        },
        {
          id: 3,
          text: "Step 3",
          width: 100,
          layerIndex: 3,
        },
        {
          id: 4,
          text: "Step 4",
          width: 100,
          layerIndex: 4,
        },
        {
          id: 5,
          text: "Step 5",
          width: 100,
          layerIndex: 5,
        },
      ],
    phrases:[
        { id:1, layerId: 1, phrase: "hello", startTime: 0 },
        {id:2, layerId: 2, phrase: "world", startTime: 100 },
        {id:3, layerId: 1, phrase:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", startTime: 200 },
        {id:4, layerId: 2, phrase: "Hello world!", startTime: 300 },
        {id:5, layerId: 3, phrase: "THE", startTime: 400 },
        {id:6, layerId: 4, phrase: "LAZY", startTime: 500 },
        {id:7, layerId: 5, phrase: "DOG", startTime: 600 },
    
      ],
  };