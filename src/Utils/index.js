import DEFAULT_PROFILE_PICTURE from "../Assets/profile.png";
import Html from "jeddy/utils/Html";

export const PROFILE_PICTURE = DEFAULT_PROFILE_PICTURE;
export const randomId = (length = 10) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const validURL = (str) => {
    return str.startsWith("http://")
        || str.startsWith("https://")
}

export const genChatId = (p1, p2) => {
    let p = [p1, p2].sort()
    return `${p[0]}_${p[1]}`
}

export const convertDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear().toString().substring(2, 4)].join('/')
}

export const toSringDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    return `${mo} ${pad(d.getDate())}, ${d.getFullYear()}`
}

export const isToDay = (date) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date()
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    return `${mo} ${pad(d.getDate())}, ${d.getFullYear()}` == date
}

export const isYestaday = (date) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date()
    d.setDate(d.getDate() - 1);
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    return `${mo} ${pad(d.getDate())}, ${d.getFullYear()}` == date
}


export const updateScroll = () => {
    setTimeout(() => {
        try {
            let element = document.getElementById("chat-list");
            if (element) {
                element.scrollTop = element.scrollHeight;
            }
        } catch (e) { }
    }, 500)
}

export const renderMsg = (str) => {
    str = str.replace(/\*{1,2}(.*?)\*{1,2}/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/(?:\r\n|\r|\n)/g, '<br>')
    return Html(str)
}

export const chatDateSticky = () => {
    var box = document.getElementById('March 04, 2021');
    var top = box.offsetTop;
    var scrollEl = document.getElementById("chat-list")
    var y = scrollEl.scrollTop;

    console.log(top)
    console.log(y)
    function scroll() {
        if (y >= top) box.classList.add('stick');
        else box.classList.remove('stick');
    }
    scrollEl.addEventListener('scroll', scroll);
}

export const scrollListerner = () => {
    var scrollEl = document.getElementById("chat-list")
    function scroll() {
        // console.log(y)
    }
    scrollEl.addEventListener('scroll', scroll);
}
