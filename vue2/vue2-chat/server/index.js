const Ws = require('ws')

    ; (() => {
        const server = new Ws.Server({
            port: 8010
        })
        const init = () => {
            bindEvent()
        }

        function bindEvent() {
            server.on('open', socketOpen)
            server.on('close', socketClose)
            server.on('error', socketError)
            server.on('connection', socketConnection)
        }

        function socketOpen() {
            console.log('socket open')
        }
        function socketClose() {
            console.log('socket close')
        }
        function socketError() {
            console.log('socket error')
        }
        function socketConnection(ws) {
            console.log('socket connection')
            ws.on('message', handleMessage)
        }

        function handleMessage(msg) {
            server.clients.forEach(c => {
                c.send(msg)
            })
        }
        init()


    })()