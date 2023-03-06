import React from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { roundnum } from "../../helpers/editor";

type Props = {};

const Phrase = ({ id, i, shapeProps, layerData }: any) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const grpRef: any = React.useRef();

  return (
    <Group
      x={10 + 101 + layerData.startTime}
      y={i * 50}
      draggable
      width={120}
      height={40}
      ref={grpRef}
      dragBoundFunc={(pos) => {
        console.log("dragging");
        return {
          x: pos.x >= 111 ? pos.x : 111,
          y: i * 50,
        };
      }}
    >
      <Rect
        id={"sub_layer_" + id}
        width={120}
        height={40}
        fill="#BDBDBD"
        ref={shapeRef}
      />
      {layerData.phrase.toString().length > 30 ? (
        <Text
          text={`${layerData.phrase.substring(0, 50)}...`}
          width={120}
          // wrap={"char"}
          fontSize={13}
          fill="black"
        />
      ) : (
        <Text
          text={`${layerData.phrase}`}
          width={120}
          wrap={"char"}
          fontSize={13}
          fill="black"
        />
      )}
    </Group>
  );
};

export default Phrase;
