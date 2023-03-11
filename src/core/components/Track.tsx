import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import React, { useState } from 'react'
import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { roundnum } from '../../helpers/editor';
import { EditorStore, useWindowDimensions } from '../../store/EditorStore';
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Phrase from './Phrase';
import { handleStepClick } from '../../handlers/storyboard';

const Track = ({
  step,
  i,
}: any) => {
  const layerRef: React.LegacyRef<any> = React.useRef();
  const subLayerGroup: any = React.useRef();

  const editorState = EditorStore.useEditorState()

  const windowDimensions = useWindowDimensions()

  return (
    <Group
      key={"step_" + step?.id?.toString()}
      ref={layerRef}
    >
      <Group x={10} y={i * 50}>
        <Rect width={100} height={40} fill="#4B4B4B" />
        <Html
          divProps={{
            style: {
              position: "absolute",
              paddingTop: 20,
              height: "40px",
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <DragIndicatorIcon />
        </Html>
        <Text
          text={step.text}
          fontSize={20}
          x={35}
          y={10}
          fill="white"
          onClick={() => handleStepClick(step)}
        />
      </Group>

      <Group ref={subLayerGroup} id={"sub_layer_group" + step.id}>
        <Rect
          x={10 + 101}
          y={i * 50}
          width={windowDimensions.width - 120}
          height={40}
          fill="#4B4B4B"
        />
        {Array(Math.round((parseInt(windowDimensions.width) - 120)/100)+1).fill(0).map((l: any,j:number) => (
         <Phrase
            id={j}
            trackIndex={i}
            phraseIndex={j}
            key={j}
            layerData={{phrase:'',id:j}}
          />
        ))}
      </Group>
    </Group>
  );
};

export default Track