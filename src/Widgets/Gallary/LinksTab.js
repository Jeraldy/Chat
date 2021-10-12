import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux"
import Row from "jeddy/layouts/Row"
import A from "jeddy/dom/A";
import { actions } from "../../Reducers/RUI";
import { GALLARY_TAB } from "../../Services/constants";
import { swipeDetector, validURL } from "../../Utils/index"
import Icons from "jeddy/utils/Icons";
import Icon from "jeddy/widgets/Icon";

const { setActiveGallaryTab } = actions

const LinksTab = ({ messages }) => {
    swipeDetector(GALLARY_TAB.LINKS, onPageSwaped)
    return Div({
        children: messages.map(message => LinkItem(message)),
        style: { marginTop: "8px", height: "90%", overflowY: "scroll" },
        id: GALLARY_TAB.LINKS
    })
}

function onPageSwaped(eventType) {
    if (eventType == "swiperight") {
        dispatch(setActiveGallaryTab(GALLARY_TAB.DOCUMENTS))
    }
}

const LinkItem = (message) => {
    return Row({
        children: [
            Div({
                children: [Icon({ name: Icons.link })]
            }),
            Div({
                children: [
                    A({
                        children: [message.content || "File"],
                        href: "#",
                        style: { textDecoration: "none", paddingLeft: "8px" }
                    })
                ],
                style: { overflow: "hidden" }
            })
        ],
        style: {
            width: "calc(100% - 40px)",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            margin: "5px",
            textAlign: "left"
        }
    })
}

const filterFiles = (message) => {
    const _msg = message.filter(m => validURL(m.content) && m.type == "text")
    return _msg
}

const mapStateToProps = (state) => ({
    messages: filterFiles(state.RChatList.messages)
})

export default connect(mapStateToProps)(LinksTab);