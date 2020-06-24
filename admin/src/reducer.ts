import { InitialState, GolyaAdat, Filter } from './utils/types';
import { Reducer } from 'redux';
import { initialState } from './index';

import { FILTER_CHANGED } from './actions';

const filterGolya = (golya: GolyaAdat, filters: Filter): boolean => {

    if (filters.nev !== "") {
        if (!golya.nev.toLowerCase().includes(filters.nev.toLowerCase())) {
            return false;
        }
    }
    if (filters.minId !== 0) {
        if (golya.id < filters.minId) {
            return false;
        }
    }
    if (filters.maxId !== 0) {
        if (golya.id > filters.maxId) {
            return false;
        }
    }
    if (filters.regDateKezdo !== 0) {
        if (golya.regisztralt! < filters.regDateKezdo) {
            return false;
        }
    }
    if (filters.regDateUtolso !== 0) {
        if (golya.regisztralt! > filters.regDateUtolso) {
            return false;
        }
    }
    if (filters.szak.length > 0) {
        if (filters.szak.indexOf(golya.szak) === -1) {
            return false;
        }
    }
    if (filters.nap.hetfo) {
        if (!golya.napok?.hetfo) {
            return false
        }
    }
    if (filters.nap.kedd) {
        if (!golya.napok?.kedd) {
            return false
        }
    }
    if (filters.nap.szerda) {
        if (!golya.napok?.szerda) {
            return false
        }
    }
    if (filters.nap.csutortok) {
        if (!golya.napok?.csutortok) {
            return false
        }
    }
    if (filters.nap.pentek) {
        if (!golya.napok?.pentek) {
            return false
        }
    }

    return true;
}

const reducer: Reducer<InitialState, any> = (state: InitialState | undefined = initialState, action: any) => {
    switch (action.type) {
        case FILTER_CHANGED:
            const filters = Object.assign({}, state.filters);
            const {filterName, newValue} = action.payload;
            switch (filterName) {
                case "nev":
                    filters.nev = newValue;
                    break;
                case "hetfo":
                    filters.nap.hetfo = newValue;
                    break;
                case "kedd":
                    filters.nap.kedd = newValue;
                    break;
                case "szerda":
                    filters.nap.szerda = newValue;
                    break;
                case "csutortok":
                    filters.nap.csutortok = newValue;
                    break;
                case "pentek":
                    filters.nap.pentek = newValue;
                    break;
                case "szak":
                    filters.szak = newValue;
                    break;
                case "minId":
                    filters.minId = newValue;
                    break;
                case "maxId":
                    filters.maxId = newValue;
                    break;
                case "minRegDate":
                    filters.regDateKezdo = newValue;
                    break;
                case "maxRegDate":
                    filters.regDateUtolso = newValue;
                    break;
                default:
                    break;
            }
            const filteredGolyaLista = state.golyaLista.filter((golya) => filterGolya(golya, filters));
            return {...state, filters, filteredGolyaLista};

        default:
            return state;
    }
}

export default reducer;