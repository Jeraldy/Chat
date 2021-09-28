import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux"
import FlatButton from "../../Utils/FlatButton"
import Row from "jeddy/layouts/Row"
import Avator from "../../Utils/Avator"
import Center from "jeddy/layouts/Center"
import Theme from "../../Utils/Theme"
import { actions } from "../../Reducers/RGroup";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons"
import RowAlign from "jeddy/layouts/RowAlign"

const { addNewMember } = actions

const ContactList = ({ contacts, selectedMembers }) => {
    return Div({
        id: "chat-list",
        children: contacts.map(contact => ContactItem(contact, selectedMembers))
    })
}

function ContactItem(contact, selectedMembers) {
    const selected = selectedMembers.filter(a => a.uid == contact.uid).length == 1
    return FlatButton({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            Avator(contact.image),
                            Div({
                                children: [
                                    Center({ child: contact.displayName })
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
                        style: {
                            color: "#1e88e5",
                        }
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
        onClick: () => dispatch(addNewMember(contact)),
    })
}


const mapStateToProps = (state) => ({
    contacts: state.RUser.contacts,
    selectedMembers: state.RGroup.selectedMembers
})

export default connect(mapStateToProps)(ContactList)