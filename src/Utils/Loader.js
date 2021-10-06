import Div from "jeddy/dom/Div";
import Center from "jeddy/layouts/Center";
import '../Css/loader.css';

export default () => {
    return Div({
        children: [
            Center({ child: Div({ class: "loader" }) })
        ],
        style: { height: "200px", width: "200px" }
    })
}