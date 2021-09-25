import { createReducer } from "jeddy/jredux";

const RChatList = createReducer({
    name: 'RChatList',
    initialState: {
        selectedFriend: null,
        friends: [],
        messages: [],
        repliedMessage: null,
        selectedMessages: [],
        showActionBar: false,
        fileToUpload: null,
        uploadProgress: 0,
        isUploading: "",
        textMessage: "",
        showEmoj: false,
        showScrollDown: false
    },
    reducers: {
        setSelectedFriend: (state, action) => {
            return { ...state, selectedFriend: action.payload, }
        },
        handleTextMessage: (state, action) => {
            return { ...state, textMessage: action.payload, }
        },
        handleRepliedMessage: (state, action) => {
            return { ...state, repliedMessage: action.payload, fileToUpload: null }
        },
        handleSelectedMessage: (state, action) => {
            let selectedMessages = [...state.selectedMessages]
            let message = action.payload
            if (selectedMessages.filter(m => m.id == message.id).length == 0) {
                selectedMessages.push(message)
            } else {
                selectedMessages = selectedMessages.filter(m => m.id != message.id)
            }
            return {
                ...state,
                selectedMessages,
                showActionBar: selectedMessages.length > 0
            }
        },
        toggleActionBar: (state) => {
            return {
                ...state,
                showActionBar: !state.showActionBar,
                selectedMessages: []
            }
        },
        fetchMessagesSuccess: (state, action) => {
            return { ...state, messages: action.payload }
        },
        handleFileToUpload: (state, action) => {
            return { ...state, fileToUpload: action.payload }
        },
        updateUploadProgress: (state, action) => {
            return { ...state, uploadProgress: action.payload }
        },
        updateScrollHeight: (state, action) => {
            return { ...state, showScrollDown: action.payload }
        },
        toggleUploadState: (state) => {
            return { ...state, isUploading: !state.isUploading }
        },
        toggleEmojiKeyboard: (state) => {
            return { ...state, showEmoj: !state.showEmoj }
        }
    }
})

export const { reducer, actions } = RChatList;

