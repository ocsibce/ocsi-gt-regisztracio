import { GolyaAdat } from "../utils/types";

export const FILTER_CHANGED = "filterChanged";
export const GOLYA_REQUEST = "golyaRequest";

export function changeFilter(filterName: string, newValue: number | boolean | string | string[]) {
    return {
        type: FILTER_CHANGED,
        payload: {
            filterName,
            newValue
        }
    }
}

export function golyaRequest(golyak: GolyaAdat[]) {
    return {
        type: GOLYA_REQUEST,
        payload: golyak
    }
}