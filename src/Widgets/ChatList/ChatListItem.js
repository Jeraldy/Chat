import Row from "jeddy/layouts/Row";
import Div from "jeddy/dom/Div";
import Theme from "../../Utils/Theme";
import RowAlign from "jeddy/layouts/RowAlign";
import Center from "jeddy/layouts/Center";
import { dispatch, connect } from "jeddy/jredux";
import { actions } from "../../Reducers/RChatList";
import { actions as UIActions } from "../../Reducers/RUI";
import Avator from "../../Utils/Avator";
import FlatButton from "../../Utils/FlatButton";
import { fetchMessages, updateSeen } from "../../Services/index";
import { genChatId, isToDay, isYestaday } from "../../Utils/index";
import Icons from "jeddy/utils/Icons";
import Icon from "jeddy/widgets/Icon";
import { PAGE } from "../../Services/constants";
const { setSelectedFriend } = actions
const { setActivePage } = UIActions

const ChatListItem = ({ user }, friend, index) => {
    const newMessages = friend.newMessages || []
    const numNewMessages = newMessages.length;
    return Div({
        children: [
            FlatButton({
                children: [
                    Row({
                        children: [
                            Avator(friend.image, friend.displayName),
                            Div({
                                children: [
                                    Row({
                                        children: [
                                            Div({
                                                children: [friend.displayName],
                                                style: { fontWeight: "bold", color: "black" }
                                            }),
                                            friend.lastChat ?
                                                Div({
                                                    children: [
                                                        renderDate(
                                                            friend.lastChat._createdAt,
                                                            friend.lastChat._createdAt2,
                                                            friend.lastChat._createdAtHrs
                                                        )
                                                    ],
                                                    style: {
                                                        color: (friend.lastChat.seen || friend.lastChat.senderId == user.uid)
                                                            ? "#ccc" : "#01BC48",//"#01BC48",
                                                        fontWeight: "bold"
                                                    }
                                                }) : null
                                        ],
                                        align: RowAlign.SpaceBetween
                                    }),
                                    Row({
                                        children: [
                                            Div({
                                                children: [
                                                    friend.lastChat ? MediaChat(friend.lastChat, user) : "No messages yet!"
                                                ],
                                                style: {
                                                    // fontStyle: "italic" ,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    textAlign: "left",
                                                    whiteSpace: "nowrap",
                                                    width: "calc(100% - 40px)"
                                                }
                                            }),
                                            numNewMessages > 0 ?
                                                Div({
                                                    children: [Center({ child: `${numNewMessages}` })],
                                                    style: {
                                                        backgroundColor: "#01BC48",
                                                        borderRadius: "100%",
                                                        color: "white",
                                                        height: "20px",
                                                        width: "20px",
                                                        fontWeight: "bold"
                                                    }
                                                }) : null
                                        ],
                                        align: RowAlign.SpaceBetween,
                                        style: { marginTop: "4px" }
                                    })
                                ],
                                style: {
                                    marginLeft: "10px",
                                    width: "calc(100% - 60px)"
                                }
                            })
                        ],
                    })
                ],
                style: {
                    padding: "10px",
                    borderBottom: `1px solid ${Theme.Colors.LIGHT_GREY}`,
                    width: "100%",
                    backgroundColor: "white",
                },
                onClick: () => {
                    dispatch(setSelectedFriend(friend))
                    dispatch(setActivePage(PAGE.CHAT_ROOM))
                    let chatId = friend.id
                    if (friend.type != "group") {
                        chatId = genChatId(friend.uid, user.uid)
                    }
                    fetchMessages(chatId, user.uid)
                    updateSeen(newMessages, user)
                },
            })
        ],
        //style: { backgroundColor: index == 0 ? Theme.Colors.PRIMARY : "", }
    })
}

function MediaChat(lastChat, user) {
    const type = lastChat.type || ""
    const fileName = lastChat.fileName || ""
    const seen = lastChat.seen
    const isMine = lastChat.senderId == user.uid
    if (type.includes("text")) {
        return Row({
            children: [
                isMine ? Icon({
                    name: lastChat._createdAt ? Icons.done_all : Icons.done,
                    style: {
                        fontSize: '18px',
                        color: seen ? "#03a9f4" : "#ccc"
                    }
                }) : null,
                Div({
                    children: [
                        lastChat.content || "No messages yet!"
                    ],
                    style: { marginLeft: "2px" }
                })
            ],
            style: { paddingTop: "8px", }
        })
    }
    if (type.includes("image")) {
        return Row({
            children: [
                isMine ? Icon({
                    name: Icons.done_all,
                    style: {
                        fontSize: '18px',
                        color: seen ? "#03a9f4" : "#ccc"
                    }
                }) : null,
                Icon({
                    name: Icons.image,
                    style: { fontSize: '18px', }
                }),
                Div({ children: ["Photo"], style: { marginLeft: "8px" } })
            ],
            style: { paddingTop: "8px", }
        })
    } else if (type.includes("video")) {
        return Row({
            children: [
                isMine ? Icon({
                    name: Icons.done_all,
                    style: {
                        fontSize: '18px',
                        color: seen ? "#03a9f4" : "#ccc"
                    }
                }) : null,
                Icon({
                    name: Icons.videocam,
                    style: { fontSize: '18px', }
                }),
                Div({ children: ["Video"], style: { marginLeft: "8px" } })
            ],
            style: { paddingTop: "8px", }
        })
    } else if (type.includes("audio")) {
        return Row({
            children: [
                isMine ? Icon({
                    name: Icons.done_all,
                    style: {
                        fontSize: '18px',
                        color: seen ? "#03a9f4" : "#ccc"
                    }
                }) : null,
                Icon({
                    name: Icons.audiotrack,
                    style: { fontSize: '18px', }
                }),
                Div({ children: [fileName], style: { marginLeft: "8px" } })
            ],
            style: { paddingTop: "8px", }
        })
    }
    return Row({
        children: [
            isMine ? Icon({
                name: Icons.done_all,
                style: {
                    fontSize: '18px',
                    color: seen ? "#03a9f4" : "#ccc"
                }
            }) : null,
            Icon({
                name: "file_present",
                style: { fontSize: '18px', }
            }),
            Div({ children: [fileName], style: { marginLeft: "8px" } })
        ],
        style: { paddingTop: "8px", }
    })
}

function renderDate(date, _createdAt2, _createdAtHrs) {
    if (isToDay(date)) {
        return _createdAtHrs
    } else if (isYestaday(date)) {
        return "Yesterday"
    }
    return _createdAt2
}

const mapStateToProps = (state) => ({ user: state.RUser.user })

export default connect(mapStateToProps)(ChatListItem)