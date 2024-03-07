const mongoose = require("mongoose");
const ChatShema = require('../schema/ChatShema');
const Chat = mongoose.model("Chat", ChatShema);

const Types = mongoose.Types


const ChatRepository = {
    CreateChat(chat) {
        return Chat.create(chat)
    },
    AddNewMessage(sender, receiver, message) {
        return Chat.updateOne(
            {members: {$all: [new Types.ObjectId(sender), new Types.ObjectId(receiver)]}},
            {$push: {messages: message}}
        )
    },
    GetMessages(sender, receiver) {
        return Chat.findOne(
            {
                members: {
                    $all: [new Types.ObjectId(sender), new Types.ObjectId(receiver)]
                }
            },
        ).populate({
            path: 'messages',
            populate: {
                path: 'sender',
                select: 'avatar'
            }
        }).lean()
    }
}

module.exports = ChatRepository