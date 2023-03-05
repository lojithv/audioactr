import React from "react";
import { EditorState } from "../interfaces/EditorState";

export const initialEditorState:EditorState = {
    layers: [
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
        { layerId: 1, phrase: "hello", startTime: 0 },
        { layerId: 2, phrase: "world", startTime: 100 },
        { layerId: 1, phrase: "JUMPS", startTime: 200 },
        { layerId: 2, phrase: "OVER", startTime: 300 },
        { layerId: 3, phrase: "THE", startTime: 400 },
        { layerId: 4, phrase: "LAZY", startTime: 500 },
        { layerId: 5, phrase: "DOG", startTime: 600 },
    
      ],
  };