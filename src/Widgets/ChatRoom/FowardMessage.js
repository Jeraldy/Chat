import Div from "jeddy/dom/Div"
import Card from "jeddy/widgets/Card";
import Row from "jeddy/layouts/Row";
import FlatButton from "../../Utils/FlatButton";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons";
import { dispatch, connect } from "jeddy/jredux";
import { actions } from "../../Reducers/RUI";
import { actions as chatListActions } from "../../Reducers/RChatList";
import { PAGE } from "../../Services/constants";
import Theme from "../../Utils/Theme";
import Input from "jeddy/dom/Input";
import FowardMsgContactList from "./FowardMsgContactList";
import Center from "jeddy/layouts/Center";
import { sendMessage } from "../../Services/index";
import { genChatId } from "../../Utils/index";

const { setActivePage } = actions
const { handleSearchQuery, setFowardMessage, setFowardMessageRecipient } = chatListActions

const FowardMessage = ({ recipients, user, messages }) => {
    return Div({
        children: [ActionBar(),
        FowardMsgContactList(),
        SelectedMessages(recipients),
        Fab(recipients, user, messages)],
        style: { position: "relative", height: "100%" }
    })
}

const ActionBar = () => {
    return Card({
        children: [
            Row({
                children: [
                    FlatButton({
                        children: [Icon({ name: Icons.arrow_back, style: { color: "#fff" } })],
                        onClick: () => dispatch(setActivePage(PAGE.HOME))
                    }),
                    Input({
                        type: "text",
                        id: "search-input",
                        placeholder: "Foward message to",
                        onKeyUp: (e) => dispatch(handleSearchQuery(e.target.value)),
                        style: {
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            outline: 0,
                            border: 0,
                            marginLeft: "15px"
                        }
                    }),
                ]
            }),
        ],
        style: { padding: "8px", backgroundColor: Theme.Colors.PRIMARY, color: "white" }
    })
}

function Fab(recipients, user, messages) {
    if(recipients.length == 0){
        return
    }
    return FlatButton({
        children: [
            Center({ child: Icon({ name: Icons.forward }) })
        ],
        style: {
            position: "absolute",
            bottom: "13px",
            right: "13px",
            borderRadius: "100%",
            backgroundColor: Theme.Colors.PRIMARY,
            padding: "10px",
            color: "white",
        },
        onClick: () => {
            recipients.forEach(selectedContact => {
                messages.forEach(message => {
                    commitMessage(message, user, selectedContact)
                })
                dispatch(setFowardMessageRecipient(selectedContact))
            })
            dispatch(setFowardMessage([]))
            dispatch(setActivePage(PAGE.HOME))
        }
    })
}

function commitMessage(message, user, selectedContact) {
    if (message) {
        if (selectedContact.type == "group") {
            sendMessage({
                ...message,
                senderId: user.uid,
                senderPhone: user.phoneNumber,
                senderName: user.displayName,
                seen: false,
                chatId: selectedContact.id,
                members: selectedContact.members,
                forwarded: true
            })
        } else {
            let _message = {
                ...message,
                senderId: user.uid,
                senderPhone: user.phoneNumber,
                senderName: user.displayName,
                receiverId: selectedContact.uid,
                receiverPhone: selectedContact.phoneNumber,
                receiverName: selectedContact.displayName,
                seen: false,
                chatId: genChatId(user.uid, selectedContact.uid),
                members: [user.uid, selectedContact.uid],
                forwarded: true
            }
            sendMessage(_message)
        }
    }
}

function SelectedMessages(recipients) {
    return Div({
        children: [
            Center({ child: `${recipients.length} selected` })
        ],
        style: {
            position: "absolute",
            bottom: "13px",
            left: 0,
            backgroundColor: Theme.Colors.PRIMARY,
            padding: "5px",
            color: "white"
        },
    })
}

const mapStateToProps = (state) => ({
    recipients: state.RChatList.fowardMessageRecipients,
    messages: state.RChatList.fowardMessages,
    user: state.RUser.user
})

export default connect(mapStateToProps)(FowardMessage);