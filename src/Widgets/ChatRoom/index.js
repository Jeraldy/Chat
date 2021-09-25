import Div from "jeddy/dom/Div"
import ChatBar from "./ChatBar"
import BGImage from "../../Assets/chatbg.png";
import { connect } from "jeddy/jredux";
import MessageList from "./MessageList";
import MessageBox from "./MessageBox";
import ActionBar from "./ActionBar";

const ChatRoom = ({ selectedFriend, showActionBar }) => {
    return Div({
        children: [
            showActionBar ? ActionBar(selectedFriend) : ChatBar(selectedFriend),
            Div({
                children: [MessageList(), MessageBox()],
                style: {
                    background: `url(${BGImage})`,
                    position: "absolute",
                    bottom: 0,
                    top: '50px',
                    width: "99%",
                    backgroundColor: "#E5DDD5"
                }
            }),
        ]
    })
}


const mapStateToProps = (state) => {
    return {
        selectedFriend: state.RChatList.selectedFriend,
        showActionBar: state.RChatList.showActionBar
    }
}

export default connect(mapStateToProps)(ChatRoom)

