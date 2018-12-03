<template>
  <div class="authorInfo">
    <div class="loading" v-if="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>

    <div class="authorWrapper" v-else>
      <div class="bar">作者</div>
      <div class="user">
        <router-link :to="{
          name: 'user_info',
          params: {
            name: userInfo.loginname
          }
        }">
          <img :src="userInfo.avatar_url" alt="">
          <span class="name">{{userInfo.loginname}}</span>
        </router-link>
        <p>积分 {{userInfo.score}}</p>
      </div>
    </div>
    <div class="topics">
      <div class="bar">作者其他话题</div>
      <ul>
        <li v-for="(item,index) in userInfo.recent_topics" v-if="index <= 4">
          <router-link :to="{
            name: 'post_content',
            params: {
              id: item.id,
              name: item.author.loginname
            }
          }">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="replies">
      <div class="bar">作者最近回复</div>
      <ul>
        <li v-for="item in userInfo.recent_replies">
          <router-link :to="{
            name: 'post_content',
            params:{
              id: item.id,
              name: item.author.loginname
            }
          }">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SlideBar",
    data() {
      return {
        loading: false,
        userInfo: {}
      }
    },
    beforeMount() {
      this.loading = true
      this.getData()
    },
    methods: {
      getData() {
        this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then((res) => {
              this.loading = false
              this.userInfo = res.data.data
            }, (error) => {
              console.log(error)
            })
      }
    }
  }
</script>

<style scoped lang="scss">
  .authorInfo {
    float: right;
    margin-left: 20px;
    width: 290px;
    .authorWrapper, .topics, .replies {
      margin-bottom: 15px;
      background: #fff;
      .bar {
        background: #F6F6F6;
        padding: 15px;
        color: #444;
        font-size: 13px;
      }
    }
    .authorWrapper {
      .user {
        padding: 10px;
        img {
          vertical-align: middle;
          height: 48px;
          width: 48px;
        }
        .name {
          margin-left: 5px;
          color: #778087;
          font-size: 16px;
        }
        p {
          margin-top: 10px;
          font-size: 14px;
        }
      }
    }
    .topics, .replies {
      ul li {
        font-size: 14px;
        padding: 10px;
        overflow: hidden;
        a {
          color: #778087;
        }
      }
    }
  }
</style>