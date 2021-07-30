let username = localStorage.username ? localStorage.username : 'anon';
const chatList = document.querySelector('.chat-list');
const roombutton = document.querySelector('.chatroom')
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(localStorage.lastRoom ? localStorage.lastRoom : 'general', username);
chatroom.getChat(dat => chatUI.render(dat));
const newchat = document.querySelector('.new-chat');
const newname = document.querySelector('.new-name');
const uhold = document.querySelector('.usernamehold');
uhold.innerText = username;

newchat.addEventListener('submit', e=> {
    e.preventDefault();
    chatroom.addChat(newchat.message.value).then(()=>newchat.reset()).catch(err=>console.log(err));
})

newname.addEventListener('submit', e => {
    e.preventDefault();
    const newuname = newname.uname.value.trim();
    chatroom.updateName(newuname);
    uhold.innerText = newuname;
})
roombutton.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChat(dat => chatUI.render(dat));
    }
})