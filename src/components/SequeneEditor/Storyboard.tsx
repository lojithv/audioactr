import React from 'react'
import { Layer, Stage } from 'react-konva'
import { PlayerStore } from '../../store/PlayerStore'

type Props = {}

const Storyboard = (props: Props) => {

  const timer = PlayerStore.usePlayerState()
  
  return (
    <Stage>
      <Layer>

      </Layer>
    </Stage>
  )
}

export default Storyboard