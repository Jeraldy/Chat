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
    const left = message.senderId == selectedFriend.uid
    const selected = selectedMessages.filter(m => m.id == message.id).length == 1
    return Row({
        id: message.id,
        children: [
            Bubble(message, left, selectedMessages),
            showActionBar ? Div({
                children: [
                    Center({
                        child: Input({
                            type: "checkbox",
                            onChange: () => dispatch(handleSelectedMessage(message)),
                            checked: selected
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
                    message.extraText ? Div({ children: renderMsg(message.extraText) }) : null
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
                        children: [message._createdAt ? `${message._createdAtHrs}` : ""],
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
            minWidth: "45%",
            borderRadius: left ? "0 8px 8px 8px" : "8px 0 8px 8px",
            padding: "8px",
            position: "relative"
        },
    })
}

function BubbleActions(message, selectedMessages) {
    if (selectedMessages.length > 0) {
        return
    }
    return Div({
        children: [
            FlatButton({
                children: [Icon({ name: Icons.keyboard_arrow_down, })],
                style: {
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    color: "#ccc"
                },
                onClick: () => {
                    dispatch(toggleActionBar())
                    if (selectedMessages.filter(m => m.id == message.id).length == 0) {
                        dispatch(handleSelectedMessage(message))
                    }
                }
            })
        ]
    })
}

const mapStateToProps = (state) => ({
    selectedMessages: state.RChatList.selectedMessages,
    showActionBar: state.RChatList.showActionBar
})

export default connect(mapStateToProps)(ChatBubble)
