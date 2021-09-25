import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux"
import ChatBubble from "./ChatBubble"
import RowAlign from "jeddy/layouts/RowAlign"
import { renderDate } from "../../Utils/index"
import Row from "jeddy/layouts/Row"
import FlatButton from "../../Utils/FlatButton";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons";
import Center from "jeddy/layouts/Center";
import { actions } from "../../Reducers/RChatList"
import { updateSeen } from "../../Services/index"

const { updateScrollHeight } = actions

const MessageList = ({ messages, selectedFriend, showEmoj, showScrollDown }) => {
    let date = ""
    if (messages.length > 0) {
        date = messages[0]._createdAt
    }
    const newMessages = messages
        .filter(message => message.seen == false
            && message.senderId == selectedFriend.uid)
    updateSeen(newMessages)
    return Div({
        id: "chat-list",
        children: [...[].concat.apply([],
            messages.map((message, index) => {
                let notSame = message._createdAt != date
                date = message._createdAt
                if (notSame || index == 0) {
                    return [Row({
                        id: date,
                        children: [
                            date ? Div({
                                children: [`${renderDate(date)}`.toUpperCase()],
                                style: {
                                    backgroundColor: "#b2ebf2",
                                    padding: "6px",
                                    borderRadius: "4px",
                                    width: "150px",
                                    fontSize: "8px"
                                }
                            }) : null
                        ],
                        style: {
                            padding: "8px",
                            position: "sticky",
                            top: '-8px',
                            zIndex: 10,
                        },
                        align: RowAlign.Center,
                    }),
                    ChatBubble(message, selectedFriend)]
                }
                return [ChatBubble(message, selectedFriend)]
            })
        ),
        showScrollDown ? ScrollDown() : null],
        style: {
            position: "absolute",
            bottom: showEmoj ? "90px" : "45px",
            top: 0,
            width: "100%",
            overflowY: "scroll"
        },
        onScroll: (e) => {

        }
    })
}

function ScrollDown() {
    return FlatButton({
        children: [
            Center({ child: Icon({ name: Icons.keyboard_arrow_down }) })
        ],
        style: {
            borderRadius: "100%",
            position: "sticky",
            bottom: 0,
            alignSelf: 'flex-end',
            backgroundColor: "white",
            width: "30px",
            height: "35px",
            marginRight: "8px"
        },
        onClick: () => {
            updateScroll()
            dispatch(updateScrollHeight(false))
        }
    })
}

const mapStateToProps = (state) => ({
    messages: state.RChatList.messages,
    showEmoj: state.RChatList.showEmoj,
    selectedFriend: state.RChatList.selectedFriend,
    showScrollDown: state.RChatList.showScrollDown
})

export default connect(mapStateToProps)(MessageList)