import React from "react";
import { EditorState } from "../interfaces/EditorState";

export const initialEditorState:EditorState = {
    tracks: [
        {
          id: 1,
          text: "Step 1",
          trackIndex: 1,
          voice:false 
        },
      ],
    phrases:[
        { id:1, trackId: 1, phrase: "Add Phrase", trackIndex:1,phraseIndex:0},
      ],
  };

  export const initialEditorStateCopy:EditorState = {
    tracks: [
        {
          id: 1,
          text: "Step 1",
          trackIndex: 1,
          voice:false 
        },
        {
          id: 2,
          text: "Step 2",
          trackIndex: 2,
          voice:false 
        },
        {
          id: 3,
          text: "Step 3",
          trackIndex: 3,
          voice:false 
        },
        {
          id: 4,
          text: "Step 4",
          trackIndex: 4,
          voice:false 
        },
        {
          id: 5,
          text: "Step 5",
          trackIndex: 5,
          voice:false 
        },
      ],
    phrases:[
        { id:1, trackId: 1, phrase: "Good morning, Doctor Rudra, how are you doing?", trackIndex:1,phraseIndex:0},
        {id:2, trackId: 2, phrase: "Good morning, Jane. I am doing well. And you?", trackIndex:2,phraseIndex:1},
        {id:3, trackId: 1, phrase: "Hello, Leila! It’s a pleasure to meet you. I’m more than happy to speak with you. Please stop by my chamber tomorrow.",trackIndex:1,phraseIndex:3 },
        {id:4, trackId: 2, phrase: "It’s a pleasure to meet you, Doctor. Thank you so much for helping us.", trackIndex:2,phraseIndex:4},
        {id:5, trackId: 3, phrase: "I’m great, thank you. This is my friend Leila. She is thinking about joining the hospital but she has a few questions about the administration there. Would you mind telling her about the administration, please?", trackIndex:3,phraseIndex:2},
        {id:6, trackId: 4, phrase: "Don’t mention it. Hopefully, I will be able to help you out in this matter.", trackIndex:4,phraseIndex:5},
      ],
  };