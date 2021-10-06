import { firebase } from "@firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import { TABLE } from "./constants";
import { dispatch } from 'jeddy/jredux';
import { actions } from "../Reducers/RUser";
import { actions as listActions } from "../Reducers/RChatList";
import { actions as groupActions } from "../Reducers/RGroup";
import RING_TONE from "../Assets/ring_tone.mp3";

import {
    genChatId,
    randomId,
    updateScroll,
    sanitizeDates,
} from "../Utils/index";

const { fetchMessagesSuccess, toggleUploadState, updateUploadProgress } = listActions
const { setUserGroups, updateGroupLastMessage, updateGroupUnSeenMessages } = groupActions

const {
    setUserInfo,
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
                fetchUserGroups(data)
            }
        } else {
            dispatch(setUserInfo(user))
        }
    });
    localStorage.setItem('uid', user.uid)
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
            getLastMessage(genChatId(c.uid, user.uid), user, "contact")
        })
    });
}//787540215

const fetchUserGroups = (user) => {
    const { uid } = user
    const db = firebase.firestore()
    const query = db.collection(TABLE.GROUPS)
        .where("members", "array-contains", uid)

    let items = []
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                items = items.filter(item => item.id != change.doc.id)
            } else {
                let item = change.doc.data();
                item.type = "group"
                delete item.createdAt
                let id = change.doc.id
                if (items.filter(item => item.id == id).length == 0) {
                    items.push({ ...item, id, uid: id })
                } else {
                    let index = items.findIndex(item => item.id == id)
                    items[index] = { ...item, id, uid: id }
                }
            }
        });
        dispatch(setUserGroups([...items]))
        items.forEach(c => {
            getGroupUnseenMessages(c.id, user)
            getGroupLastMessage(c.id, user)
        })
    });
}

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
                item = sanitizeDates(item)
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

const getGroupUnseenMessages = (chatId, user) => {
    const { uid } = user
    const db = firebase.firestore()
    const query = db.collection(TABLE.MESSAGES)
        .where("chatId", '==', chatId)
        .where("unSeenMembers", 'array-contains', uid)
        .where("senderId", "!=", uid)
    let items = []
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                items = items.filter(item => item.id != change.doc.id)
            } else {
                let item = change.doc.data();
                let id = change.doc.id
                item = sanitizeDates(item)
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
        dispatch(updateGroupUnSeenMessages({ uid, chatId, newMessages: [...items] }))
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
                item = sanitizeDates(item)
                if (items.filter(item => item.id == id).length == 0) {
                    items.push({ ...item, id })
                } else {
                    let index = items.findIndex(item => item.id == id)
                    items[index] = { ...item, id }
                }
            }
        });
        let lastChat = items[0]
        if (lastChat) {
            dispatch(updateContactLastMessage({ uid, chatId, lastChat }))
        }
    });
}

const getGroupLastMessage = (chatId, user) => {
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
                item = sanitizeDates(item)
                if (items.filter(item => item.id == id).length == 0) {
                    items.push({ ...item, id })
                } else {
                    let index = items.findIndex(item => item.id == id)
                    items[index] = { ...item, id }
                }
            }
        });
        let lastChat = items[0]
        if (lastChat) {
            dispatch(updateGroupLastMessage({ uid, chatId, lastChat }))
        }
    });
}

export const fetchMessages = (chatId, uid) => {
    const db = firebase.firestore()
    const query = db.collection(TABLE.MESSAGES)
        .where("chatId", '==', chatId)
        .where("members", "array-contains", uid)
        .orderBy("createdAt", "asc")
    let items = []
    dispatch(fetchMessagesSuccess([]))
    query.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'removed') {
                items = items.filter(item => item.id != change.doc.id)
            } else {
                let item = change.doc.data();
                let id = change.doc.id
                item = sanitizeDates(item)
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
    message.unSeenMembers = message.members.filter(m => m != message.senderId)
    message.seenMembers = []
    return db.collection(TABLE.MESSAGES).add({ ...message, createdAt })
}

export const sendMessageWithFile = (file, message) => {
    message.type = file.type || file.name.split('.').pop()
    message.size = file.size
    message.content = "FILE_LOADER"
    message.fileName = file.name
    sendMessage(message).then(doc => uploadFile(file, doc.id))
}

const updateUpdateMessage = (id, updates) => {
    const db = firebase.firestore()
    return db.collection(TABLE.MESSAGES).doc(id).update({ ...updates })
}

export const updateSeen = (seenMessages, user) => {
    const db = firebase.firestore()
    seenMessages.forEach(message => {
        let unSeenMembers = message.unSeenMembers.filter(m => m != user.uid)
        let seenMembers = [...message.seenMembers, { seenAt: new Date().toString(), ...user }]
        db.collection(TABLE.MESSAGES)
            .doc(message.id)
            .update({ seen: true, unSeenMembers, seenMembers })
    })
}

export const uploadFile = (file, id) => {
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
                updateUpdateMessage(id, { content: downloadURL })
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

export const createChatGroup = (group) => {
    const db = firebase.firestore()
    const createdAt = firebase.firestore.FieldValue.serverTimestamp()
    group.createdAt = createdAt
    return db.collection(TABLE.GROUPS).add(group)
}

export const updateGroup = (group) => {
    const db = firebase.firestore()
    return db.collection(TABLE.GROUPS)
        .doc(group.id)
        .update({ ...group })
}

export const logOut = () => {
    try {
        firebase.auth().signOut()
            .then((_) => window.location.reload())
    } catch (e) { }
}