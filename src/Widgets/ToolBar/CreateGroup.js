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
import ContactList from "./ContactList";
import Center from "jeddy/layouts/Center";
import Avator from "../../Utils/Avator";
import Theme from "../../Utils/Theme";
const { setActivePage } = actions
const { addNewMember } = groupActions

const CreateGroup = ({ selectedMembers }) => {
    return Div({
        children: [
            ActionBar(selectedMembers),
            Div({
                children: [
                    Row({
                        children: selectedMembers.map(member => SeletedItem(member)),
                        style: { padding: "8px" },
                        wrapContent: true
                    })
                ],
                style: { maxHeight: "30vh", overflowY: "scroll" }
            }),
            ContactList(),
            Fab()
        ],
        style: { position: "relative", height: "100%" }
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
                        style: { position: "relative",width: "60px", }
                    }),
                    Row({
                        children: [member.displayName],
                        align: RowAlign.Center,
                        style: { fontSize: "10px", color: "#ccc", }
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

function ActionBar(selectedMembers) {
    return Card({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.arrow_back, style: { color: "#fff" } })],
                                onClick: () => dispatch(setActivePage(PAGE.HOME))
                            }),
                            Div({
                                children: [
                                    Div({
                                        children: ["New group"],
                                        style: { fontWeight: "bold" }
                                    }),
                                    Div({
                                        children: [
                                            selectedMembers.length > 0 ?
                                                `${selectedMembers.length} selected ` : "Add participants"
                                        ]
                                    })
                                ],
                                style: { marginLeft: "15px" }
                            }),
                        ]
                    }),
                    FlatButton({
                        children: [Icon({ name: Icons.search, style: { color: "#fff" } })]
                    }),
                ],
                align: RowAlign.SpaceBetween
            })
        ],
        style: { padding: "8px", backgroundColor: Theme.Colors.PRIMARY, color: "white" }
    })
}

function Fab() {
    return FlatButton({
        children: [
            Center({ child: Icon({ name: Icons.arrow_forward }) })
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
        onClick: () => dispatch(setActivePage(PAGE.CREATE_GROUP2))
    })
}

const mapStateToProps = (state) => ({ ...state.RGroup })

export default connect(mapStateToProps)(CreateGroup);