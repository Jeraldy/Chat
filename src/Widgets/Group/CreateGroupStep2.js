import Div from "jeddy/dom/Div"
import Card from "jeddy/widgets/Card";
import Row from "jeddy/layouts/Row";
import FlatButton from "../../Utils/FlatButton";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons";
import RowAlign from "jeddy/layouts/RowAlign";
import { dispatch, connect } from "jeddy/jredux";
import { actions } from "../../Reducers/RUI";
import { actions as groupActions } from "../../Reducers/RGroup";
import { PAGE } from "../../Services/constants";
import Center from "jeddy/layouts/Center";
import Avator from "../../Utils/Avator";
import Theme from "../../Utils/Theme";
import Input from "jeddy/dom/Input";
import TextArea from "jeddy/dom/TextArea";
import { createChatGroup } from "../../Services/index";

const { setActivePage } = actions
const { addNewMember } = groupActions

const CreateGroupStep2 = ({ selectedMembers, user }) => {
    return Div({
        children: [
            ActionBar(selectedMembers),
            Form(),
            Div({
                children: [`Participants: ${selectedMembers.length}`],
                style: { padding: "8px" }
            }),
            Div({
                children: [
                    Row({
                        children: selectedMembers.map(member => SeletedItem(member)),
                        style: { padding: "8px" },
                        wrapContent: true
                    })
                ],
                style: { height: "70vh", overflowY: "scroll" }
            }),
            selectedMembers.length > 0 ? Fab(user, selectedMembers) : null
        ],
        style: { position: "relative", height: "100%", backgroundColor: Theme.Colors.LIGHT_GREY }
    })
}

function Form() {
    return Div({
        children: [
            Input({
                type: "text",
                placeholder: "Group name",
                id: "groupName",
                style: {
                    border: "1px solid #ccc",
                    outline: 0,
                    padding: "8px",
                    marginLeft: "10px",
                    borderRadius: "8px",
                    width: "90%"
                }
            }),
            TextArea({
                placeholder: "Group description (optional)",
                id: "groupDesc",
                style: {
                    border: "1px solid #ccc",
                    outline: 0,
                    padding: "8px",
                    marginLeft: "10px",
                    borderRadius: "8px",
                    width: "90%",
                    marginTop: "8px"
                }
            }),
        ],
        style: {
            padding: "8px",
            backgroundColor: "#fff",
            marginTop: "8px"
        }
    })
}

function SeletedItem(member) {
    return Row({
        children: [
            Div({
                children: [
                    Div({
                        children: [
                            Avator(member.photo),
                            CloseButton(member)
                        ],
                        style: { position: "relative", width: "60px" }
                    }),
                    Row({
                        children: [member.displayName],
                        align: RowAlign.Center,
                        style: { fontSize: "10px", color: "#ccc", overflow: "hidden" }
                    }),
                ]
            }),
        ],
        align: RowAlign.Center,
        style: { margin: "8px" }
    })
}

function CloseButton(member) {
    return FlatButton({
        children: [
            Center({ child: 'x' })
        ],
        style: {
            borderRadius: "100%",
            backgroundColor: "#ccc",
            position: "absolute",
            right: "3px",
            top: "5px",
            border: "2px solid #fff",
            color: "#fff",
            fontSize: "10px",
            width: "15px",
            height: "15px"
        },
        onClick: () => dispatch(addNewMember(member))
    })
}

function ActionBar() {
    return Card({
        children: [
            Row({
                children: [
                    FlatButton({
                        children: [Icon({ name: Icons.arrow_back, style: { color: "#fff" } })],
                        onClick: () => dispatch(setActivePage(PAGE.CREATE_GROUP))
                    }),
                    Div({
                        children: [
                            Div({
                                children: ["New group"],
                                style: { fontWeight: "bold" }
                            }),
                            Div({
                                children: ["Add subject"
                                ]
                            })
                        ],
                        style: { marginLeft: "15px" }
                    }),
                ]
            }),
        ],
        style: { padding: "8px", backgroundColor: Theme.Colors.PRIMARY, color: "white" }
    })
}

function Fab(user, members) {
    return FlatButton({
        children: [
            Center({ child: Icon({ name: Icons.done }) })
        ],
        style: {
            position: "absolute",
            bottom: "13px",
            right: "13px",
            borderRadius: "100%",
            backgroundColor: Theme.Colors.PRIMARY,
            padding: "10px",
            color: "white"
        },
        onClick: () => createGroup(user, members)
    })
}

function createGroup(user, members) {
    let groupName = document.getElementById('groupName')
    let groupDesc = document.getElementById('groupDesc')
    let group = {
        displayName: groupName.value,
        desc: groupDesc.value || groupName.value,
        superAdmin: user.uid,
        admins: [user.uid],
        members: [user.uid, ...members.map(m => m.uid)],
        isReadOnly: false,
    }
    if (group.displayName) {
        createChatGroup(group)
        dispatch(setActivePage(PAGE.HOME))
    } else {
        groupName.style.border = "1px solid red"
    }
}

const mapStateToProps = (state) => ({
    ...state.RGroup,
    user: state.RUser.user
})

export default connect(mapStateToProps)(CreateGroupStep2);