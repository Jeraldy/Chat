import Card from "jeddy/widgets/Card"
import Row from "jeddy/layouts/Row"
import RowAlign from "jeddy/layouts/RowAlign"
import FlatButton from "../../Utils/FlatButton"
import { actions } from "../../Reducers/RUI"
import { connect, dispatch } from "jeddy/jredux"
import { PAGE } from "../../Services/constants"
import Icons from "jeddy/utils/Icons"
import Icon from "jeddy/widgets/Icon";

const { toggleChatActionMenu, setActivePage } = actions

const MoreAction = ({ show }) => {

    if (!show) return

    return Card({
        children: [
            MenuItem({
                label: "Search a message"
            }),
            MenuItem({
                label: "Images/Files/Links"
            }),
            MenuItem({
                label: "Delete all messages"
            }),
            MenuItem({
                label: "Block"
            }),
            Row({
                children: [
                    FlatButton({
                        children: [Icon({ name: Icons.delete })],
                        onClick: () => dispatch(toggleChatActionMenu())
                    }),
                    FlatButton({
                        children: [Icon({ name: Icons.highlight_off })],
                        onClick: () => dispatch(toggleChatActionMenu())
                    }),
                ],
                align: RowAlign.SpaceBetween,
                style: {
                    backgroundColor: "#eceff1",
                    paddingTop: "4px",
                    color: "black"
                }
            }),
        ],
        style: {
            minWidth: "180px",
            position: "absolute",
            right: "8px",
            top: "2px"
        }
    })
}

const MenuItem = (props) => {
    return Row({
        children: [
            FlatButton({
                children: [props.label],
                onClick: () => {
                    handleMenuAction(props.label)
                    dispatch(toggleChatActionMenu())
                },
                style: { width: "100%", textAlign: "left" }
            })
        ],
        style: { padding: "8px", borderBottom: "1px solid #f5f5f5" },
        align: RowAlign.Start
    })
}

function handleMenuAction(label) {
    switch (label) {
        case PAGE.GALLARY:
            return dispatch(setActivePage(label))
    }
}

const mapStateToProps = (state) => ({
    show: state.RUI.showChatActionMenu
})
export default connect(mapStateToProps)(MoreAction);
