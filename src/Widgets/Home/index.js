import { PAGE } from "../../Services/constants";
import CreateGroup from "../ToolBar/CreateGroup";
import ContactList from "./ContactList";
import { connect } from "jeddy/jredux";
import CreateGroup2 from "../ToolBar/CreateGroup2";


const Home = ({ activePage }) => {
    return MainContent(activePage)
}

function MainContent(page) {
    switch (page) {
        case PAGE.CREATE_GROUP:
            return CreateGroup()
        case PAGE.CREATE_GROUP2:
            return CreateGroup2()
    }
    return ContactList()
}

export default connect((state) => ({ ...state.RUI }))(Home);
