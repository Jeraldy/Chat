import Div from "jeddy/dom/Div"
import ChatListItem from "./ChatListItem"
import { connect } from "jeddy/jredux"

const ChatList = ({ contacts, groups }) => {
    const data = sort([...contacts, ...groups])
    return Div({
        children: data.map((contact, i) => ChatListItem(contact, i)),
        style: { overflowY: "scroll", height: "88vh" }
    })
}

const sort = (data) => data.sort((a, b) => {
    let _a = a.lastChat || {}
    let _b = b.lastChat || {}
    let given = "October 1, 0001 00:00:00";
    return new Date(_b.date || given) - new Date(_a.date || given)
})

const mapStateToProps = (state) => ({
    contacts: state.RUser.contacts,
    groups: state.RGroup.groups
})

export default connect(mapStateToProps)(ChatList)