import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Group,
  Line,
  Transformer,
} from "react-konva";
import FormDialog from "./dialogForm/DialogForm";

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
}

const SequenceEditor = (props: Props) => {
  const stageRef = useRef(null);
  const childRef = useRef<CanShowAlert>();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [sequenceData, setSequenceData] = useState<any[]>([
    {
      id: 1,
      text: "Step 1",
      width: 100,
    },
    {
      id: 2,
      text: "Step 2",
      width: 100,
    },
    {
      id: 3,
      text: "Step 3",
      width: 100,
    },
    {
      id: 4,
      text: "Step 4",
      width: 100,
    },
  ]);

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

  const handleStepDataChange = (id: any, newData: any) => {
    const newSequenceData = [...sequenceData];
    const index = newSequenceData.findIndex((step) => step.id === id);
    newSequenceData[index].text = newData ? newData : "";
    setSequenceData(newSequenceData);
  };

  const [selectedId, selectShape] = React.useState("");

  const checkDeselect = (e: { target: { getStage: () => any } }) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape("");
    }
  };

  return (
    <>
      <FormDialog ref={childRef} handleValueChange={handleStepDataChange} />

      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {sequenceData.map((step, i) => (
            <Group
              draggable
              key={"step_" + step.id}
              dragBoundFunc={(pos) => {
                return {
                  x: 0,
                  y: pos.y,
                };
              }}
            >
              <Rect
                x={10}
                y={step.id * 50}
                width={100}
                height={40}
                fill="#4B4B4B"
              />
              <Group>
                <Rect
                  x={10 + 101}
                  y={step.id * 50}
                  width={windowDimensions.width - 120}
                  height={40}
                  fill="#4B4B4B"
                />
                <SubLayer
                  id={step.id}
                  shapeProps={step}
                  isSelected={step.id.toString() === selectedId}
                  onSelect={() => {
                    selectShape(step.id.toString());
                  }}
                  onChange={(newAttrs: { width: number; id: string }) => {
                    const rects = sequenceData.slice();
                    rects[i] = newAttrs;
                    setSequenceData(rects);
                  }}
                />
              </Group>
              <Text
                x={35}
                y={step.id * 50 + 20}
                text={step.text}
                fontSize={20}
                fill="white"
                onClick={() => handleStepClick(step.id)}
              />
            </Group>
          ))}
          <Rect
            x={111 + props.timer}
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

const SubLayer = ({ id, shapeProps, isSelected, onSelect, onChange }: any) => {
  const shapeRef: any = React.useRef();
  const trRef: any = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        x={10 + 101}
        y={id * 50}
        width={120}
        height={40}
        fill="#BDBDBD"
        draggable
        dragBoundFunc={(pos) => {
          return {
            x: pos.x,
            y: id * 50,
          };
        }}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
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
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorStroke="transparent"
          anchorFill= 'transparent'
          borderStroke='transparent'
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default SequenceEditor;
