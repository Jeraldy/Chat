import Div from "jeddy/dom/Div"
import Row from "jeddy/layouts/Row"
import FlatButton from "../../Utils/FlatButton"
import Label from "jeddy/dom/Label"
import Icons from "jeddy/utils/Icons"
import Icon from "jeddy/widgets/Icon";
import { connect, dispatch } from "jeddy/jredux"
import RowAlign from "jeddy/layouts/RowAlign"
import Input from "jeddy/dom/Input";
import { actions } from "../../Reducers/RChatList"
import TextArea from "jeddy/dom/TextArea";
import ReplyMessageUI from "../../Utils/ReplyMessageUI"
import { genChatId, updateScroll, Emojis } from "../../Utils/index"
import { sendMessage, addToMyContact, addToTheirContact, sendMessageWithFile } from "../../Services/index"
import Theme from "../../Utils/Theme"

const {
    handleTextMessage,
    handleRepliedMessage,
    handleFileToUpload,
    toggleEmojiKeyboard
} = actions

let SELECTED_FILE = null;

const MessageBox = ({ user, repliedMessage, showEmoj,
    selectedContact, fileToUpload, isUploading, uploadProgress }) => {
    return Div({
        children: [
            isUploading ? Div({
                style: {
                    height: "5px",
                    backgroundColor: "green",
                    marginLeft: "10px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    width: uploadProgress == 100 ? `calc(100%-10%)` : `${uploadProgress}%`
                }
            }) : null,
            ReplyMessageUI(repliedMessage, true),
            ReplyMessageUI(fileToUpload, true),
            Row({
                children: [
                    LeftActions(showEmoj),
                    TextArea({
                        id: "message",
                        style: {
                            width: "100%",
                            outline: 0,
                            paddingTop: "14px",
                            border: 0,
                            overflow: "hidden",
                            resize: "none",
                            height: "30px",
                        },
                        placeholder: "Type a message",
                        onKeyUp: (e) => {
                            e.target.style.height = "5px"
                            e.target.style.height = `${e.target.scrollHeight}px`
                        },
                    }),
                    FlatButton({
                        children: [
                            Label({
                                for: "attach-file",
                                children: [
                                    Icon({
                                        name: Icons.attach_file,
                                        style: {
                                            transform: 'rotate(45deg)',
                                            cursor: "pointer",
                                            //color: "#BF962D"
                                        }
                                    })
                                ],
                            })
                        ]
                    }),
                    FlatButton({
                        children: [Icon({ name: Icons.send,style: {color: Theme.Colors.PRIMARY} })],
                        onClick: () => {
                            let input = document.getElementById("message")
                            let textMessage = input.value
                            if (fileToUpload) {
                                commitMessageWithFile(
                                    textMessage,
                                    user,
                                    selectedContact,
                                    repliedMessage,
                                )
                            } else {
                                commitMessage(
                                    textMessage,
                                    user,
                                    selectedContact,
                                    repliedMessage
                                )
                            }
                            input.focus()
                            input.value = ""
                        },
                    })
                ],
                align: RowAlign.SpaceBetween,
            }),
            showEmoj ? Row({
                children: Emojis().map(emj => {
                    return FlatButton({
                        children: [emj],
                        onClick: () => {
                            let input = document.getElementById("message")
                            input.value = `${input.value}${emj}`
                            //dispatch(toggleEmojiKeyboard())
                            input.focus()
                        }
                    })
                }),
                align: RowAlign.SpaceEvenly,
                style: {
                    padding: "8px",
                    borderTop: "1px dashed #ccc"
                }
            }) : null
        ],
        style: {
            position: "absolute",
            bottom: 0,
            width: "calc(100% - 10px)",
            backgroundColor: "white",
            borderRadius: "30px",
            margin: "5px",
        }
    })
}

function commitMessage(message, user, selectedContact, repliedMessage) {
    if (message) {
        if (selectedContact.type == "group") {
            sendMessage({
                senderId: user.uid,
                senderPhone: user.phoneNumber,
                senderName: user.displayName,
                seen: false,
                content: message,
                chatId: selectedContact.id,
                members: selectedContact.members,
                type: "text",
                repliedMessage
            })
        } else {
            let _message = {
                senderId: user.uid,
                senderPhone: user.phoneNumber,
                senderName: user.displayName,
                receiverId: selectedContact.uid,
                receiverPhone: selectedContact.phoneNumber,
                receiverName: selectedContact.displayName,
                seen: false,
                content: message,
                chatId: genChatId(user.uid, selectedContact.uid),
                members: [user.uid, selectedContact.uid],
                type: "text",
                repliedMessage
            }
            sendMessage(_message)
                .then(_ => {
                    const contacts = user.contacts || []
                    if (!contacts.includes(selectedContact.uid)) {
                        addToMyContact(selectedContact, user)
                    }
                    const contacts2 = selectedContact.contacts || []
                    if (!contacts2.includes(user.uid)) {
                        addToTheirContact(selectedContact, user)
                    }
                })
        }
        afterCommits()
    }
}

function commitMessageWithFile(message, user, selectedContact, repliedMessage) {
    if (selectedContact.type == "group") {
        sendMessageWithFile(
            SELECTED_FILE,
            {
                senderId: user.uid,
                senderPhone: user.phoneNumber,
                senderName: user.displayName,
                seen: false,
                chatId: selectedContact.id,
                members: selectedContact.members,
                extraText: message || "",
                repliedMessage: repliedMessage || ""
            }
        )
    } else {
        sendMessageWithFile(
            SELECTED_FILE,
            {
                senderId: user.uid,
                senderPhone: user.phoneNumber,
                senderName: user.displayName,
                receiverId: selectedContact.uid,
                receiverPhone: selectedContact.phoneNumber,
                receiverName: selectedContact.displayName,
                seen: false,
                chatId: genChatId(user.uid, selectedContact.uid),
                members: [user.uid, selectedContact.uid],
                extraText: message || "",
                repliedMessage: repliedMessage || ""
            }
        )
    }
    afterCommits()
}

function readFileURL(target) {
    if (target.files && target.files[0]) {
        const file = target.files[0]
        dispatch(
            handleFileToUpload({
                fileName: file.name,
                type: file.type,
                isUpload: true
            })
        )
        // let reader = new FileReader();
        // reader.onload = function (e) {
        //     const file = target.files[0]
        //     dispatch(
        //         handleFileToUpload({
        //             fileName: file.name,
        //             type: file.type,
        //             content: e.target.result,
        //             isUpload: true
        //         })
        //     )
        // }
        // reader.readAsDataURL(target.files[0]);
    }
}

function afterCommits() {
    dispatch(handleTextMessage(""))
    dispatch(handleRepliedMessage(null))
    dispatch(handleFileToUpload(null))
    updateScroll()
}

function LeftActions(showEmoj) {
    return Row({
        children: [
            Row({
                children: [
                    FlatButton({
                        children: [
                            showEmoj ?
                             Icon({ name: Icons.keyboard_arrow_down }) : 
                             Icon({ name: Icons.mood }) //"🙂"
                        ],
                        style: { fontSize: "18px" },
                        onClick: () => {
                            dispatch(toggleEmojiKeyboard())
                            document.getElementById("message").focus()
                        }
                    }),
                ]
            }),
            Input({
                type: "file",
                id: "attach-file",
                style: { visibility: "hidden" },
                onChange: (e) => {
                    SELECTED_FILE = e.target.files[0]
                    readFileURL(e.target)
                }
            }),
        ],
        style: { width: "40px", marginRight: "15px" }
    })
}

const mapStateToProps = (state) => ({
    textMessage: state.RChatList.textMessage,
    fileToUpload: state.RChatList.fileToUpload,
    repliedMessage: state.RChatList.repliedMessage,
    selectedContact: state.RChatList.selectedFriend,
    user: state.RUser.user,
    isUploading: state.RChatList.isUploading,
    uploadProgress: state.RChatList.uploadProgress,
    showEmoj: state.RChatList.showEmoj
})

export default connect(mapStateToProps)(MessageBox)

