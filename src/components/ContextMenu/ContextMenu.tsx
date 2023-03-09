import * as React from "react";
import {
  useContextMenuState,
} from "../../store/EditorStore";
import { ContextMenu } from "./styles";

export default function ConetxtMenu() {

  const contextMenu = useContextMenuState()

  return (
    <div>
      {contextMenu.open && (
        <ContextMenu top={contextMenu.event?.evt.pageY} left={contextMenu.event?.evt.pageX}>
          <ul>
            <li>Edit</li>
            <li>Copy</li>
            <li>Delete</li>
          </ul>
        </ContextMenu>
      )}
    </div>
  );
}
