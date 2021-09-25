import Center from "jeddy/layouts/Center";
import Div from "jeddy/dom/Div";
import Card from "jeddy/widgets/Card";
import Input from "jeddy/dom/Input";
import Button from "jeddy/dom/Button";
import Row from "jeddy/layouts/Row";
import RowAlign from "jeddy/layouts/RowAlign";
import { connect, dispatch } from "jeddy/jredux";
import Label from "jeddy/dom/Label";
import Avator from "../Utils/Avator";
import { actions } from "../Reducers/RUser";
import { createUser } from "../Services/index";
const { handleDisplayName } = actions

const CreateUserInfo = ({ user, displayName }) => {
    return Div({
        children: [
            Center({
                child: Card({
                    children: [
                        Label({
                            children: [
                                Row({
                                    children: [
                                        Avator(user.photo)
                                    ],
                                    align: RowAlign.Center
                                })
                            ],
                            style: { cursor: "pointer" },
                            for: "profile-picture"
                        }),
                        Input({
                            type: "file",
                            accept: "image/*",
                            id: "profile-picture",
                            style: { visibility: "hidden" },
                            onChange: (e) => {
                                if (e.target.files.length > 0) {
                                    let file = e.target.files[0]
                                    let extension = file.name.split('.').pop()
                                    if (extension.toLowerCase() == "png" || extension.toLowerCase() == "jpg") {
                                        uploadProfilePicture(file, user)
                                    } else {
                                        swal("You can upload .png or .jpg only!")
                                    }
                                }
                            }
                        }),
                        Row({
                            children: [
                                Div({
                                    children: ["Display Name"],
                                    style: { color: "#AE5BC3", fontWeight: "bold", }
                                })],
                            align: RowAlign.Center
                        }),
                        Row({
                            children: [
                                Input({
                                    type: "text",
                                    placeholder: "Enter your display name",
                                    value: displayName,
                                    onKeyUp: (e) => dispatch(handleDisplayName(e.target.value)),
                                    style: {
                                        padding: "8px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        outline: 0
                                    }
                                })
                            ],
                            style: { margin: "20px 0" },
                            align: RowAlign.Center
                        }),
                        Row({
                            children: [
                                Button({
                                    children: ["FINISH"],
                                    style: {
                                        padding: "8px",
                                        border: 0,
                                        borderRadius: "20px",
                                        outline: 0,
                                        fontWeight: "bold",
                                        width: "150px",
                                        cursor: "pointer",
                                    },
                                    onClick: () => updateUserDiplyName(displayName, user)
                                })
                            ],
                            align: RowAlign.Center
                        })
                    ],
                    style: {
                        opacity: "0.9",
                        borderRadius: "8px",
                        position: "relative",
                        padding: "10px"
                    }
                })
            })
        ],
        style: { height: "100%" }
    })
}

const updateUserDiplyName = (displayName, user) => {
    if (displayName) {
        createUser({ ...user, displayName }).catch(_ => alert('Ooops!..Something went wrong'))
    }
}

const mapStateToProps = (state) => ({ ...state.RUser })

export default connect(mapStateToProps)(CreateUserInfo);