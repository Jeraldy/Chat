import Row from 'jeddy/layouts/Row';
import RowAlign from 'jeddy/layouts/RowAlign';
import Div from 'jeddy/dom/Div';
import Icon from 'jeddy/widgets/Icon';
import Icons from "jeddy/utils/Icons";
import FlatButton from '../../Utils/FlatButton';
import Card from "jeddy/widgets/Card";
import Center from "jeddy/layouts/Center";
import { connect, dispatch } from 'jeddy/jredux';
import ActionsMenu from './ActionsMenu';
import { actions } from '../../Reducers/RUI';
import Theme from '../../Utils/Theme';
const { toggleActionMenu } = actions

const ToolBar = ({ user, showActionMenu }) => {
    return Card({
        children: [
            Row({
                children: [
                    Div({
                        children: [Center({ child: `${user.displayName}` })],
                        style: { fontWeight: "bold" }
                    }),
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.search, style: { color: "white" } }),],
                            }),
                            FlatButton({
                                children: [Icon({ name: Icons.more_vert, style: { color: "white" } }),],
                                onClick: () => dispatch(toggleActionMenu())
                            }),
                            showActionMenu ? Div({
                                children: [ActionsMenu()],
                                style: { position: "relative" }
                            }) : null
                        ]
                    })
                ],
                align: RowAlign.SpaceBetween,
                style: {
                    padding: "10px",
                    color: 'white',
                    backgroundColor: Theme.Colors.PRIMARY
                }
            })
        ]
    })
}

const mapStateToProps = (state) => ({
    user: state.RUser.user,
    showActionMenu: state.RUI.showActionMenu
})

export default connect(mapStateToProps)(ToolBar);

