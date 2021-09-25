import { firebase } from "@firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import { TABLE } from "./constants";
import { dispatch } from 'jeddy/jredux';
import { actions } from "../Reducers/RUser";
import { actions as ListActions } from "../Reducers/RChatList";
import { toSringDate, convertDate, genChatId, randomId, updateScroll } from "../Utils/index";
import RING_TONE from "../Assets/ring_tone.mp3";

const { fetchMessagesSuccess, toggleUploadState, updateUploadProgress } = ListActions
const { setUserInfo,
    setUserContacts,
    updateContactLastMessage,
    updateContactUnSeenMessages,
    searchContactStatus,
    setSearchedContact
} = actions

export const fetchUserInfo = (user) => {
    const db = firebase.firestore()
    db.collection(TABLE.USERS).doc(user.uid).onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
            dispatch(setUserInfo({ ...data }))
            if (data.contacts.length > 0) {
                fetchUserContacts(data)
            }
        } else {
            dispatch(setUserInfo(user))
        }
    });
}

export const createUser = (user) => {
    const db = firebase.firestore()
    return db.collection(TABLE.USERS)
        .doc(user.uid)
        .set({ ...user, contacts: [] })
}

const fetchUserContacts = (user) => {
    const db = firebase.firestore()
    const query = db.collection(TABLE.USERS).where('uid', 'in', user.contacts)
    let items = []
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                items = items.filter(item => item.id != change.doc.id)
            } else {
                let item = change.doc.data();
                item.type = "contact"
                let id = change.doc.id
                if (items.filter(item => item.id == id).length == 0) {
                    items.push({ ...item, id })
                } else {
                    let index = items.findIndex(item => item.id == id)
                    items[index] = { ...item, id }
                }
            }
        });
        dispatch(setUserContacts([...items]))
        items.forEach(c => {
            getUnseenMessages(genChatId(c.uid, user.uid), user)
            getLastMessage(genChatId(c.uid, user.uid), user)
        })
    });
}//787540215

const getUnseenMessages = (chatId, user) => {
    const { uid } = user
    const db = firebase.firestore()
    const query = db.collection(TABLE.MESSAGES)
        .where("chatId", '==', chatId)
        .where("seen", '==', false)
        .where("senderId", "!=", uid)
    let items = []
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                items = items.filter(item => item.id != change.doc.id)
            } else {
                let item = change.doc.data();
                let id = change.doc.id
                try {
                    let date = item.createdAt.toDate()
                    item.date = date.toString()
                    item._createdAt = toSringDate(date)
                    item._createdAt2 = convertDate(date)
                    item._createdAtHrs = date.toLocaleString('en-US', {
                        hour: 'numeric', minute: 'numeric', hour12: true
                    })
                    delete item.createdAt
                } catch (e) { }
                if (items.filter(item => item.id == id).length == 0) {
                    items.push({ ...item, id })
                    let audio = new Audio(RING_TONE);
                    audio.play();
                } else {
                    let index = items.findIndex(item => item.id == id)
                    items[index] = { ...item, id }
                }
            }
        });
        dispatch(updateContactUnSeenMessages({ uid, chatId, newMessages: [...items] }))
    });
}

const getLastMessage = (chatId, user) => {
    const { uid } = user
    const db = firebase.firestore()
    const query = db.collection(TABLE.MESSAGES)
        .where("chatId", '==', chatId)
        .where("members", "array-contains", uid)
        .orderBy("createdAt", "asc")
        .limitToLast(1)
    let items = []
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                items = items.filter(item => item.id != change.doc.id)
            } else {
                let item = change.doc.data();
                let id = change.doc.id
                try {
                    let date = item.createdAt.toDate()
                    item.date = date.toString()
                    item._createdAt = toSringDate(date)
                    item._createdAt2 = convertDate(date)
                    item._createdAtHrs = date.toLocaleString('en-US', {
                        hour: 'numeric', minute: 'numeric', hour12: true
                    })
                    delete item.createdAt
                } catch (e) { }
                if (items.filter(item => item.id == id).length == 0) {
                    items.push({ ...item, id })
                } else {
                    let index = items.findIndex(item => item.id == id)
                    items[index] = { ...item, id }
                }
            }
        });
        dispatch(updateContactLastMessage({ uid, chatId, lastChat: items[0] }))
    });
}

export const fetchMessages = (chatId, uid) => {
    const db = firebase.firestore()
    const query = db.collection(TABLE.MESSAGES)
        .where("chatId", '==', chatId)
        .where("members", "array-contains", uid)
        .orderBy("createdAt", "asc")
    let items = []
    query.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'removed') {
                items = items.filter(item => item.id != change.doc.id)
            } else {
                let item = change.doc.data();
                let id = change.doc.id
                try {
                    let date = item.createdAt.toDate()
                    item._createdAt = toSringDate(date)
                    item._createdAt2 = convertDate(date)
                    item._createdAtHrs = date.toLocaleString('en-US', {
                        hour: 'numeric', minute: 'numeric', hour12: true
                    })
                    delete item.createdAt
                } catch (e) {
                    //Date is not available yet
                }
                if (items.filter(item => item.id == id).length == 0) {
                    items.push({ ...item, id })
                } else {
                    let index = items.findIndex(item => item.id == id)
                    items[index] = { ...item, id }
                }
            }
        });
        dispatch(fetchMessagesSuccess([...items]))
        updateScroll()
    });
}

export const deleteMessage = (message, userId) => {
    const db = firebase.firestore()
    return db.collection(TABLE.MESSAGES)
        .doc(message.id)
        .update({ members: message.members.filter(uid => uid != userId) })
}

export const deleteMessageForAll = (message) => {
    const db = firebase.firestore()
    return db.collection(TABLE.MESSAGES).doc(message.id).delete()
}

export const sendMessage = (message) => {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp()
    const db = firebase.firestore()
    return db.collection(TABLE.MESSAGES).add({ ...message, createdAt })
}

export const updateSeen = (seenMessages) => {
    const db = firebase.firestore()
    seenMessages.forEach(message => {
        db.collection(TABLE.MESSAGES)
            .doc(message.id)
            .update({ seen: true })
    })
}

export const uploadFile = (file, message) => {
    const storageRef = firebase.storage().ref();
    dispatch(toggleUploadState())
    const uploadTask = storageRef.child(`uploads/${randomId()}_${file.name}`).put(file);
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            dispatch(updateUploadProgress(progress))
        },
        () => { },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                message.type = file.type || file.name.split('.').pop()
                message.size = file.size
                message.content = downloadURL
                message.fileName = file.name
                sendMessage(message)
            });
            dispatch(toggleUploadState())
        }
    );
}

export const searchContact = (phoneNumber) => {
    dispatch(searchContactStatus("Searching..."))
    dispatch(setSearchedContact({}))
    const db = firebase.firestore()
    db.collection(TABLE.USERS)
        .where('phoneNumber', '==', phoneNumber)
        .get()
        .then(result => {
            if (!result.empty) {
                const user = result.docs[0].data()
                dispatch(searchContactStatus(null))
                dispatch(setSearchedContact({ ...user }))
            } else {
                dispatch(setSearchedContact({}))
                dispatch(searchContactStatus("Not Found"))
            }
        }).catch(_ => {
            dispatch(searchContactStatus("Fail"))
        })
}

export const addToTheirContact = (selectedContact, user) => {
    const db = firebase.firestore()
    const contacts = [user.uid, ...(selectedContact.contacts || [])]
    return db.collection(TABLE.USERS)
        .doc(selectedContact.uid)
        .update({ contacts })
}

export const addToMyContact = (selectedContact, user) => {
    const db = firebase.firestore()
    const contacts = [selectedContact.uid, ...(user.contacts || [])]
    return db.collection(TABLE.USERS)
        .doc(user.uid)
        .update({ contacts })
}

export const logOut = () => {
    try {
        firebase.auth().signOut()
            .then((_) => window.location.reload())
    } catch (e) { }
}