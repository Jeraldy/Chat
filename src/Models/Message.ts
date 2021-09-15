interface Message{
    content: string,
    messageType: string,
    sentAt: string,
    sentBy: string,
    senderId: string,
    messageId: string,
    receivers: Array<string>
}

