import Div from "jeddy/dom/Div";
import ToolBar from "../ToolBar/index";
import ChatList from "../ChatList/index";

export default () => {
    return Div({
        children:[
            ToolBar(),
            ChatList()
        ]
    })
}