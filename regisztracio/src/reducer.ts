import { InitialState, Action } from './utils/types';
import { Reducer } from 'redux';
import { initialState } from '.';
import { PREVIEW_CHANGED, TIME_CHANGED } from './actions';

const reducer: Reducer<InitialState, any> = (
    state: InitialState | undefined = initialState,
    action: Action) => {
    switch (action.type) {
        case PREVIEW_CHANGED:
            return {
                ...state,
                preview: !state.preview
            }
        case TIME_CHANGED:
            return {
                ...state,
                time: action.payload
            }

        default:
            return state;
    }
}

export default reducer;