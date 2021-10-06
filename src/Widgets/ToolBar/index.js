import Row from 'jeddy/layouts/Row';
import RowAlign from 'jeddy/layouts/RowAlign';
import Div from 'jeddy/dom/Div';
import Icon from 'jeddy/widgets/Icon';
import Icons from "jeddy/utils/Icons";
import FlatButton from '../../Utils/FlatButton';
import Center from "jeddy/layouts/Center";
import { connect, dispatch } from 'jeddy/jredux';
import ActionsMenu from './ActionsMenu';
import { actions } from '../../Reducers/RUI';
import Theme from '../../Utils/Theme';
import Avator from '../../Utils/Avator';
import Card from "jeddy/widgets/Card";
const { toggleActionMenu } = actions

const ToolBar = ({ user, showActionMenu }) => {
    return Card({
        children: [
            Row({
                children: [
                    Actions(showActionMenu),
                    Div({
                        children: [
                            Center({ child: "TuChatty" })
                        ],
                        style: { fontWeight: "bold" }
                    }),
                    Avator(user.image, user.displayName),
                ],
                align: RowAlign.SpaceBetween,
            }),
        ],
        style: {
            padding: "10px", color: 'white',
            backgroundImage: `linear-gradient(to right, ${Theme.Colors.PRIMARY} ,#304152)`
        }
    })
}

const Actions = (showActionMenu) => {
    return Row({
        children: [
            FlatButton({
                children: [Icon({ name: Icons.more_horiz, style: { color: "white" } }),],
                onClick: () => dispatch(toggleActionMenu())
            }),
            showActionMenu ? Div({
                children: [ActionsMenu()],
                style: { position: "relative" }
            }) : null
        ]
    })
}

const mapStateToProps = (state) => ({
    user: state.RUser.user,
    showActionMenu: state.RUI.showActionMenu
})

export default connect(mapStateToProps)(ToolBar);

