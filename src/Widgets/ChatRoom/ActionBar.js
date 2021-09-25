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
import swal from 'sweetalert';
import { deleteMessage, deleteMessageForAll } from '../../Services/index';
const { toggleActionBar, handleRepliedMessage } = actions

const ActionBar = ({ selectedMessages, user }) => {
    const selectedMessage = selectedMessages[0] || {}
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
                            // FlatButton({
                            //     children: [Icon({ name: Icons.bookmark_border })],
                            //     onClick: () => {
                            //         console.log("HELLO EVERY ONE...")
                            //     }
                            // }),
                            FlatButton({
                                children: [Icon({ name: Icons.delete })],
                                onClick: () => _deleteMessage(selectedMessages, user.uid)
                            }),
                            // FlatButton({
                            //     children: [Icon({ name: Icons.content_copy })],
                            // }),
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

function _deleteMessage(selectedMessages, uid) {
    let isMyMessages = selectedMessages.filter(m => m.senderId == uid)

    if (isMyMessages.length == selectedMessages.length) {
        swal("Delete for YOU or ALL?", {
            buttons: {
                cancel: true,
                catch: {
                    text: "ME",
                    value: "ME",
                },
                defeat: {
                    text: "ALL",
                    value: "ALL",
                },
            },
        }).then((target) => {
            switch (target) {
                case "ALL":
                    _delete(selectedMessages, target, uid)
                    break;

                case "ME":
                    _delete(selectedMessages, target, uid);
                    break;

                default:
                    break
            }
        });
    } else {
        _delete(selectedMessages, "ME", uid)
    }
}


function _delete(selectedMessages, target, uid) {
    swal("Are you sure?", {
        buttons: ["CANCEL", "DELETE"],
    }).then(value => {
        if (value) {
            selectedMessages.forEach(message => {
                if (target == "ALL") {
                    deleteMessageForAll(message)
                } else {
                    deleteMessage(message, uid)
                }
            })
            dispatch(toggleActionBar(null))
        }
    });
}

const mapStateToProps = (state) => {
    return {
        selectedMessages: state.RChatList.selectedMessages,
        user: state.RUser.user
    }
}
export default connect(mapStateToProps)(ActionBar);

