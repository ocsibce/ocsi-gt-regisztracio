import { Time, Action, Result } from "../utils/types";

export const DATA_FROM_API = "data_from_api"
export const PREVIEW_CHANGED = "preview_changed";
export const TIME_CHANGED = "time_changed";
export const RESULT_CHANGED = "result_changed";
export const REQUEST_SENT = "request_sent";

export function dataFromApi(data: any): Action {
    return {
        type: DATA_FROM_API,
        payload: data
    }
}

export function requestSent(): Action {
    return {
        type: REQUEST_SENT,
        payload: null
    }
}

export function previewChanged(): Action {
    return {
        type: PREVIEW_CHANGED,
        payload: null
    }
}

export function timeChanged(newTime: Time): Action {
    return {
        type: TIME_CHANGED,
        payload: newTime
    }
}

export function resultChanged(newResult: Result): Action {
    return {
        type: RESULT_CHANGED,
        payload: newResult
    }
}