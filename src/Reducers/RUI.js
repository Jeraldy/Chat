import { createReducer } from "jeddy/jredux";
import { PAGE } from "../Services/constants";

const _reducer = createReducer({
    name: 'RUI',
    initialState: {
        showActionMenu: false,
        activePage: PAGE.HOME,
    },
    reducers: {
        toggleActionMenu: (state) => {
            return {
                ...state, showActionMenu: !state.showActionMenu
            }
        },
        setActivePage: (state, action) => {
            return {
                ...state, activePage: action.payload
            }
        },

    }
})

export const { reducer, actions } = _reducer;

