import Div from "jeddy/dom/Div"
import { connect, dispatch } from "jeddy/jredux";
import Icons from "jeddy/utils/Icons";
import Icon from "jeddy/widgets/Icon";
import FlatButton from "../../Utils/FlatButton";
import Center from "jeddy/layouts/Center";
import Img from "jeddy/dom/Img";
import { GALLARY_TAB, PAGE } from "../../Services/constants";
import { actions } from "../../Reducers/RUI";

const { setActivePage, setActiveGallaryTab } = actions

const ImageViewer = ({ message }) => {
    return Div({
        children: [ActionBar(), DisplayImage(message)],
        style: { position: "relative", height: "100%", backgroundColor: "black" }
    })
}

const ActionBar = () => {
    return FlatButton({
        children: [Icon({ name: Icons.close, style: { color: "white" } })],
        onClick: () => {
            dispatch(setActivePage(PAGE.GALLARY))
            dispatch(setActiveGallaryTab(GALLARY_TAB.IMAGES))
        },
        style: { position: "absolute", top: "13px", left: "13px" }
    })
}

const DisplayImage = (message) => {
    if (!message.content) return
    return Div({
        children: [
            Center({ child: Img({ src: message.content, width: "100%" }) })
        ],
        style: { height: "100%" }
    })
}

const mapStateToProps = (state) => ({
    message: state.RGallary.selectedMessage,
})

export default connect(mapStateToProps)(ImageViewer);