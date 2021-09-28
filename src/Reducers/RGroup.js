import { createReducer } from "jeddy/jredux";

const _reducer = createReducer({
    name: 'RGroup',
    initialState: {
        selectedMembers: [],
    },
    reducers: {
        addNewMember: (state, action) => {
            let _selectedMembers = [...state.selectedMembers]
            // const isNewMember = _selectedMembers.filter(a => a.uid == action.payload.uid).length == 0
            // if (isNewMember) {
            //     _selectedMembers.push(action.payload)
            // } else {
            //     _selectedMembers = _selectedMembers.filter(a => a.uid != action.payload.uid)
            // }
            _selectedMembers.push(action.payload)
            return { ...state, selectedMembers: _selectedMembers }
        },

    }
})

export const { reducer, actions } = _reducer;

