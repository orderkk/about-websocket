const Ws = require('ws')

    ; ((Ws) => {
        const server = new Ws.Server({ port: 8009 })

        const init = () => {
            bindEvent()
        }

        function bindEvent() {
            server.on('open', handleOpen)
            server.on('error', handleError)
            server.on('close', handleClose)
            server.on('connection', handleConnection)
        }

        function handleOpen() {

            console.log('open')
        }
        function handleError() {
            console.log('error')
        }
        function handleClose() {
            console.log('close')
        }
        function handleConnection(ws) {

            ws.on('message', handleMessage)
        }
        function handleMessage(msg) {
            server.clients.forEach(clict => {
                clict.send(msg)
            })
        }
        init()
    })(Ws)