import { connect } from "jeddy/jredux";
import LoginPage from "./Widgets/LoginPage";
import CreateUserInfo from "./Widgets/CreateUserInfo";
import Router from "./Router";

const App = ({ user }) => {
    if (!user) {
        return LoginPage()
    }
    if (!user.displayName) {
        return CreateUserInfo()
    }
    return Router()
}

const mapStateToProps = (state) => ({ user: state.RUser.user })

export default connect(mapStateToProps)(App)