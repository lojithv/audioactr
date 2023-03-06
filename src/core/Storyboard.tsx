import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Group, Transformer } from "react-konva";
import FormDialog from "../components/dialogForm/DialogForm";

import { Html } from "react-konva-utils";
import SubLayerForm from "../components/subLayerForm/SubLayerForm";
import { PlayerStore } from "../store/PlayerStore";
import { EditorStore, setWindowDimensions, useWindowDimensions } from "../store/EditorStore";
import { EditorHelper } from "../helpers/editor";
import Track from "./components/Track";


interface CanShowAlert {
  getAlert(id: any): void;
}

const Storyboard = () => {
  const stageRef = useRef(null);
  const childRef = useRef<CanShowAlert>();
  const subLayerEditorRef = useRef<CanShowAlert>();

  const timer = PlayerStore.useTimer()

  const editorState = EditorStore.useEditorState()

  const layerData = editorState.layers;

  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(EditorHelper.getWindowDimensions())
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
    // setLayerData(newSequenceData);
    EditorStore.setEditorState({...editorState,layers:newSequenceData})
  };

  const [selectedId, selectShape] = React.useState("");

  const handleSequnceLayerDrag = (id: any, newIndex: any) => {
    const newSequenceData = [...layerData];
    const index = newSequenceData.findIndex((step) => step.id === id);
    newSequenceData[index].layerIndex = newIndex;
    // setLayerData(newSequenceData);
    EditorStore.setEditorState({...editorState,layers:newSequenceData})
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
            <Track
              key={i}
              step={step}
              i={i + 1}
              selectedId={selectedId}
              selectShape={selectShape}
              layerData={layerData}
              handleStepClick={handleStepClick}
              openSublayerEditor={openSublayerEditor}
              textLayers={editorState.phrases.filter((l: any) => l.layerId === step.id)}
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

export default Storyboard;
