import React from 'react'

type Props = {
  space?:number
}

const Spacing = (props: Props) => {
  return (
    <div style={{margin:props.space? props.space : 30}}></div>
  )
}

export default Spacing
