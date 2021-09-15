import Div from "jeddy/dom/Div"
import Row from "jeddy/layouts/Row"
import FlatButton from "../../Utils/FlatButton"
import Label from "jeddy/dom/Label"
import Icons from "jeddy/utils/Icons"
import Icon from "jeddy/widgets/Icon";
import { connect, dispatch } from "jeddy/jredux"
import RowAlign from "jeddy/layouts/RowAlign"
import Input from "jeddy/dom/Input";
import { actions } from "../../Reducers/RChatList"
import TextArea from "jeddy/dom/TextArea";
import ReplyMessageUI from "../../Utils/ReplyMessageUI"

const { handleTextMessage } = actions

const MessageBox = ({ textMessage, repliedMessage, fileToUpload }) => {
    return Div({
        children: [
            ReplyMessageUI(repliedMessage, true),
            ReplyMessageUI(fileToUpload, true),
            Row({
                children: [
                    LeftActions(),
                    TextArea({
                        value: textMessage,
                        style: {
                            width: "100%",
                            outline: 0,
                            paddingTop: "8px",
                            paddingLeft: "15px",
                            border: 0,
                            overflow: "hidden",
                            resize: "none",
                            height: "25px",
                        },
                        placeholder: "Type a message",
                        onKeyUp: (e) => {
                            dispatch(handleTextMessage(e.target.value))
                            e.target.style.height = "5px"
                            e.target.style.height = `${e.target.scrollHeight}px`
                        },
                    }),
                    FlatButton({
                        children: [
                            Icon({
                                name: Icons.send,
                                //style: { color: "#BF962D" }
                            })
                        ],
                    })
                ],
                align: RowAlign.SpaceBetween,
            })
        ],
        style: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "white"
        }
    })
}


function LeftActions() {
    return Row({
        children: [
            Row({
                children: [
                    FlatButton({
                        children: ["🙂"],
                        style: { fontSize: "18px" },
                    }),
                    FlatButton({
                        children: [
                            Label({
                                for: "attach-file",
                                children: [
                                    Icon({
                                        name: Icons.attach_file,
                                        style: {
                                            transform: 'rotate(45deg)',
                                            cursor: "pointer",
                                            //color: "#BF962D"
                                        }
                                    })
                                ],
                            })
                        ]
                    }),
                ]
            }),
            Input({
                type: "file",
                id: "attach-file",
                style: { visibility: "hidden" },
                onChange: (e) => {

                }
            }),
        ],
        style: { width: "40px", marginRight: "15px" }
    })
}


const mapStateToProps = (state) => {
    return {
        textMessage: state.RChatList.textMessage,
        fileToUpload: state.RChatList.fileToUpload,
        repliedMessage: state.RChatList.repliedMessage
    }
}

export default connect(mapStateToProps)(MessageBox)

