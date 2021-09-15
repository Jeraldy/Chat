import { connect } from "jeddy/jredux";
import Home from "./Widgets/Home/index";
import ChatRoom from "./Widgets/ChatRoom/index";

const App = ({ hasActiveChat }) => {
    return hasActiveChat ? ChatRoom() : Home()
}

const mapStateToProps = (state) => ({ hasActiveChat: state.RChatList.selectedFriend })

export default connect(mapStateToProps)(App)