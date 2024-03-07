const {UserService} = require("../service");
const {StatusCode} = require("../constant");
const ChatRepository = require('../../realtime/repository/ChatRepository')
const ChatController = {
    async ChatPage(req, res){
        const {role} = req.user
        const sender = req.user
        const user_list = await UserService.GetUserChatListByRole(role)
        const data = {
            page_title: 'Messages',
            user_list,
            sender
        }
        return res.render(
            'chat/chat',
            {
                layout: false,
                data
            }
        )
    },
    async GetMessages(req, res){
        const {receiver} = req.params
        const sender = req.user.id
        try{
            let chat =  await ChatRepository.GetMessages(sender, receiver)
            if(chat){
                return res.status(200).json({code:StatusCode.OK, chat})
            }
            let new_chat = {
                members: [sender, receiver],
                messages: []
            }
            chat = await ChatRepository.CreateChat(new_chat)
            return res.status(200).json({code:StatusCode.OK, chat})
        } catch (error){
            console.log(error)
            return res.status(200).json({code:StatusCode.BAD_REQUEST, message: 'can not get messages'})
        }
    }
}

module.exports = ChatController