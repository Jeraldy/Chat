import { Jeddy, StatefulWidget } from "jeddy";
import reducers from './Reducers/index';
import { updateState } from "jeddy/jredux";
import App from "./App";
import UserAuth from "./UserAuth";

class Main extends StatefulWidget {
    constructor(props) {
        super(props)
    }

    connectedCallBack() {
        updateState(this)
        UserAuth()
    }
    
    render() { return App() }
}

Jeddy.Init({ app: new Main({ reducers }) });
