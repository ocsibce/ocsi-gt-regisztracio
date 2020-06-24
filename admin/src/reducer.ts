import { InitialState } from './utils/types';
import { Reducer } from 'redux';
import { initialState } from './index';

import { FILTER_CHANGED } from './actions';


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
                case "penter":
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
            return {...state, filters};

        default:
            return state;
    }
}

export default reducer;