import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux"
import FlatButton from "../../Utils/FlatButton"
import Img from "jeddy/dom/Img";
import Row from "jeddy/layouts/Row";
import { actions } from "../../Reducers/RUI";
import { actions as gallaryActions } from "../../Reducers/RGallary";
import { GALLARY_TAB, PAGE } from "../../Services/constants";
import { swipeDetector } from "../../Utils/index"
const { setActivePage, setActiveGallaryTab } = actions
const { setSelectedMessage } = gallaryActions

const ImagesTab = ({ messages }) => {
    swipeDetector(GALLARY_TAB.IMAGES, onPageSwaped)
    return Div({
        children: [
            Row({
                children: messages.map(message => ImageItem(message)),
                wrapContent: true,
            })
        ],
        style: { marginTop: "8px", height: "90%", overflowY: "scroll" },
        id: GALLARY_TAB.IMAGES
    })
}


function onPageSwaped(eventType) {
    if (eventType == "swipeleft") {
        dispatch(setActiveGallaryTab(GALLARY_TAB.DOCUMENTS))
    }
}


const ImageItem = (message) => {
    return Div({
        children: [
            FlatButton({
                children: [Img({ src: message.content, width: "100%", height: "100%" })],
                onClick: () => {
                    dispatch(setSelectedMessage(message))
                    dispatch(setActivePage(PAGE.IMAGE_VIEW))
                },
            })
        ],
        style: { width: "33.3%", height: "33.3%" }
    })
}

const mapStateToProps = (state) => ({
    messages: state.RChatList.messages.filter(m => m.type.includes("image"))
})

export default connect(mapStateToProps)(ImagesTab);