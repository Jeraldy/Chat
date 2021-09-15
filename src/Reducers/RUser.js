import { createReducer } from "jeddy/jredux";

const _reducer = createReducer({
    name: 'RUser',
    initialState: {
        user: null,
        displayName: ""
    },
    reducers: {
        setUserInfo: (state, action) => {
            return { ...state, user: action.payload }
        },
        handleDisplayName: (state, action) => {
            return { ...state, displayName: action.payload }
        },
        updateDisplayName: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    displayName: action.payload
                }
            }
        },
    }
})

export const { reducer, actions } = _reducer;

