import { connect } from "jeddy/jredux";
import Home from "./Widgets/Home/index";
import ChatRoom from "./Widgets/ChatRoom/index";
import LoginPage from "./Widgets/LoginPage";
import CreateUserInfo from "./Widgets/CreateUserInfo";

const App = ({ user, hasActiveChat }) => {
    if (!user) {
        return LoginPage()
    }
    if (!user.displayName) {
        return CreateUserInfo()
    }
    return hasActiveChat ? ChatRoom() : Home()
}

const mapStateToProps = (state) => ({
    hasActiveChat: state.RChatList.selectedFriend,
    user: state.RUser.user
})

export default connect(mapStateToProps)(App)