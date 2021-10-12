import Div from "jeddy/dom/Div"
import TabActionBar from "./TabActionBar";
import TabSwitcher from "./TabSwitcher";

const Gallary = () => {
    return Div({
        children: [TabActionBar(), TabSwitcher()],
        style: { position: "relative", height: "100%" }
    })
}

export default Gallary;