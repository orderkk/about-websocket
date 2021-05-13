; ((doc, Socket) => {
    const oLists = doc.querySelector('#lists');
    const oInput = doc.querySelector('#indexInput');
    const oBtn = doc.querySelector('#indexBtn');
    const ws = new Socket('ws://localhost:8009')
    let username = ""
    const init = () => {
        bindEvent()
    }

    function bindEvent() {
        oBtn.addEventListener('click', handleEnterBtnClick, false)

        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('message', handleMessage, false)
    }

    function handleEnterBtnClick() {

        const msg = oInput.value.trim()
        if (!msg) {
            return
        }

        ws.send(JSON.stringify({
            user: username,
            date: Date.now(),
            message: msg
        }))

        oInput.value = ""
    }

    function handleOpen() {
        username = localStorage.getItem('username');
        if (!username) {
            location.href = 'entry.html'
        }
        console.log('websocket open')
    }
    function handleError() {
        console.log('websocket error')
    }
    function handleClose() {
        console.log('websocket close')
    }
    function handleMessage(e) {
        const myData = JSON.parse(e.data)
        oLists.appendChild(createList(myData))
    }

    function createList(data) {
        const {user, date, message} = data;
        const oItem = doc.createElement('li');
        oItem.innerHTML = `
            <p>
                <span>${user}</span>
                <span>${new Date(date)}</span>
                <span>${message}</span>
            </p>
        `
        return oItem
    }
    init()
})(document, WebSocket)