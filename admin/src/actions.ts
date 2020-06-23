export const FILTER_CHANGED = "filterChanged"

export function changeFilter(filterName: string, newValue: number | boolean | string | string[]) {
    return {
        type: FILTER_CHANGED,
        payload: {
            filterName,
            newValue
        }
    }
}