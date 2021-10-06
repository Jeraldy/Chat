import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux"
import FlatButton from "../../Utils/FlatButton"
import Row from "jeddy/layouts/Row"
import Avator from "../../Utils/Avator"
import Center from "jeddy/layouts/Center"
import Theme from "../../Utils/Theme"
import { actions } from "../../Reducers/RChatList";
import RowAlign from "jeddy/layouts/RowAlign"
import Icons from "jeddy/utils/Icons"
import Icon from "jeddy/widgets/Icon";

const { setFowardMessageRecipient } = actions

const FowardMsgContactList = ({ contacts, groups, searchQuery, recipients }) => {
    const data = filter([...contacts, ...groups], searchQuery)
    return Div({
        id: "chat-list",
        children: data.map(contact => ContactItem(contact, recipients)),
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

function ContactItem(friend, recipients) {
    const selected = recipients.filter(a => a.uid == friend.uid).length == 1
    return FlatButton({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            Avator(friend.image,friend.displayName),
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
                    selected ? Icon({
                        name: Icons.done,
                        style: { color: Theme.Colors.PRIMARY,}
                    }) : null
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
            dispatch(setFowardMessageRecipient(friend))
        },
    })
}

const mapStateToProps = (state) => ({
    contacts: state.RUser.contacts,
    groups: state.RGroup.groups,
    searchQuery: state.RChatList.searchQuery,
    user: state.RUser.user,
    recipients: state.RChatList.fowardMessageRecipients
})

export default connect(mapStateToProps)(FowardMsgContactList)