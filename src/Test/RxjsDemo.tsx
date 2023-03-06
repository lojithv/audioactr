import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import { RxjsDemoStore } from "./RxjsDemoStore"

export function RxjsDemo() {
  const text = RxjsDemoStore.useText()
  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="Type something..."
        onChange={(e) => RxjsDemoStore.setText(e.target.value)}
      />
      <br />
      Echo: {text}
    </div>
  )
}