const ChatRepository = require('../repository/ChatRepository')
const SocketController = (socket) => {
    console.log('connection::', socket.id)

    const message = async (data) => {
        const content = data.content
        console.log(content)
        const receiver = __user_sockets.find(user => {
            return user.user_id === content.receiver
        })

        content.sender = {
            id: socket.sender.id,
            full_name: socket.sender.full_name,
            avatar: socket.sender.avatar
        }
        const sender_id = socket.sender.id
        let time = new Date()
        const message = {
            sender: content.sender.id,
            message: content.message,
            time
        }
        try{
            await ChatRepository.AddNewMessage(sender_id, content.receiver, message)
        } catch (error){
            console.log(error)
        }
        content.time = [
            String(time.getHours()).padStart(2, '0'),
            String(time.getMinutes()).padStart(2, '0')
        ].join(':')

        if (receiver) {
            receiver.socket.emit('chat:message', {content})
        }
        socket.emit('chat:message', {content})
    }
    const disconnect = () => {
        socket.removeAllListeners()
        __user_sockets = __user_sockets.filter(user => user.socket.id !== socket.id)
    }
    socket.on('chat:message', message);
    socket.on('disconnect', disconnect);
}

module.exports = SocketController