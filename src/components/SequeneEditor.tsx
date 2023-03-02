import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Group, Transformer } from "react-konva";
import FormDialog from "./dialogForm/DialogForm";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Html } from "react-konva-utils";
import SubLayerForm from "./subLayerForm/SubLayerForm";

// interface Step {
//   id: number;
//   text: string;
// }

interface CanShowAlert {
  getAlert(id: any): void;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

interface Props {
  timer: number;
  textLayers: any;
  setTextLayers: any;
  layerData: any;
  setLayerData: any;
}

const SequenceEditor = ({
  timer,
  layerData,
  setLayerData,
  textLayers,
  setTextLayers,
}: Props) => {
  const stageRef = useRef(null);
  const childRef = useRef<CanShowAlert>();
  const subLayerEditorRef = useRef<CanShowAlert>();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStepClick = (id: number) => {
    childRef?.current?.getAlert(id);
    // const newData = prompt("Enter new text:", newSequenceData[index].text);
  };

  const openSublayerEditor = (id: any) => {
    subLayerEditorRef?.current?.getAlert(id);
  };

  const handleStepDataChange = (id: any, newData: any) => {
    const newSequenceData = [...layerData];
    const index = newSequenceData.findIndex((step) => step.id === id);
    newSequenceData[index].text = newData ? newData : "";
    setLayerData(newSequenceData);
  };

  const [selectedId, selectShape] = React.useState("");

  const handleSequnceLayerDrag = (id: any, newIndex: any) => {
    const newSequenceData = [...layerData];
    const index = newSequenceData.findIndex((step) => step.id === id);
    newSequenceData[index].layerIndex = newIndex;
    setLayerData(newSequenceData);
  };

  const handleSublayerPropsChange = () => {};

  return (
    <>
      <FormDialog ref={childRef} handleValueChange={handleStepDataChange} />
      <SubLayerForm
        ref={subLayerEditorRef}
        handleValueChange={handleSublayerPropsChange}
      />

      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {layerData.map((step: any, i: any) => (
            <SequenceLayer
              key={i}
              step={step}
              i={i + 1}
              windowDimensions={windowDimensions}
              selectedId={selectedId}
              selectShape={selectShape}
              layerData={layerData}
              setLayerData={setLayerData}
              handleStepClick={handleStepClick}
              handleSequnceLayerDrag={handleSequnceLayerDrag}
              openSublayerEditor={openSublayerEditor}
              textLayers={textLayers.filter((l: any) => l.layerId === step.id)}
            />
          ))}
        </Layer>
        <Layer>
          <Rect
            x={111 + timer}
            y={50}
            height={windowDimensions.height - 50}
            width={2}
            fill="#00D1B2"
            draggable
            hitStrokeWidth={5}
            dragBoundFunc={(pos) => {
              return {
                x: pos.x,
                y: 50,
              };
            }}
          />
        </Layer>
      </Stage>
    </>
  );
};

const roundnum = (num: number) => {
  const index = Math.round(num / 50);
  return index * 50;
};

const SequenceLayer = ({
  step,
  windowDimensions,
  selectedId,
  selectShape,
  i,
  layerData,
  setLayerData,
  handleStepClick,
  handleSequnceLayerDrag,
  openSublayerEditor,
  textLayers,
}: any) => {
  const layerRef: React.LegacyRef<any> = React.useRef();
  const subLayerGroup: any = React.useRef();

  const [draggingSubLayer, setDraggingSubLayer] = useState<any>();

  const [oldIndex, setOldIndex] = useState(i);

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
    const newItems = [...layerData];
    const [draggedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(parseInt(draggedIndex), 0, draggedItem);
    console.log(newItems);
    setLayerData(newItems);
  };

  const handleDrag = (e: Vector2d) => {
    const { y } = e;

    const newY = roundnum(y);

    return { x: 0, y: newY };
  };

  return (
    <Group
      draggable
      key={"step_" + step.id.toString()}
      ref={layerRef}
      onDragStart={(event) => {
        onDragStart(event, i);
      }}
      onDragOver={onDragOver}
      onDragEnd={(e) => onDrop(e)}
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
          <SubLayer
            id={step.id}
            i={i}
            key={j}
            layerData={l}
            shapeProps={step}
            isSelected={step.id.toString() === selectedId}
            onSelect={() => {
              selectShape(step.id.toString());
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

const SubLayer = ({
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

export default SequenceEditor;
