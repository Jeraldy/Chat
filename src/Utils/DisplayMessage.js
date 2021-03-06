import Img from "jeddy/dom/Img";
import Video from "jeddy/dom/Video";
import Audio from "jeddy/dom/Audio";
import Source from "jeddy/dom/Source";
import A from "jeddy/dom/A";
import PDF from "../Assets/pdf.png";
import FILE_ICON from "../Assets/fileIcon.png";
import Row from "jeddy/layouts/Row";
import RowAlign from "jeddy/layouts/RowAlign";
import Div from "jeddy/dom/Div";
import FlatButton from "./FlatButton";
import { validURL, renderMsg } from "./index";
import Span from "jeddy/dom/Span";
import Loader from "./Loader";
import { dispatch } from "jeddy/jredux";
import { PAGE } from "../Services/constants";
import { actions } from "../Reducers/RUI";
import { actions as GallaryActions } from "../Reducers/RGallary";

const { setActivePage } = actions
const { setSelectedMessage } = GallaryActions

const DisplayMessage = (message) => {
    const messageType = message.type
    if (messageType == "text") {
        if (validURL(message.content)) {
            return A({
                children: [message.content],
                href: message.content
            })
        }
        return Span({ children: renderMsg(message.content) })
    }

    if (message.content == "FILE_LOADER") {
        return FlatButton({
            children: [Loader()],
            style: { padding: 0, margin: 0 }
        })
    }

    if (messageType.includes("image")) {
        return FlatButton({
            children: [Img({ src: message.content, width: "100%" })],
            onClick: () => {
                dispatch(setSelectedMessage(message))
                dispatch(setActivePage(PAGE.IMAGE_VIEW))
            },
            style: { padding: 0, margin: 0 }
        })
    } else if (messageType.includes("video")) {
        return Video({
            width: "100%",
            controls: "controls",
            children: [
                Source({ src: message.content, type: message.type })
            ]
        })
    } else if (messageType.includes("audio")) {
        return Audio({
            width: "100%",
            controls: "controls",
            children: [
                Source({ src: message.content, type: message.type })
            ],
            style: { outline: 0 }
        })
    }
    return Row({
        children: [
            Img({
                width: "20px",
                height: "20px",
                src: messageType.includes("pdf") ? PDF : FILE_ICON
            }),
            Div({
                children: [
                    A({
                        children: [message.fileName || "File"],
                        href: message.content,
                        style: { textDecoration: "none", paddingLeft: "8px" }
                    })
                ],
                style: { width: "calc(100%-20px)", }
            })
        ],
        align: RowAlign.SpaceEvenly,
        style: { width: "100%" }
    })
}

export default DisplayMessage;