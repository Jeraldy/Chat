import Input from "jeddy/dom/Input";
import Theme from "../../Utils/Theme";
import Row from "jeddy/layouts/Row";
import Avator from "../../Utils/Avator";
import RowAlign from "jeddy/layouts/RowAlign";
import Button from "jeddy/dom/Button";
import { searchContact, fetchMessages } from "../../Services/index";
import { connect, dispatch } from "jeddy/jredux";
import { actions } from "../../Reducers/RChatList";
import { actions as userActions } from "../../Reducers/RUser"
import { genChatId } from "../../Utils/index";
import FlatButton from "../../Utils/FlatButton";
import Icons from "jeddy/utils/Icons";
import Icon from "jeddy/widgets/Icon";
import Div from "jeddy/dom/Div";
import swal from "sweetalert";

const { setSelectedFriend } = actions
const { toggleSearchContactForm } = userActions

const SearchContact = ({ contactSearchStatus, searchedContact, user, openSearchContactForm }) => {
    const displayName = searchedContact.displayName
    return Div({
        children: [
            openSearchContactForm ? Div({
                children: [
                    Row({
                        children: [
                            FlatButton({
                                children: [Icon({ name: Icons.highlight_off })],
                                onClick: () => dispatch(toggleSearchContactForm())
                            })
                        ],
                        align: RowAlign.End
                    }),
                    Row({
                        children: [Avator(searchedContact.photo)],
                        align: RowAlign.Center
                    }),
                    Row({
                        children: [displayName || contactSearchStatus || "Enter phone number"],
                        align: RowAlign.Center,
                        style: { paddingTop: "8px" }
                    }),
                    Row({
                        children: [
                            Input({
                                type: "text",
                                placeholder: "+255759000000",
                                style: {
                                    padding: "8px",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    border: 0,
                                    outline: 0
                                },
                                onKeyUp: (e) => {
                                    let phoneNumber = e.target.value
                                    if (phoneNumber.length == 13) {
                                        if (user.phoneNumber != phoneNumber) {
                                            searchContact(phoneNumber)
                                        } else {
                                            swal("Sorry this is your phone number!")
                                        }
                                    }
                                }
                            })
                        ],
                        align: RowAlign.Center,
                        style: { paddingTop: "8px" }
                    }),
                    displayName ? Row({
                        children: [
                            Button({
                                children: ["CONTINUE"],
                                style: {
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc"
                                },
                                onClick: () => {
                                    dispatch(toggleSearchContactForm())
                                    setTimeout(() => {
                                        dispatch(setSelectedFriend(searchedContact))
                                    }, 1000)
                                    const chatId = genChatId(searchedContact.uid, user.uid)
                                    fetchMessages(chatId, user.uid)
                                }
                            })
                        ],
                        align: RowAlign.Center,
                        style: { paddingTop: "8px" }
                    }) : null,
                ],
                style: {
                    borderRadius: "20px 20px 0 0",
                    backgroundColor: Theme.Colors.LIGHT_GREY,
                }
            }) : null
        ],
        style: {
            position: "absolute",
            bottom: openSearchContactForm ? 0 : "-150px",
            width: "calc(100% - 30px)",
            borderRadius: "20px 20px 0 0",
            margin: "0 15px 0 15px",
            padding: "5px 0 50px 0",
            backgroundColor: Theme.Colors.LIGHT_GREY,
            transition: "bottom .5s",
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            border: "1px solid #ccc"
        }
    })
}

const mapStateToProps = (state) => ({
    contactSearchStatus: state.RUser.contactSearchStatus,
    searchedContact: state.RUser.searchedContact,
    user: state.RUser.user,
    openSearchContactForm: state.RUser.openSearchContactForm
})

export default connect(mapStateToProps)(SearchContact);