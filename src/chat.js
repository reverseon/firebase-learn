class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chat = db.collection('chats');
        this.stoplisten;
    }
    async addChat(msg) {
        const dat = {
            msg: msg,
            room: this.room,
            time: firebase.firestore.Timestamp.fromDate(new Date()),
            username: this.username
        }
        const resp = await this.chat.add(dat);
        return resp;
    }
    getChat(cbf) {
        this.stoplisten = this.chat.where('room', "==", this.room).orderBy('time').onSnapshot(e => {
            e.docChanges().forEach(dat => {
                if (dat.type === "added") {
                    cbf(dat.doc.data());
                }
            })
        })
    }
    updateName(uname) {
        this.username = uname;
        localStorage.setItem('username', uname);
    }
    updateRoom(nroom) {
        this.room = nroom;
        if(this.stoplisten){
            this.stoplisten();
        }
        localStorage.setItem('lastRoom', nroom);
    }
}
