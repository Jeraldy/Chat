import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux"
import FlatButton from "../../Utils/FlatButton"
import Row from "jeddy/layouts/Row"
import Avator from "../../Utils/Avator"
import Center from "jeddy/layouts/Center"
import Theme from "../../Utils/Theme"
import { actions } from "../../Reducers/RChatList";
import { actions as UIAction } from "../../Reducers/RUI";
import RowAlign from "jeddy/layouts/RowAlign"
import { fetchMessages } from "../../Services/index"
import { genChatId } from "../../Utils/index"
import { PAGE } from "../../Services/constants"

const { setSelectedFriend, handleSearchQuery } = actions
const { setActivePage } = UIAction

const SearchContactList = ({ contacts, groups, searchQuery, user }) => {
    const data = filter([...contacts, ...groups], searchQuery)
    return Div({
        id: "chat-list",
        children: data.map(contact => ContactItem(contact, user)),
        style: {
            height: "600px",
            overflowY: "scroll"
        }
    })
}

function filter(data, query) {
    return data.filter(c =>
        JSON.stringify(c)
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
    ).sort((a, b) => {
        let _a = a.lastChat || {}
        let _b = b.lastChat || {}
        let given = "October 13, 2014 11:13:00";
        return new Date(_b.date || given) - new Date(_a.date || given)
    })
}

function ContactItem(friend, user) {
    return FlatButton({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            Avator(friend.image, friend.displayName),
                            Div({
                                children: [
                                    Center({ child: friend.displayName })
                                ],
                                style: {
                                    fontWeight: "bold",
                                    paddingLeft: "10px"
                                }
                            }),
                        ]
                    }),
                ],
                align: RowAlign.SpaceBetween
            })
        ],
        style: {
            padding: "8px",
            borderBottom: `1px solid ${Theme.Colors.LIGHT_GREY}`,
            width: "100%"
        },
        onClick: () => {
            dispatch(setSelectedFriend(friend))
            dispatch(setActivePage(PAGE.CHAT_ROOM))
            dispatch(handleSearchQuery(""))
            let chatId = friend.id
            if (friend.type != "group") {
                chatId = genChatId(friend.uid, user.uid)
            }
            fetchMessages(chatId, user.uid)
        },
    })
}

const mapStateToProps = (state) => ({
    contacts: state.RUser.contacts,
    groups: state.RGroup.groups,
    searchQuery: state.RChatList.searchQuery,
    user: state.RUser.user
})

export default connect(mapStateToProps)(SearchContactList)