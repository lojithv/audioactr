import React from 'react'
import { Group, Rect, Text, Transformer } from 'react-konva';
import { roundnum } from '../../helpers/editor';

type Props = {}

const Phrase = ({
  id,
  i,
  shapeProps,
  layerData
}: any) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const grpRef:any = React.useRef();

  return (
    <Group
      x={10 + 101 + layerData.startTime}
      y={i * 50}
      draggable
      ref={grpRef}
      dragBoundFunc={(pos) => {
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
      <Text text={layerData.phrase} fontSize={20} fill="black" />
    </Group>
  );
};

export default Phrase