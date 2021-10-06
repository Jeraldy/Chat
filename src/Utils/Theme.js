import { getStableColor } from "./index"

let uid = localStorage.getItem('uid')
export default {
    Colors: {
        LIGHT_GREY: "#F5F5F5",
        PRIMARY: getStableColor(uid),
        SECONDARY: "#AD1457"//getStableColor(`${uid}_sec`)
    }
}
