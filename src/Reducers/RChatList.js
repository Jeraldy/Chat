import { createReducer } from "jeddy/jredux";

const USERS = [
    { userName: "jchacha", fullName: "James Chacha", image: "https://bit.ly/3C80ydw", token: "123" },
    { userName: "ayoma", fullName: "Mariah Ayoma", image: "", token: "456" },
]

const MESSAGES = [
    {
        content: "Hello",
        messageType: "text",
        sentAt: "20/12/21",
        sentBy: "jchacha",
        messageId: "1"
    },
    {
        content: "Hello",
        messageType: "text",
        sentAt: "20/12/21",
        sentBy: "jchacha",
        messageId: "2"
    },
    {
        content: "Hello",
        messageType: "text",
        sentAt: "20/12/21",
        sentBy: "jchacha",
        messageId: "3"
    }, {
        content: "Hello",
        messageType: "text",
        sentAt: "20/12/21",
        sentBy: "jchacha",
        messageId: "4"
    },
    {
        content: "https://bit.ly/3C80ydw",
        messageType: "image",
        sentAt: "20/12/21",
        sentBy: "ayoma",
        messageId: "5",
        extraContent: "Thats me!",
        repliedMessage: {
            content: "Hello",
            messageType: "text",
            sentAt: "20/12/21",
            sentBy: "jchacha",
            messageId: "4"
        }
    }
]

const RChatList = createReducer({
    name: 'RChatList',
    initialState: {
        selectedFriend: null,
        friends: USERS,
        messages: MESSAGES,
        repliedMessage: null,
        selectedMessages: [],
        showActionBar: false
    },
    reducers: {
        setSelectedFriend: (state, action) => {
            return { ...state, selectedFriend: action.payload, }
        },
        handleTextMessage: (state, action) => {
            return { ...state, textMessage: action.payload, }
        },
        handleRepliedMessage: (state, action) => {
            return { ...state, repliedMessage: action.payload }
        },
        handleSelectedMessage: (state, action) => {
            let selectedMessages = [...state.selectedMessages]
            if (!selectedMessages.includes(action.payload)) {
                selectedMessages.push(action.payload)
            } else {
                selectedMessages = selectedMessages.filter(a => a != action.payload)
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
        }
    }
})

export const { reducer, actions } = RChatList;

