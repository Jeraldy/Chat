import { connect, dispatch } from "jeddy/jredux";
import FlatButton from "../../Utils/FlatButton";
import Theme from "../../Utils/Theme";
import { actions } from "../../Reducers/RUI";

const { setActiveGallaryTab } = actions

const Tab = ({ activeGallaryTab }, label) => {
    const active = activeGallaryTab == label
    const color = active ? Theme.Colors.PRIMARY : "white"
    return FlatButton({
        children: [label],
        onClick: () => dispatch(setActiveGallaryTab(label)),
        style: {
            fontWeight: "bold",
            height: "40px",
            borderBottom: `3px solid ${color}`,
            width: "33.3%",
        }
    })
}

const mapStateToProps = (state) => ({
    activeGallaryTab: state.RUI.activeGallaryTab
})

export default connect(mapStateToProps)(Tab)
