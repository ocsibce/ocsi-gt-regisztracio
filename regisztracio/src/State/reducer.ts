import { InitialState, Action } from '../utils/types';
import { Reducer } from 'redux';
import { initialState } from '..';
import { PREVIEW_CHANGED, TIME_CHANGED, RESULT_CHANGED, DATA_FROM_API, REQUEST_SENT, CHANGE_LANGUAGE } from './actions';

const reducer: Reducer<InitialState, any> = (
    state: InitialState | undefined = initialState,
    action: Action) => {
    switch (action.type) {
        case DATA_FROM_API:
            const {startTime, endTime, time, details, detailsEn, szakok, szakokEn} = action.payload;
            return {
                ...state,
                loading: false,
                startTime,
                endTime,
                time,
                details,
                detailsEn,
                szakok,
                szakokEn,
            }
        case PREVIEW_CHANGED:
            return {
                ...state,
                preview: action.payload
            }
        case TIME_CHANGED:
            return {
                ...state,
                time: action.payload
            }
        case RESULT_CHANGED:
            return {
                ...state,
                result: action.payload,
                loading: false
            }
        case REQUEST_SENT:
            return {
                ...state,
                loading: true
            };
        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    }
}

export default reducer;