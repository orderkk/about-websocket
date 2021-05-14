<template>
  <div class="login">
    <input type="text" v-model="username">
    <button @click="join">加入聊天室</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    join() {
      let username = this.username;
      console.log(username)
      if (!!username) {
        localStorage.setItem('username', username)
        this.$router.push({
          name: 'Home'
        })
      }
    }
  },
  mounted() {
    let username = localStorage.getItem('username');
    if (!!username) {
      this.$router.push({
          name: 'Home'
        })
    }
  },
}
</script>


<style scoped>

</style>