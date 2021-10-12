import Row from 'jeddy/layouts/Row';
import RowAlign from 'jeddy/layouts/RowAlign';
import Div from 'jeddy/dom/Div';
import Theme from '../../Utils/Theme';
import Icon from 'jeddy/widgets/Icon';
import Icons from "jeddy/utils/Icons";
import FlatButton from '../../Utils/FlatButton';
import Center from "jeddy/layouts/Center";
import { dispatch } from 'jeddy/jredux';
import { actions } from '../../Reducers/RChatList';
import { actions as UIActions } from '../../Reducers/RUI';
import Avator from '../../Utils/Avator';
import Card from "jeddy/widgets/Card";
import { PAGE } from '../../Services/constants';
import MoreAction from './MoreAction';
const { setSelectedFriend } = actions
const { toggleChatActionMenu, setActivePage } = UIActions

const style = { color: "white" }

const ChatBar = (selectedFriend) => {
    return Card({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.arrow_back, style })],
                                onClick: () => {
                                    dispatch(setActivePage(PAGE.HOME))
                                    dispatch(setSelectedFriend(null))
                                }
                            }),
                            Avator(selectedFriend.image),
                            Div({
                                children: [Center({ child: selectedFriend.displayName, })],
                                style: { paddingLeft: "8px", ...style }
                            })
                        ],
                    }),
                    Row({
                        children: [
                            // FlatButton({
                            //     children: [Icon({ name: Icons.videocam, style }),],
                            // }),
                            // FlatButton({
                            //     children: [Icon({ name: Icons.call, style }),],
                            // }),
                            FlatButton({
                                children: [
                                    Icon({ name: Icons.more_horiz, style }),
                                ],
                                style: { marginRight: "10px", },
                                onClick: () => dispatch(toggleChatActionMenu())
                            }),
                            Div({
                                children: [MoreAction()],
                                style: { position: "relative" }
                            })
                        ]
                    })
                ],
                align: RowAlign.SpaceBetween,
            })
        ],
        style: {
            padding: "5px",
            position: "fixed",
            width: "100%",
            paddingLeft: "0px",
            backgroundColor: Theme.Colors.PRIMARY,
            zIndex: 11
        }
    })
}

export default ChatBar;

