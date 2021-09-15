import Div from "jeddy/dom/Div"
import ChatListItem from "./ChatListItem"
import { connect } from "jeddy/jredux"

const ChatList = ({ friends }) => {
    return Div({
        children: friends.map(friend => ChatListItem(friend))
    })
}

const mapStateToProps = (state) => ({ friends: state.RChatList.friends })

export default connect(mapStateToProps)(ChatList)