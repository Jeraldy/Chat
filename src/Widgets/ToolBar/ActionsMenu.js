import Card from "jeddy/widgets/Card"
import Row from "jeddy/layouts/Row"
import RowAlign from "jeddy/layouts/RowAlign"
import FlatButton from "../../Utils/FlatButton"
import { actions } from "../../Reducers/RUI"
import { dispatch } from "jeddy/jredux"
import { PAGE } from "../../Services/constants"
const { toggleActionMenu, setActivePage } = actions

const ActionsMenu = () => {
    return Card({
        children: [
            MenuItem({
                label: "New group"
            }),
            MenuItem({
                label: "New broadcast"
            }),
            MenuItem({
                label: "Starred messages"
            }),
            MenuItem({
                label: "Settings"
            }),
        ],
        style: {
            width: "130px",
            position: "absolute",
            right: "8px",
            top: "-5px"
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
                }
            })
        ],
        style: {
            padding: "4px",
            borderBottom: "1px solid #f5f5f5"
        },
        align: RowAlign.Start
    })
}

function handleMenuAction(label) {
    switch (label) {
        case PAGE.CREATE_GROUP:
            return dispatch(setActivePage(label))
    }
}

export default ActionsMenu;
