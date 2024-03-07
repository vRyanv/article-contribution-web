const ChatRepository = require('../repository/ChatRepository')
const ChatController = (socket) => {
    console.log('connection::', socket.id)

    const message = async (data) => {
        const content = data.content

        const receiver = __user_sockets.find(user => {
            return user.user_id === content.receiver
        })
        content.sender = {
            id: socket.sender.id,
            full_name: socket.sender.full_name,
            avatar: socket.sender.avatar
        }
        const sender_id = socket.sender.id
        const members = [sender_id, content.receiver]
        let time = new Date()
        const message = {
            sender: content.sender.id,
            message: content.message,
            time
        }

        if (content.chat_id) {
            await ChatRepository.AddNewMessage(content.chat_id, message)
        } else {
            let new_chat = {
                members,
                messages: [message]
            }
            new_chat = await ChatRepository.CreateChat(new_chat)
            content.new_chat_id = new_chat._id
        }
        if (receiver) {
            content.time = [
                String(time.getHours()).padStart(2, '0'),
                String(time.getMinutes()).padStart(2, '0')
            ].join(':')
            receiver.socket.emit('chat:message', {content})
            socket.emit('chat:message', {content})
        }
    }
    const disconnect = () => {
        socket.removeAllListeners()
        __user_sockets = __user_sockets.filter(user => user.socket.id !== socket.id)
    }
    socket.on('chat:message', message);
    socket.on('disconnect', disconnect);
}

module.exports = ChatController