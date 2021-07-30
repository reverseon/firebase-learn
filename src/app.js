let username = localStorage.username ? localStorage.username : 'anon';
const chatList = document.querySelector('.chat-list');
const roombutton = document.querySelector('.chatroom')
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(localStorage.lastRoom ? localStorage.lastRoom : 'general', username);
chatroom.getChat(dat => chatUI.render(dat));
const newchat = document.querySelector('.new-chat');
const newname = document.querySelector('.new-name');
const uhold = document.querySelector('.usernamehold');
const errmsg = document.querySelector('.errormsg');
uhold.innerText = username;

newchat.addEventListener('submit', e=> {
    e.preventDefault();
    const ncval = newchat.message.value;
    if (!/^[\x21-\x7E ]{1,128}$/.test(ncval)) {
        errmsg.parentElement.parentElement.classList.remove('d-none');
        errmsg.innerHTML = `<b>Max 128 Character and ASCII recognized only</b>`
    } else {
        errmsg.parentElement.parentElement.classList.add('d-none')
        chatroom.addChat(ncval).then(()=>newchat.reset()).catch(err=>console.log(err));
    }
})

newname.addEventListener('submit', e => {
    e.preventDefault();
    const newuname = newname.uname.value.trim();
    if (!/^[a-z0-9]{1,16}$/.test(newuname)) {
        errmsg.parentElement.parentElement.classList.remove('d-none');
        errmsg.innerHTML = `<b>Lowercase and Number only max 16 character</b>`
    } else {
        errmsg.parentElement.parentElement.classList.add('d-none')
        chatroom.updateName(newuname)
        newname.reset();
        uhold.innerText = newuname;
    }
})
roombutton.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChat(dat => chatUI.render(dat));
    }
})