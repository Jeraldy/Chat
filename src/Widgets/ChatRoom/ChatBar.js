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
import Avator from '../../Utils/Avator';
import Card from "jeddy/widgets/Card";
const { setSelectedFriend } = actions

const ChatBar = (selectedFriend) => {
    return Card({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.arrow_back })],
                                onClick: () => dispatch(setSelectedFriend(null))
                            }),
                            Avator(selectedFriend.image),
                            Div({
                                children: [Center({ child: selectedFriend.fullName })],
                                style: { paddingLeft: "8px" }
                            })
                        ],
                    }),
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.videocam }),],
                            }),
                            FlatButton({
                                children: [Icon({ name: Icons.call }),],
                            }),
                            FlatButton({
                                children: [Icon({ name: Icons.more_vert }),],
                                style: { marginRight: "10px", }
                            }),
                        ]
                    })
                ],
                align: RowAlign.SpaceBetween,
                style: {
                    padding: "10px",
                    backgroundColor: Theme.Colors.LIGHT_GREY,
                    position: "fixed",
                    width: "100%",
                    paddingLeft: "0px"
                }
            })
        ]
    })
}

export default ChatBar;

