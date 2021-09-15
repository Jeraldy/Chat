import Img from "jeddy/dom/Img";
import PROFILE_PICTURE from "../Assets/profile.png";

export default (img)=>{
    return Img({
        src: img || PROFILE_PICTURE,
        style: {
            height: "35px",
            width: "35px",
            borderRadius: "100%",
            backgroundColor: "#ccc"
        }
    })
}