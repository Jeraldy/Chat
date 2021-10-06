import Div from "jeddy/dom/Div"
import Card from "jeddy/widgets/Card";
import Row from "jeddy/layouts/Row";
import FlatButton from "../../Utils/FlatButton";
import Icon from "jeddy/widgets/Icon";
import Icons from "jeddy/utils/Icons";
import { dispatch, connect } from "jeddy/jredux";
import { actions } from "../../Reducers/RUI";
import { actions as chatListActions } from "../../Reducers/RChatList";
import { PAGE } from "../../Services/constants";
import Theme from "../../Utils/Theme";
import SearchContactList from "./SearchContactList";
import Input from "jeddy/dom/Input";

const { setActivePage } = actions
const { handleSearchQuery } = chatListActions

const SearchMyContact = ({ }) => {
    return Div({
        children: [ActionBar(), SearchContactList()],
        style: { position: "relative", height: "100%" }
    })
}

const mapStateToProps = (state) => ({ ...state.RGroup })

const ActionBar = () => {
    focusInput()
    return Card({
        children: [
            Row({
                children: [
                    FlatButton({
                        children: [Icon({ name: Icons.arrow_back, style: { color: "#fff" } })],
                        onClick: () => dispatch(setActivePage(PAGE.HOME))
                    }),
                    Input({
                        type: "text",
                        id: "search-input",
                        onKeyUp: (e) => dispatch(handleSearchQuery(e.target.value)),
                        style: {
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            outline: 0,
                            border: 0,
                            marginLeft: "15px"
                        }
                    }),
                ]
            }),
        ],
        style: { padding: "8px", backgroundColor: Theme.Colors.PRIMARY, color: "white" }
    })
}

function focusInput() {
    setTimeout(() => {
        let el = document.getElementById("search-input")
        if(el){
            el.focus()
        }
    }, 100)
}

export default connect(mapStateToProps)(SearchMyContact);