import { InitialState } from './utils/types';
import { Reducer } from 'redux';
import { initialState } from '.';
import { PREVIEW_CHANGED } from './actions';

const reducer: Reducer<InitialState, any> = (
    state: InitialState | undefined = initialState,
    action: {type: string, payload: any}) => {
    switch (action.type) {
        case PREVIEW_CHANGED:
            return {
                ...state,
                preview: !state.preview
            }

        default:
            return state;
    }
}

export default reducer;