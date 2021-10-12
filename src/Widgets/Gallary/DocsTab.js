import Div from "jeddy/dom/Div"
import Img from "jeddy/dom/Img"
import { connect, dispatch } from "jeddy/jredux"
import Row from "jeddy/layouts/Row"
import PDF from "../../Assets/pdf.png";
import FILE_ICON from "../../Assets/fileIcon.png";
import A from "jeddy/dom/A";
import FlatButton from "../../Utils/FlatButton";
import { actions } from "../../Reducers/RUI";
import { GALLARY_TAB } from "../../Services/constants";
import { swipeDetector } from "../../Utils/index"
const { setActiveGallaryTab } = actions

const DocsTab = ({ messages }) => {
    swipeDetector(GALLARY_TAB.DOCUMENTS, onPageSwaped)
    return Div({
        children: messages.map(message => DocItem(message)),
        style: { marginTop: "8px", height: "90%", overflowY: "scroll" },
        id: GALLARY_TAB.DOCUMENTS
    })
}

function onPageSwaped(eventType) {
    if (eventType == "swipeleft") {
        dispatch(setActiveGallaryTab(GALLARY_TAB.LINKS))
    } else if (eventType == "swiperight") {
        dispatch(setActiveGallaryTab(GALLARY_TAB.IMAGES))
    }
}

const DocItem = (message) => {
    const src = message.type.includes("pdf") ? PDF : FILE_ICON
    return FlatButton({
        children: [
            Row({
                children: [
                    Img({ width: "20px", height: "20px", src }),
                    Div({
                        children: [
                            A({
                                children: [message.fileName || "File"],
                                href: "#",
                                style: { textDecoration: "none", paddingLeft: "8px" }
                            })
                        ],
                        style: { width: "calc(100% - 20px)", }
                    })
                ],
            })
        ],
        onClick: () => {
            window.open(message.content, message.fileName || "Download")
        },
        style: {
            width: "calc(100% - 10px)",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            margin: "5px",
            textAlign: "left"
        }
    })
}

const filterFiles = (message) => {
    const _msg = message.filter(m =>
        !m.type.includes("image")
        && !m.type.includes("video")
        && !m.type.includes("audio")
        && !m.type.includes("text"))
    return _msg
}

const mapStateToProps = (state) => ({
    messages: filterFiles(state.RChatList.messages)
})

export default connect(mapStateToProps)(DocsTab);