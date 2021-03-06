import DEFAULT_PROFILE_PICTURE from "../Assets/profile.png";
import Html from "jeddy/utils/Html";
import { PAGE } from "../Services/constants";
import Hammer from "hammerjs"
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

export const renderDate = (date) => {
    if (isToDay(date)) {
        return "TODAY"
    } else if (isYestaday(date)) {
        return "YESTERDAY"
    }
    return date
}

export const Emojis = () => {
    return ['????', '????', '??????', '????', '????', '????', '????', '????']
}

export const sanitizeDates = (item) => {
    try {
        item.seenMembers = item.seenMembers.map((m) => {
            let _date = m.seenAt
            m.seenAt = toSringDate(_date)
            m.seenAtHrs = new Date(_date).toLocaleString('en-US', {
                hour: 'numeric', minute: 'numeric', hour12: true
            })
            return m
        })
        let date = item.createdAt.toDate()
        item._createdAt = toSringDate(date)
        item._createdAt2 = convertDate(date)
        item._createdAtHrs = date.toLocaleString('en-US', {
            hour: 'numeric', minute: 'numeric', hour12: true
        })
        delete item.createdAt
    } catch (e) { }
    return item;
}

export const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

export const randomColor = () => {
    const colors = ["#00A8F2", "#1e88e5", "#c62828", "#ad1457", "#6a1b9a",
        "#4527a0", "#283593", "#1565c0", "#039be5", "#00acc1", "#00897b", "#ef6c00", "#f4511e",
        "#546e7a"
    ]
    let index = parseInt(getRandomArbitrary(0, colors.length))
    return colors[index]
}

let stableColors = {}
export const getStableColor = (key) => {
    if (stableColors[key]) {
        return stableColors[key]
    }
    let color = randomColor()
    stableColors[key] = color
    return color
}

export const scrollToMessage = (message) => {
    let el = document.getElementById(message.id)
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
        let ofs = 0;
        let blinker = setInterval(function () {
            el.style.backgroundColor = 'rgba(187, 222, 251,' + Math.abs(Math.sin(ofs)) + ')';
            ofs += 0.01;
            if (ofs > 5) {
                window.clearInterval(blinker)
                el.style.backgroundColor = ""
            }
        }, 5);
    }
}

export const toggleZooming = (page) => {
    let vport = document.getElementById("vport")
    let content = "width=device-width, maximum-scale=1.0"
    if (page == PAGE.IMAGE_VIEW) {
        content = "width=device-width, scale=1.0"
    }
    vport.setAttribute("content", content)
}

export const swipeDetector = (id, callback) => {
    setTimeout(() => {
        let el = document.getElementById(id)
        if (el) {
            var mc = new Hammer(el);
            mc.on("swipe swipeleft swiperight", (ev) => callback(ev.type));
        }
    }, 100)
}