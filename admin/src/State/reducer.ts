import { InitialState, GolyaAdat, Filter } from '../utils/types';
import { Reducer } from 'redux';
import { initialState } from '../index';

import { FILTER_CHANGED, GOLYA_REQUEST } from './actions';

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
        if (golya.regisztracioDatuma! < filters.regDateKezdo) {
            return false;
        }
    }
    if (filters.regDateUtolso !== 0) {
        if (golya.regisztracioDatuma! > filters.regDateUtolso) {
            return false;
        }
    }
    if (filters.szak.length > 0) {
        if (filters.szak.indexOf(golya.szak) === -1) {
            return false;
        }
    }
    if (filters.hetfo) {
        if (!golya.hetfo) {
            return false
        }
    }
    if (filters.kedd) {
        if (!golya.kedd) {
            return false
        }
    }
    if (filters.szerda) {
        if (!golya.szerda) {
            return false
        }
    }
    if (filters.csutortok) {
        if (!golya.csutortok) {
            return false
        }
    }
    if (filters.pentek) {
        if (!golya.pentek) {
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
                    filters.hetfo = newValue;
                    break;
                case "kedd":
                    filters.kedd = newValue;
                    break;
                case "szerda":
                    filters.szerda = newValue;
                    break;
                case "csutortok":
                    filters.csutortok = newValue;
                    break;
                case "pentek":
                    filters.pentek = newValue;
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

        case GOLYA_REQUEST:
            return {
                ...state,
                golyaLista: action.payload,
                filteredGolyaLista: action.payload
            };
        default:
            return state;
    }
}

export default reducer;