import { GolyaAdat, SettingsData } from "../utils/types";

export const FILTER_CHANGED = "filterChanged";
export const GOLYA_REQUEST = "golyaRequest";
export const SETTINGS_SAVE = "settingsSaved";
export const SETTINGS_RESPONSE = "settingsResponse";
export const EDITING_SETTINGS = "editingSetting";

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

export function settingsSave() {
    return {
        type: SETTINGS_SAVE,
        payload: null
    };
}

export function settingsResponse(settings: SettingsData[]) {
    return {
        type: SETTINGS_RESPONSE,
        payload: settings
    };
}

export function editingSetting(setting: SettingsData | null) {
    return {
        type: EDITING_SETTINGS,
        payload: setting
    }
}