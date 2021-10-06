import Card from "jeddy/widgets/Card"
import Row from "jeddy/layouts/Row"
import RowAlign from "jeddy/layouts/RowAlign"
import FlatButton from "../../Utils/FlatButton"
import { actions } from "../../Reducers/RUI"
import { dispatch } from "jeddy/jredux"
import { PAGE } from "../../Services/constants"
import Icons from "jeddy/utils/Icons"
import Icon from "jeddy/widgets/Icon";

const { toggleActionMenu, setActivePage } = actions

const ActionsMenu = () => {
    return Card({
        children: [
            MenuItem({
                label: "Search contact"
            }),
            MenuItem({
                label: "New group"
            }),
            MenuItem({
                label: "Starred messages"
            }),
            MenuItem({
                label: "Settings"
            }),
            Row({
                children: [
                    FlatButton({
                        children: [Icon({ name: Icons.highlight_off })],
                        onClick: () => dispatch(toggleActionMenu())
                    })
                ],
                align: RowAlign.End
            })
        ],
        style: {
            minWidth: "180px",
            position: "absolute",
            left: "-30px",
            top: "-2px"
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
                    dispatch(toggleActionMenu())
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
        case PAGE.CREATE_GROUP:
            return dispatch(setActivePage(label))
        case PAGE.SEARCH_MY_CONTACT:
            return dispatch(setActivePage(label))
    }
}

export default ActionsMenu;
