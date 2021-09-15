import Button from "jeddy/dom/Button";

const FlatButton = (props) => {
    const style = props.style || {}
    const _class = props.class || 0
    return Button({
        ...props,
        style: {
            backgroundColor: _class ? "" : "transparent",
            border: 0,
            outline: 0,
            color: "#9e9e9e",
            cursor: "pointer",
            ...style
        },
    })
}

export default FlatButton;