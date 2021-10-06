import Div from "jeddy/dom/Div";
import ToolBar from "../ToolBar/index";
import ChatList from "../ChatList/index";
import SearchContact from "./SearchContact";
import FlatButton from "../../Utils/FlatButton";
import Center from "jeddy/layouts/Center";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons";
import { dispatch } from "jeddy/jredux";
import { actions } from "../../Reducers/RUser";
import Theme from "../../Utils/Theme";
const { setSearchedContact, toggleSearchContactForm } = actions
const supported = ('contacts' in navigator && 'ContactsManager' in window);

export default () => {
    return Div({
        children: [ToolBar(), ChatList(), Fab(), SearchContact()],
        style: { position: "relative", height: "100%" }
    })
}

function Fab() {
    return FlatButton({
        children: [
            Center({ child: Icon({ name: Icons.add }) })
        ],
        style: {
            position: "absolute",
            bottom: "15px",
            right: "15px",
            borderRadius: "100%",
            backgroundColor: Theme.Colors.PRIMARY,
            padding: "15px",
            color: "white"
        },
        onClick: () => {
            if (supported) {
                fetchContact()
            } else {
                dispatch(setSearchedContact({}))
                dispatch(toggleSearchContactForm())
            }
        }
    })
}

async function fetchContact() {
    const props = ['name', 'tel'];
    const opts = { multiple: true };
    try {
        const contacts = await navigator.contacts.select(props, opts);
        //alert(contacts.toString())
        //handleResults(contacts);
    } catch (ex) {
        console.log(ex)
    }
}