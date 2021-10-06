import Img from "jeddy/dom/Img";
import PROFILE_PICTURE from "../Assets/profile.png";
import Div from "jeddy/dom/Div";
import Center from "jeddy/layouts/Center";
import { getStableColor } from "./index";

export default (img, Name) => {
    const _Name = (Name || "").trim()
    if (!img && _Name) {
        return Div({
            children: [Center({ child: _Name[0].toUpperCase() })],
            style: {
                height: "40px",
                width: "40px",
                borderRadius: "100%",
                backgroundColor: getStableColor(Name),
                fontWeight: "bold",
                color: "white"
            }
        })
    }
    return Img({
        src: img || PROFILE_PICTURE,
        style: {
            height: "40px",
            width: "40px",
            borderRadius: "100%",
            backgroundColor: "#ccc",
            backgroundSize: "contain"
        }
    })
}
