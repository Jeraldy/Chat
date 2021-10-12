import { dispatch } from "jeddy/jredux";
import Row from "jeddy/layouts/Row";
import RowAlign from "jeddy/layouts/RowAlign";
import Icons from "jeddy/utils/Icons";
import FlatButton from "../../Utils/FlatButton";
import Theme from "../../Utils/Theme";
import Icon from "jeddy/widgets/Icon";
import Card from "jeddy/widgets/Card";
import { actions } from "../../Reducers/RUI";
import { GALLARY_TAB, PAGE } from "../../Services/constants";
import Tab from "./Tab";

const { setActivePage } = actions

const TabActionBar = () => {
    return Card({
        children: [
            Row({
                children: [
                    FlatButton({
                        children: [Icon({ name: Icons.arrow_back })],
                        onClick: () => dispatch(setActivePage(PAGE.CHAT_ROOM))
                    }),
                ],
            }),
            Row({
                children: [Tab(GALLARY_TAB.IMAGES), Tab(GALLARY_TAB.DOCUMENTS), Tab(GALLARY_TAB.LINKS)],
                align: RowAlign.SpaceEvenly,
            })
        ],
        style: { backgroundColor: "white", paddingTop: "8px" }
    })
}

export default TabActionBar;