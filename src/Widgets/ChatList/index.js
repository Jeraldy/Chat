import Div from "jeddy/dom/Div"
import ChatListItem from "./ChatListItem"
import { connect } from "jeddy/jredux"

const ChatList = ({ contacts }) => {
    return Div({
        id: "chat-list",
        children: contacts.map(contact => ChatListItem(contact))
    })
}

const mapStateToProps = (state) => ({ contacts: state.RUser.contacts })

export default connect(mapStateToProps)(ChatList)