import Row from "jeddy/layouts/Row"
import Div from "jeddy/dom/Div"
import RowAlign from "jeddy/layouts/RowAlign"
import Img from "jeddy/dom/Img";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons";
import Center from "jeddy/layouts/Center";
import FlatButton from "./FlatButton";
import Theme from "./Theme";
import { dispatch } from "jeddy/jredux";
import { actions } from "../Reducers/RChatList";
const { handleRepliedMessage } = actions

export default (repliedMessage, showCancel) => {
    if (!repliedMessage) {
        return null
    }
    const hasImage = repliedMessage.messageType.includes("image")
    return Row({
        children: [
            Div({
                children: [
                    Div({
                        children: [repliedMessage.sentBy],
                        style: {
                            color: "#e53935",
                            fontWeight: "bold",
                            padding: "4px",
                            fontStyle: "italic"
                        }
                    }),
                    ReplayContent(repliedMessage)
                ],
                style: {
                    margin: "4px",
                    borderLeft: "4px solid #8e24aa",
                    backgroundColor: "#fce4ec",//"#fafafa",
                    padding: "2px",
                    width: hasImage ? "calc(100% - 50px)" : "100%",
                    marginRight: 0,
                    height: "50px",
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                }
            }),
            hasImage ? Img({
                src: repliedMessage.content,
                style: {
                    margin: "4px",
                    height: "52px",
                    width: "50px",
                    backgroundColor: "#ccc",
                    marginLeft: 0,
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px"
                }
            }) : null,
            showCancel ? FlatButton({
                children: [
                    Center({
                        child: Icon({
                            name: Icons.close,
                            style: { fontSize: "10px", color: "black" }
                        })
                    })
                ],
                style: {
                    position: "absolute",
                    height: "20px",
                    width: "20px",
                    borderRadius: "100%",
                    backgroundColor: Theme.Colors.LIGHT_GREY,
                    top: "-5px",
                    right: "-2px"
                },
                onClick: () => dispatch(handleRepliedMessage(null))
            }) : null
        ],
        align: RowAlign.SpaceBetween,
        style: { cursor: "pointer" }
    })
}


function ReplayContent(message) {
    const { messageType, content, fileName } = message
    if (messageType == "text") {
        return content
    } else if (messageType.includes("image")) {
        return Row({
            children: [
                Icon({
                    name: Icons.image,
                    style: { fontSize: '18px', }
                }),
                Div({ children: ["Photo"], style: { marginLeft: "8px" } })
            ],
        })
    } else if (messageType.includes("video")) {
        return Row({
            children: [
                Icon({
                    name: Icons.videocam,
                    style: { fontSize: '18px', }
                }),
                Div({ children: ["Video"], style: { marginLeft: "8px" } })
            ],
        })
    } else if (messageType.includes("audio")) {
        return Row({
            children: [
                Icon({
                    name: Icons.audiotrack,
                    style: { fontSize: '18px', }
                }),
                Div({ children: [fileName], style: { marginLeft: "8px" } })
            ],
        })
    }
    return Row({
        children: [
            Img({
                width: "20px",
                height: "20px",
                src: type.includes("pdf") ? PDF : FILE_ICON
            }),
            Div({ children: [fileName], style: { marginLeft: "8px" } })
        ],
    })
}
