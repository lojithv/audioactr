import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import React, { useState } from 'react'
import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { roundnum } from '../../helpers/editor';
import { useWindowDimensions } from '../../store/EditorStore';
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Phrase from './Phrase';

type Props = {}

const Track = ({
  step,
  selectedId,
  selectShape,
  i,
  layerData,
  setLayerData,
  handleStepClick,
  openSublayerEditor,
  textLayers,
}: any) => {
  const layerRef: React.LegacyRef<any> = React.useRef();
  const subLayerGroup: any = React.useRef();

  const [draggingSubLayer, setDraggingSubLayer] = useState<any>();

  const [oldIndex, setOldIndex] = useState(i);

  const windowDimensions = useWindowDimensions()

  const onDragStart = (event: KonvaEventObject<DragEvent>, index: number) => {
    event.target.setAttr("opacity", 0.5);
    setOldIndex(index);
    layerRef.current.moveToTop();
    // event.evt.dataTransfer?.setData('text/plain', index.toString())
    // event.dataTransfer.setData('text/plain', index);
  };

  const onDragOver = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const onDrop = (event: KonvaEventObject<DragEvent>) => {
    event.target.setAttr("opacity", 1);
    const draggedIndex =
      oldIndex + (layerRef.current.attrs.y ? layerRef.current.attrs.y / 50 : 0);
    console.log(oldIndex);
    console.log(draggedIndex);
    if(oldIndex !== draggedIndex){
      if(oldIndex < draggedIndex){
        const newItems = [...layerData];
        const [draggedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(parseInt(draggedIndex), 0, draggedItem);
        console.log(newItems);
        setLayerData(newItems);
      }
    }
  };

  var _el: any;

function dragOver(e: { target: { parentNode: { insertBefore: (arg0: any, arg1: any) => void; }; nextSibling: any; }; }) {
  if (isBefore(_el, e.target))
    e.target.parentNode.insertBefore(_el, e.target);
  else
    e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e: KonvaEventObject<DragEvent>) {
  // e.dataTransfer.effectAllowed = "move";
  // e.dataTransfer.setData("text/plain", null); // Thanks to bqlou for their comment.
  _el = e.target;
}

function isBefore(el1: { parentNode: any; previousSibling: any; }, el2: { parentNode: any; }) {
  if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
      if (cur === el2)
        return true;
  return false;
}

  const handleDrag = (e: Vector2d) => {
    const { y } = e;

    const newY = roundnum(y);

    return { x: 0, y: newY };
  };

  return (
    <Group
      draggable
      key={"step_" + step?.id?.toString()}
      ref={layerRef}
      onDragStart={(event) => {
        dragStart(event)
      }}
      onDragOver={dragOver}
      // onDragEnd={(e) => onDrop(e)}
      dragBoundFunc={(pos) => handleDrag(pos)}
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
          onClick={() => handleStepClick(step.id)}
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
        {textLayers.map((l: any,j:number) => (
          <Phrase
            id={step.id}
            i={i}
            key={j}
            layerData={l}
            shapeProps={step}
            isSelected={step?.id?.toString() === selectedId}
            onSelect={() => {
              selectShape(step?.id.toString());
            }}
            onChange={(newAttrs: { width: number; id: string }) => {
              const rects = layerData.slice();
              rects[i] = newAttrs;
              setLayerData(rects);
            }}
            setDraggingSubLayer={setDraggingSubLayer}
            openSublayerEditor={openSublayerEditor}
          />
        ))}
      </Group>
    </Group>
  );
};

export default Track