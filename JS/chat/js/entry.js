; ((doc, storage, location) => {
    let oEnterInput = doc.getElementById('enterInput');
    let oEnterButton = doc.getElementById('enterButton');

    init()
    function init() {
        bindEvent()
    }

    function bindEvent() {
        oEnterButton.addEventListener('click', handleEnterBtnClick, false)
    }

    function handleEnterBtnClick() {
        const username = oEnterInput.value.trim()
        storage.setItem('username', username);
        location.href = 'index.html'

    }
})(document, localStorage, location)