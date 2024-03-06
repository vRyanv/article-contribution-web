const mongoose = require("mongoose");
const ChatShema = require('../schema/ChatShema');
const Chat = mongoose.model("Chat", ChatShema);

const ChatRepository = {
    CreateChat(chat){
        return Chat.create(chat)
    },
    AddNewMessage(chat_id, message){
        return Chat.updateOne(
            { _id:chat_id},
            {$push: {messages: message }}
        )
    }
}

module.exports = ChatRepository