import { createReducer } from "jeddy/jredux";

const _reducer = createReducer({
    name: 'RGallary',
    initialState: {
        selectedMessage: {},
    },
    reducers: {
        setSelectedMessage: (state, action) => {
            return { ...state, selectedMessage: action.payload }
        },
    }
})

export const { reducer, actions } = _reducer;

