import { KonvaEventObject } from "konva/lib/Node";
import React, { useState } from "react";
import { Group, Rect, Text } from "react-konva";
import {
  setContextMenuState,
  setEditorState,
  setSelectedPhrase,
  useEditorState,
  useSelectedPhrase,
} from "../../store/EditorStore";

type Props = {};

const Phrase = ({ id, trackIndex, layerData, phraseIndex }: any) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const grpRef: any = React.useRef();

  const selectedPhrase = useSelectedPhrase();

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button == 2) {
      setContextMenuState({ open: true, event: e });
    } else {
      setContextMenuState({ open: false, event: null });
    }
    if (phraseData) {
      setSelectedPhrase(phraseData);
    } else {
      setSelectedPhrase(null);
    }
  };

  const editorState = useEditorState();

  const getPhrase = () => {
    return editorState.phrases.find(
      (p) => p.trackIndex === trackIndex && p.phraseIndex === phraseIndex
    );
  };

  const phraseData = getPhrase();

  const handleDbClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button == 0) {
      const existingphrase = editorState.phrases.find(
        (p) => p.phraseIndex === phraseIndex
      );
      if (!existingphrase) {
        setEditorState({
          ...editorState,
          phrases: [
            ...editorState.phrases,
            {
              trackId: trackIndex,
              trackIndex: trackIndex,
              phraseIndex: phraseIndex,
              phrase: "add phrase",
              id: editorState.phrases.length + 1,
            },
          ],
        });
      } else {
      }
    }
  };

  const addRestriction = () => {
    const existingphrase = editorState.phrases.find(
      (p) => p.phraseIndex === phraseIndex
    );
    return existingphrase ? true : false;
  };

  return (
    <Group
      x={10 + 101 + 100 * phraseIndex}
      y={trackIndex * 50}
      // draggable
      width={100}
      height={40}
      ref={grpRef}
      onClick={(e) => handleClick(e)}
      onDblClick={(e) => handleDbClick(e)}
      dragBoundFunc={(pos) => {
        return {
          x: pos.x >= 111 ? pos.x : 111,
          y: trackIndex * 50,
        };
      }}
    >
      <Rect
        id={"sub_layer_" + id}
        width={100}
        height={40}
        fill={
          phraseData?.id === selectedPhrase?.id &&
          selectedPhrase?.trackIndex === trackIndex
            ? "#4287f5"
            : addRestriction() && !phraseData
            ? "#ba7c77"
            : "#BDBDBD"
        }
        opacity={phraseData ? 0.8 : 0.2}
        stroke={"white"}
        strokeWidth={1}
        ref={shapeRef}
      />
      {layerData.phrase.toString().length > 30 ? (
        <Text
          text={`${phraseData?.phrase.substring(0, 50)}...`}
          width={100}
          // wrap={"char"}
          fontSize={13}
          fill="black"
        />
      ) : (
        <Text
          text={`${phraseData?.phrase || ""}`}
          width={100}
          wrap={"char"}
          fontSize={13}
          fill="black"
        />
      )}
    </Group>
  );
};

export default Phrase;
