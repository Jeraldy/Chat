import Div from "jeddy/dom/Div"
import Row from "jeddy/layouts/Row"
import RowAlign from "jeddy/layouts/RowAlign"
import DisplayMessage from "../../Utils/DisplayMessage"
import { renderMsg } from "../../Utils/index"
import Icons from "jeddy/utils/Icons"
import Icon from "jeddy/widgets/Icon";
import ReplyMessageUI from "../../Utils/ReplyMessageUI"
import FlatButton from "../../Utils/FlatButton"
import Input from "jeddy/dom/Input";
import Center from "jeddy/layouts/Center";
import { connect, dispatch } from "jeddy/jredux"
import { actions } from "../../Reducers/RChatList";
const { handleSelectedMessage, toggleActionBar } = actions

const ChatBubble = ({ selectedMessages, showActionBar }, message, selectedFriend) => {
    const left = message.sentBy == selectedFriend.userName
    const selected = selectedMessages.includes(message.messageId)
    return Row({
        children: [
            Bubble(message, left, selectedMessages),
            showActionBar ? Div({
                children: [
                    Center({
                        child: Input({
                            type: "checkbox",
                            onChange: () => dispatch(handleSelectedMessage(message.messageId)),
                            checked: selectedMessages.includes(message.messageId)
                        })
                    })
                ]
            }) : null
        ],
        align: left ? RowAlign.Start : RowAlign.End,
        style: {
            padding: "8px",
            backgroundColor: selected ? "rgb(224, 235, 252,.5)" : "transparent"
        }
    })
}

function Bubble(message, left, selectedMessages) {
    return Div({
        children: [
            BubbleActions(message, selectedMessages),
            ReplyMessageUI(message.repliedMessage),
            Div({
                children: [
                    DisplayMessage(message),
                    message.extraContent ? Div({ children: renderMsg(message.extraContent) }) : null
                ],
                style: { wordWrap: "break-word", overflowWrap: "break-word" }
            }),
            Row({
                children: [
                    left ? null : Icon({
                        name: message._createdAt ? Icons.done_all : Icons.done,
                        style: {
                            fontSize: "12px",
                            color: message.seen ? "#03a9f4" : "#ccc"
                        }
                    }),
                    Div({
                        children: [message._createdAt ? `${message._createdAtHrs}` : "10:23 AM"],
                        style: {
                            color: "grey",
                            textAlign: "right",
                            padding: "2px",
                            fontStyle: "italic",
                            paddingTop: "0",
                            fontSize: "12px"
                        }
                    }),
                ],
                align: RowAlign.SpaceBetween
            }),
        ],
        style: {
            backgroundColor: left ? "white" : "#e3f2fd",
            maxWidth: "80%",
            minWidth: "20%",
            borderRadius: left ? "0 18px 18px 18px" : "18px 0 18px 18px",
            padding: "8px",
            position: "relative"
        }
    })
}

function BubbleActions(message, selectedMessages) {
    if (selectedMessages.length > 0) {
        return
    }
    return FlatButton({
        children: [
            Icon({ name: Icons.keyboard_arrow_down, })
        ],
        style: {
            position: "absolute",
            top: "-1px",
            right: "0px",
            color: "#ccc"
        },
        onClick: () => {
            dispatch(toggleActionBar())
            if (!selectedMessages.includes(message.messageId)) {
                dispatch(handleSelectedMessage(message.messageId))
            }
        }
    })
}

const mapStateToProps = (state) => {
    return {
        selectedMessages: state.RChatList.selectedMessages,
        showActionBar: state.RChatList.showActionBar
    }
}
export default connect(mapStateToProps)(ChatBubble)
