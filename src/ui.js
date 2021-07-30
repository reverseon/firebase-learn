class ChatUI {
    constructor(list) {
        this.list = list;
    }
    clear() {
        this.list.innerHTML = '';
    }
    render(data) {
        const datetime = dateFns.distanceInWordsToNow(
            data.time.toDate(),
            {addSuffix: true}
        )
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username} :</span>
                <span class="msg">${data.msg}</h5>
                <div class="time">
                    ${datetime}
                </div>
            </li>
        `
        this.list.innerHTML += html;
    }
}