import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Group, Line } from "react-konva";
import FormDialog from "./dialogForm/DialogForm";

interface Step {
  id: number;
  text: string;
}

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
  const [sequenceData, setSequenceData] = useState<Step[]>([
    { id: 1, text: "Step 1" },
    { id: 2, text: "Step 2" },
    { id: 3, text: "Step 3" },
    { id: 4, text: "Step 4" },
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

  return (
    <>
      <FormDialog ref={childRef} handleValueChange={handleStepDataChange} />

      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {sequenceData.map((step) => (
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
                <Rect
                  x={10 + 101}
                  y={step.id * 50}
                  width={120}
                  height={40}
                  fill="#BDBDBD"
                  draggable
                  dragBoundFunc={(pos) => {
                    return {
                      x: pos.x,
                      y: step.id * 50,
                    };
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

export default SequenceEditor;
