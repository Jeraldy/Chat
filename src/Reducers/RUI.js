import { createReducer } from "jeddy/jredux";
import { GALLARY_TAB, PAGE } from "../Services/constants";

const _reducer = createReducer({
    name: 'RUI',
    initialState: {
        showActionMenu: false,
        showChatActionMenu: false,
        activePage: PAGE.HOME,
        activeGallaryTab: GALLARY_TAB.IMAGES
    },
    reducers: {
        toggleActionMenu: (state) => {
            return {
                ...state, showActionMenu: !state.showActionMenu
            }
        },
        toggleChatActionMenu: (state) => {
            return {
                ...state, showChatActionMenu: !state.showChatActionMenu
            }
        },
        setActivePage: (state, action) => {
            return {
                ...state, activePage: action.payload
            }
        },
        setActiveGallaryTab: (state, action) => {
            return { ...state, activeGallaryTab: action.payload }
        }
    }
})

export const { reducer, actions } = _reducer;

