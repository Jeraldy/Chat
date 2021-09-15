import Row from 'jeddy/layouts/Row';
import RowAlign from 'jeddy/layouts/RowAlign';
import Div from 'jeddy/dom/Div';
import Theme from '../../Utils/Theme';
import Icon from 'jeddy/widgets/Icon';
import Icons from "jeddy/utils/Icons";
import FlatButton from '../../Utils/FlatButton';
import Center from "jeddy/layouts/Center";
import { dispatch, connect } from 'jeddy/jredux';
import { actions } from '../../Reducers/RChatList';
import Card from "jeddy/widgets/Card";
const { toggleActionBar, handleRepliedMessage } = actions

const ActionBar = ({ selectedMessages, messages }) => {
    const selectedMessage = messages.filter(a => a.messageId == selectedMessages[0])[0]
    return Card({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.close })],
                                onClick: () => dispatch(toggleActionBar(null))
                            }),
                            Div({
                                children: [Center({ child: `${selectedMessages.length}` })],
                                style: { paddingLeft: "8px" }
                            })
                        ],
                    }),
                    Row({
                        children: [
                            selectedMessages.length == 1 ? FlatButton({
                                children: [Icon({ name: Icons.reply })],
                                onClick: () => {
                                    dispatch(handleRepliedMessage(selectedMessage))
                                    dispatch(toggleActionBar())
                                }
                            }) : null,
                            FlatButton({
                                children: [Icon({ name: Icons.star_border })],
                            }),
                            FlatButton({
                                children: [Icon({ name: Icons.delete })],
                            }),
                            FlatButton({
                                children: [Icon({ name: Icons.content_copy })],
                            }),
                            FlatButton({
                                children: [
                                    Icon({
                                        name: Icons.reply,
                                        style: { transform: "scale(-1, 1)" }
                                    })
                                ],
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


const mapStateToProps = (state) => {
    return {
        selectedMessages: state.RChatList.selectedMessages,
        messages: state.RChatList.messages
    }
}
export default connect(mapStateToProps)(ActionBar);

