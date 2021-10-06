import { connect } from "jeddy/jredux";
import Home from "./Widgets/Home/index";
import ChatRoom from "./Widgets/ChatRoom/index";
import { PAGE } from "./Services/constants";
import Div from "jeddy/dom/Div";
import CreateGroupStep1 from "./Widgets/Group/CreateGroupStep1";
import CreateGroupStep2 from "./Widgets/Group/CreateGroupStep2";
import SearchMyContacts from "./Widgets/ChatList/SearchMyContacts";
import FowardMessage from "./Widgets/ChatRoom/FowardMessage"
import ImageViewer from "./Widgets/Gallary/ImageViewer";

const Router = ({ page }) => {
    switch (page) {
        case PAGE.CREATE_GROUP:
            return CreateGroupStep1()
        case PAGE.CREATE_GROUP2:
            return CreateGroupStep2()
        case PAGE.SEARCH_MY_CONTACT:
            return SearchMyContacts()
        case PAGE.FOWARD_MESSAGE:
            return FowardMessage()
        case PAGE.HOME:
            return Home()
        case PAGE.CHAT_ROOM:
            return ChatRoom()
        case PAGE.IMAGE_VIEW:
            return ImageViewer()
    }
    return Div({ children: ["Loading..."] })
}

const mapStateToProps = (state) => ({ page: state.RUI.activePage })

export default connect(mapStateToProps)(Router);