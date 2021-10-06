import { createReducer } from "jeddy/jredux";

const _reducer = createReducer({
    name: 'RGroup',
    initialState: {
        selectedMembers: [],
        searchKeyword: "",
        showSearchMember: false,
        groups: []
    },
    reducers: {
        addNewMember: (state, action) => {
            let _selectedMembers = [...state.selectedMembers]
            const isNewMember = _selectedMembers.filter(a => a.uid == action.payload.uid).length == 0
            if (isNewMember) {
                _selectedMembers.push(action.payload)
            } else {
                _selectedMembers = _selectedMembers.filter(a => a.uid != action.payload.uid)
            }
            return { ...state, selectedMembers: _selectedMembers }
        },
        setSearchKeyword: (state, action) => {
            return { ...state, searchKeyword: action.payload }
        },
        toggleSearchMember: (state) => {
            return { ...state, showSearchMember: !state.showSearchMember }
        },
        setUserGroups: (state, action) => {
            return { ...state, groups: action.payload }
        },
        updateGroupLastMessage: (state, action) => {
            const { chatId, lastChat } = action.payload
            let _groups = [...state.groups].map(g => {
                if (g.id === chatId) {
                    return { ...g, lastChat }
                }
                return g
            })
            return { ...state, groups: _groups }
        },
        updateGroupUnSeenMessages: (state, action) => {
            const { chatId, newMessages } = action.payload
            let _groups = [...state.groups].map(g => {
                if (g.id === chatId) {
                    return { ...g, newMessages }
                }
                return g
            })
            return { ...state, groups: _groups }
        }
    }
})

export const { reducer, actions } = _reducer;

