<template>
  <div class="home">
    <ul>
      <li v-for="item in lists" :key="item.id">
        <p>
          <span>{{ item.user }} ---- </span>
          <span>{{ new Date(item.date) }}</span>
        </p>
        <p>
          消息：
          <span>{{ item.message }}</span>
        </p>
      </li>
    </ul>

    <input type="text" v-model="value">
    <button @click="send">发送</button>
  </div>
</template>

<script>
const ws = new WebSocket("ws://localhost:8010")
export default {
  name: 'Home',
  data() {
    return {
      lists: [],
      value: "",
      username: ""
    }
  },
  methods: {
    init() {
      this.username = localStorage.getItem('username')

      if (!this.username){
        this.$router.push({
          name: 'Login'
        })
        return
      }


      ws.addEventListener('open', this.handleWsOpen.bind(this))
      ws.addEventListener('error', this.handleWsError.bind(this))
      ws.addEventListener('close', this.handleWsClose.bind(this))
      ws.addEventListener('message', this.handleWsMessage.bind(this))
    },
    send() {
      const msg = this.value;

      if (!msg.trim().length) {
        return
      }

      ws.send(JSON.stringify({
        id: Date.now(),
        user: this.username,
        date: Date.now(),
        message: this.value
      }))


      this.value = ""
    },
    handleWsOpen() {
      console.log('FE: websocket open')
    },
    handleWsError() {
      console.log('FE: websocket error')
    },
    handleWsClose() {
      console.log('FE: websocket close')
    },
    handleWsMessage(e) {
      console.log('FE: websocket message')

      let data = JSON.parse(e.data)
      this.lists.push(data)
    }
  },
  mounted() {
    this.init();
  },
}
</script>
