import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { roundnum } from "../../helpers/editor";
import { setContextMenuState, setSelectedPhrase, useSelectedPhrase } from "../../store/EditorStore";

type Props = {};

const Phrase = ({ id, i, shapeProps, layerData }: any) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const grpRef: any = React.useRef();

  const selectedPhrase = useSelectedPhrase()

  const handleClick = (e:KonvaEventObject<MouseEvent>) => {
    if(e.evt.button == 2){
      setContextMenuState({open:true,event:e})
    }
    setSelectedPhrase(layerData)
  }

  return (
    <Group
      x={10 + 101 + layerData.startTime}
      y={i * 50}
      draggable
      width={100}
      height={40}
      ref={grpRef}
      onClick={(e)=>handleClick(e)}
      dragBoundFunc={(pos) => {
        return {
          x: pos.x >= 111 ? pos.x : 111,
          y: i * 50,
        };
      }}
    >
      <Rect
        id={"sub_layer_" + id}
        width={100}
        height={40}
        fill={layerData.id === selectedPhrase?.id ? "#4287f5" : "#BDBDBD"} 
        ref={shapeRef}
      />
      {layerData.phrase.toString().length > 30 ? (
        <Text
          text={`${layerData.phrase.substring(0, 50)}...`}
          width={100}
          // wrap={"char"}
          fontSize={13}
          fill="black"
        />
      ) : (
        <Text
          text={`${layerData.phrase}`}
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
