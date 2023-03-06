import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { map, scan } from "rxjs";
import { initialPlayerState } from "../dump/player";
import { PlayerState } from "../interfaces/PlayerState";

export const [playerChange$, setPlayerState] = createSignal<PlayerState>();

export const [usePlayerState, playerState$] = bind<PlayerState>(
  playerChange$,
  initialPlayerState
);

export const [timerChange$, setTimerValue] = createSignal<number>();
export const [useTimer, timerState$] = bind<number>(
  timerChange$.pipe(scan((prev, value) => (value ? prev + 1 : value), 0)),
  0
);

export const PlayerStore = {
  playerChange$,
  usePlayerState,
  setPlayerState,
  useTimer,
  setTimerValue,
  timerChange$,
  timerState$,
};
