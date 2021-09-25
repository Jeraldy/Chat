import { createReducer } from "jeddy/jredux";
import { genChatId } from "../Utils/index";

const _reducer = createReducer({
    name: 'RUser',
    initialState: {
        user: null,
        contacts: [],
        displayName: "",
        searchedContact: {},
        contactSearchStatus: "",
        openSearchContactForm: false
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
        setUserContacts: (state, action) => {
            return { ...state, contacts: action.payload }
        },
        updateContactUnSeenMessages: (state, action) => {
            const { uid, chatId, newMessages } = action.payload
            let _contacts = [...state.contacts].map(c => {
                if (genChatId(c.uid, uid) === chatId) {
                    return { ...c, newMessages }
                }
                return c
            })
            return { ...state, contacts: _contacts }
        },
        updateContactLastMessage: (state, action) => {
            const { uid, chatId, lastChat } = action.payload
            let _contacts = [...state.contacts].map(c => {
                if (genChatId(c.uid, uid) === chatId) {
                    return { ...c, lastChat }
                }
                return c
            })
            return { ...state, contacts: _contacts }
        },
        setSearchedContact: (state, action) => {
            return { ...state, searchedContact: action.payload }
        },
        searchContactStatus: (state, action) => {
            return { ...state, contactSearchStatus: action.payload }
        },
        toggleSearchContactForm: (state) => {
            return {
                ...state, openSearchContactForm: !state.openSearchContactForm
            }
        }
    }
})

export const { reducer, actions } = _reducer;

