import { Time, Action } from "./utils/types";

export const PREVIEW_CHANGED = "preview_changed";
export const TIME_CHANGED = "time_changed";

export function previewChanged(): Action {
    return {
        type: PREVIEW_CHANGED,
        payload: null
    }
}

export function timeChanged(newTime: Time): Action {
    console.log(newTime);
    return {
        type: TIME_CHANGED,
        payload: newTime
    }
}