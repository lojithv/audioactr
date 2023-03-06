import React from 'react'
import { Group, Rect, Text, Transformer } from 'react-konva';
import { roundnum } from '../../helpers/editor';

type Props = {}

const Phrase = ({
  id,
  i,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  setDraggingSubLayer,
  openSublayerEditor,
  layerData
}: any) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  const grpRef:any = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // const handleGroupChange = () => {
  //   console.log(mouseOverSequenceLayer);
  //   if (mouseOverSequenceLayer) {
  //     shapeRef.current.moveTo(mouseOverSequenceLayer.current);
  //   }
  // };

  return (
    <Group
      x={10 + 101 + layerData.startTime}
      y={i * 50}
      draggable
      ref={grpRef}
      dragBoundFunc={(pos) => {
        return {
          x: pos.x >= 111 ? pos.x : 111,
          y: roundnum(pos.y),
        };
      }}
      onDragStart={() => {
        setDraggingSubLayer(grpRef);
      }}
      onDragEnd={(e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    >
      <Rect
        id={"sub_layer_" + id}
        width={120}
        height={40}
        fill="#BDBDBD"
        onClick={onSelect}
        onDblClick={openSublayerEditor}
        onTap={onSelect}
        ref={shapeRef}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      <Text text={layerData.phrase} fontSize={20} fill="black" />
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorStroke="transparent"
          anchorFill="transparent"
          borderStroke="transparent"
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Group>
  );
};

export default Phrase