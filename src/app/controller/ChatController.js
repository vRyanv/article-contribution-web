const {UserService} = require("../service");
const ChatController = {
    async ChatPage(req, res){
        const role = req.user.role
        const user_list = await UserService.GetUserChatListByRole(role)
        const data = {
            page_title: 'Messages',
            user_list,
            role
        }
        return res.render(
            'chat/chat',
            {
                layout: false,
                data
            }
        )
    }
}

module.exports = ChatController