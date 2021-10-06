import Div from "jeddy/dom/Div";
import Center from "jeddy/layouts/Center";

const LoginPage = () => {
    return Div({
        children: [
            Center({
                child: Div({
                    children: [
                        Div({ id: "signIn" })
                    ]
                })
            })
        ],
        style: {
            height: "100%",
            width: "100%",
            backgroundColor: "white",
        }
    })
}

export default LoginPage;