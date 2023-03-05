import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";

// A signal is an entry point to react-rxjs. It's equivalent to using a subject
const [textChange$, setText] = createSignal<any>();

const [useText, text$] = bind<any>(textChange$, "");

export const RxjsDemoStore = {setText,useText,textChange$};
