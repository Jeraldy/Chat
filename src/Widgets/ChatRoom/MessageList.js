import Div from "jeddy/dom/Div"
import { connect } from "jeddy/jredux"
import ChatBubble from "./ChatBubble"

const MessageList = ({ messages, selectedFriend }) => {
    return Div({
        children: messages.map(message => ChatBubble(message, selectedFriend)),
        style: {
            position: "absolute",
            bottom: "45px",
            top: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column-reverse",
            overflowY: "scroll"
        }
    })
}

const mapStateToProps = (state) => {
    return {
        selectedFriend: state.RChatList.selectedFriend,
        messages: state.RChatList.messages,
    }
}

export default connect(mapStateToProps)(MessageList)