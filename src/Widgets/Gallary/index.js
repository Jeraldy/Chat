import Div from "jeddy/dom/Div"
import { connect } from "jeddy/jredux";

const Gallary = () => {
    return Div({
        children: [
           
        ],
        style: { position: "relative", height: "100%" }
    })
}

const mapStateToProps = (state) => ({ ...state.RGroup })

export default connect(mapStateToProps)(Gallary);