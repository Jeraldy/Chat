import Row from "jeddy/layouts/Row";
import Div from "jeddy/dom/Div";
import Theme from "../../Utils/Theme";
import RowAlign from "jeddy/layouts/RowAlign";
import Center from "jeddy/layouts/Center";
import { dispatch } from "jeddy/jredux";
import { actions } from "../../Reducers/RChatList";
import Avator from "../../Utils/Avator";
import FlatButton from "../../Utils/FlatButton";
const { setSelectedFriend } = actions

export default (friend) => {
    return FlatButton({
        children:[
            Row({
                children: [
                    Avator(friend.image),
                    Div({
                        children: [
                            Row({
                                children: [
                                    Div({
                                        children: [friend.fullName],
                                        style: { fontWeight: "bold" }
                                    }),
                                    Div({
                                        children: ["23min"],
                                        style: { color: "#01BC48"}
                                    })
                                ],
                                align: RowAlign.SpaceBetween
                            }),
                            Row({
                                children: [
                                    Div({ children: ["hello how are you?"] }),
                                    Div({
                                        children: [ Center({ child: "10" }) ],
                                        style: {
                                            backgroundColor: "#01BC48",
                                            borderRadius: "100%",
                                            color: "white",
                                            height: "30px",
                                            width: "30px"
                                        }
                                    })
                                ],
                                align: RowAlign.SpaceBetween,
                                style: {
                                    marginTop: "4px"
                                }
                            })
                        ],
                        style: {
                            // backgroundColor: "red",
                            marginLeft: "10px",
                            width: "calc(100% - 60px)"
                        }
                    })
                ],
            })
        ],
        style: {
            padding: "8px",
            borderBottom: `1px solid ${Theme.Colors.LIGHT_GREY}`,
            width: "100%"
        },
        onClick: () => dispatch(setSelectedFriend(friend)),
    })
}