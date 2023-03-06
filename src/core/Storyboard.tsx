import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Group, Transformer } from "react-konva";
import TrackConfigPanel from "../components/TrackConfigPanel/TrackConfigPanel";

import { PlayerStore } from "../store/PlayerStore";
import { EditorStore, setWindowDimensions, useWindowDimensions } from "../store/EditorStore";
import { EditorHelper } from "../helpers/editor";
import Track from "./components/Track";

interface CanShowAlert {
  getAlert(id: any): void;
}

const Storyboard = () => {
  const stageRef = useRef(null);
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

  const [selectedId, selectShape] = React.useState("");

  return (
    <>
      <TrackConfigPanel />

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
              // openSublayerEditor={openSublayerEditor}
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
