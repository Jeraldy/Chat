import Div from "jeddy/dom/Div";
import ToolBar from "../ToolBar/index";
import ChatList from "../ChatList/index";
import FlatButton from "../../Utils/FlatButton";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons";
import Center from "jeddy/layouts/Center";
import SearchContact from "./SearchContact";
import { dispatch } from "jeddy/jredux";
import { actions } from "../../Reducers/RUser";
const { toggleSearchContactForm, setSearchedContact } = actions

export default () => {
    return Div({
        children: [
            ToolBar(),
            ChatList(),
            Fab(),
            SearchContact()
        ],
        style: { position: "relative", height: "100%" }
    })
}

function Fab() {
    return FlatButton({
        children: [
            Center({ child: Icon({ name: Icons.message }) })
        ],
        style: {
            position: "absolute",
            bottom: "13px",
            right: "13px",
            borderRadius: "100%",
            backgroundColor: "#1e88e5",
            padding: "10px",
            color: "white"
        },
        onClick: () => {
            dispatch(setSearchedContact({}))
            dispatch(toggleSearchContactForm())
        }
    })
}