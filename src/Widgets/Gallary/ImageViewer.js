import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux";
import Icons from "jeddy/utils/Icons";
import Icon from "jeddy/widgets/Icon";
import Card from "jeddy/widgets/Card";
import FlatButton from "../../Utils/FlatButton";
import Row from "jeddy/layouts/Row";
import RowAlign from "jeddy/layouts/RowAlign";
import Center from "jeddy/layouts/Center";
import Avator from "../../Utils/Avator";
import Img from "jeddy/dom/Img";
import { PAGE } from "../../Services/constants";
import { actions } from "../../Reducers/RUI";
import { scrollToMessage } from "../../Utils/index";

const { setActivePage } = actions

const ImageViewer = ({ selectedFriend, message }) => {
    return Div({
        children: [
            ActionBar(selectedFriend, message),
            DisplayImage(message)
        ],
        style: { position: "relative", height: "100%", backgroundColor: "black" }
    })
}

const style = { color: "white" }
const ActionBar = (selectedFriend, message) => {
    return Card({
        children: [
            Row({
                children: [
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.arrow_back, style })],
                                onClick: () => {
                                    dispatch(setActivePage(PAGE.CHAT_ROOM))
                                    scrollToMessage(message)
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
                            FlatButton({
                                children: [
                                    Icon({
                                        name: Icons.star_border,
                                        style: { color: "white" }
                                    })
                                ],
                                onClick: () => {
                                }
                            }),
                            FlatButton({
                                children: [
                                    Icon({
                                        name: Icons.file_download,
                                        style: { transform: "scale(-1, 1)", color: "white" }
                                    })
                                ],
                                onClick: () => {
                                }
                            }),
                            FlatButton({
                                children: [
                                    Icon({
                                        name: Icons.reply,
                                        style: { transform: "scale(-1, 1)", color: "white" }
                                    })
                                ],
                                onClick: () => {
                                }
                            }),
                        ]
                    })
                ],
                align: RowAlign.SpaceBetween
            })
        ],
        style: { padding: "8px", backgroundColor: "#424242", color: "white" }
    })
}

const DisplayImage = (message) => {
    if (!message.content) {
        return
    }
    return Img({ src: message.content, width: "100%" })
}

const mapStateToProps = (state) => ({
    selectedFriend: state.RChatList.selectedFriend,
    message: state.RGallary.selectedMessage
})

export default connect(mapStateToProps)(ImageViewer);