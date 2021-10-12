import Div from "jeddy/dom/Div"
import { connect } from "jeddy/jredux"
import { GALLARY_TAB } from "../../Services/constants"
import DocsTab from "./DocsTab"
import ImagesTab from "./ImagesTab"
import LinksTab from "./LinksTab"

const TabSwitecher = ({ activeGallaryTab }) => {
    switch (activeGallaryTab) {
        case GALLARY_TAB.IMAGES:
            return ImagesTab()
        case GALLARY_TAB.DOCUMENTS:
            return DocsTab()
        case GALLARY_TAB.LINKS:
            return LinksTab()
    }
}

const mapStateToProps = (state) => ({
    activeGallaryTab: state.RUI.activeGallaryTab
})

export default connect(mapStateToProps)(TabSwitecher)