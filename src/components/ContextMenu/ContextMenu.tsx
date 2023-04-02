import * as React from "react";
import {
  setContextMenuState,
  useContextMenuState,
} from "../../store/EditorStore";
import { ContextMenu } from "./styles";

export default function ConetxtMenu() {

  const contextMenu = useContextMenuState()

  const handleOptionClick = (action:string) => {
    switch (action){
      case 'delete':
        console.log("delete")
      break;
      case 'copy':
        console.log("copy")
      break;
      case 'edit':
        console.log("edit")
      break;
    }
    setContextMenuState({open:false,event:null})
  }

  return (
    <div>
      {contextMenu.open && (
        <ContextMenu top={contextMenu.event?.evt.pageY} left={contextMenu.event?.evt.pageX}>
          <ul>
            <li onClick={()=>handleOptionClick('edit')}>Edit</li>
            <li onClick={()=>handleOptionClick('copy')}>Copy</li>
            <li onClick={()=>handleOptionClick('delete')}>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
  );
}
