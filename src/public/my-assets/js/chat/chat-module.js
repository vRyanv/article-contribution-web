$(document).ready(function () {
    const ChatController = {
        socket: null,
        receiver: null,
        chat_id: null,
        EventListener() {
            $('#btn_notify').click(function () {

            })

            $('.person').click(function (){
                ChatController.SelectUserChat(this)
            })

            $('#content_form').submit(function (e) {
                e.preventDefault()
                const content = {
                    chat_id: ChatController.chat_id,
                    receiver: ChatController.receiver,
                    message: $('#content_message').val()
                }

                ChatController.socket.emit("chat:message", {content})
                $('#content_message').val('')
            })
        },
        SelectUserChat(_this){
            const user_avatar = $(_this).data('user-avatar')
            const full_name = $(_this).data('user-full-name')

            $('#chat_container').removeClass('visually-hidden')
            $('#bg_default_chat').addClass('visually-hidden')
            $('.person').removeClass('current-chat')
            $(_this).addClass('current-chat')

            $('#avatar_current_user').attr('src', `/my-assets/media/images/avatar/${user_avatar}`)
            $('#name_current_user').html(full_name)
            ChatController.receiver = $(_this).data('user-id')
        },
        LoadChatData(){

        },
        ConnectRealtimeServer() {
            ChatController.socket = io({
                transports: ['websocket'],
                upgrade: true,
                query: {token: this.GetTokenFromCookie('user_token')}
            })
        },
        RealtimeListener() {
            ChatController.EventListener()
            ChatController.socket.on("connect", function () {
                console.log('connected')
                ChatController.socket.on('chat:message', function (data) {
                    if(data.content.new_chat_id){
                        ChatController.chat_id = data.content.new_chat_id
                    }

                    ChatController.RenderMessage(data.content)
                })

            });

            ChatController.socket.on('connect_error', function (error) {
                ChatController.socket.removeAllListeners()
                if (error.message === 'unauthorized') {
                    console.log('unauthorized');
                }
            });

            ChatController.socket.on('reconnect', function (number){
                console.log('number')
                console.log('reconnect')
            })

            ChatController.socket.on('disconnect', function (reason){
                ChatController.socket.removeListener('chat:message')
                console.log(reason)
            })
        },
        RenderMessage(content) {
            let message_html = `<li class="chat-right">
                                <div class="chat-hour">${content.time}</div>
                                <div class="chat-text">${content.message}</div>
                                <div class="chat-avatar">
                                <img src="/my-assets/media/images/avatar/${content.sender.avatar}" alt="avatar">
                                </div>
                                </li>`

            if(content.sender.id === ChatController.receiver){
                message_html = `<li class="chat-left">
                                    <div class="chat-avatar">
                                        <img src="/my-assets/media/images/avatar/${content.sender.avatar}"
                                             alt="avatar">
                                    </div>
                                    <div class="chat-text">
                                        ${content.message}
                                    </div>
                                    <div class="chat-hour">${content.time}</div>
                                </li>`
            }

            $('.chat-box').append(message_html)
            $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
        },
        GetTokenFromCookie(cname) {
            return $.cookie(cname)
        },
        Run() {
            this.ConnectRealtimeServer()
            this.RealtimeListener()
        }
    }

    ChatController.Run()
})