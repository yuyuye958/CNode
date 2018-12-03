<template>
  <div class="userInfoWrapper">
    <div class="loading" v-if="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>
    <div class="userInfo" v-else>
      <div class="userWrapper">
        <p class="toRoot">
          <router-link :to="{name: 'root'}">
            <span>主页</span>
          </router-link>
          <span> /</span>
        </p>
        <section>
          <div class="iconAndName">
            <img :src="userInfo.avatar_url" alt="">
            <span>{{userInfo.loginname}}</span>
          </div>
          <p class="scoreNum">{{userInfo.score}} 积分</p>
          <p class="registerTime">注册时间 {{userInfo.create_at | formatData}}</p>
        </section>
      </div>
      <p class="bar">最近创建的话题</p>
      <div class="topics">
        <ul>
          <li v-for="(item,index) in userInfo.recent_topics" v-if="index<=4">
            <img :src="item.author.avatar_url" alt="">
            <router-link :to="{
                name: 'post_content',
                params:{
                  id: item.id
              }
            }">
              <span class="title">{{item.title}}</span>
            </router-link>
            <span class="lastTime">{{item.last_reply_at | formatData}}</span>
          </li>
        </ul>
      </div>
      <p class="bar">最近参与的话题</p>
      <div class="replies">
        <ul>
          <li v-for="item in userInfo.recent_replies">
            <router-link :to="{
              name: 'user_info',
              params:{
                name: item.author.loginname
              }
            }">
              <img :src="item.author.avatar_url" alt="">
            </router-link>
            <router-link :to="{
              name: 'post_content',
              params:{
                id: item.id
              }
            }">
              <span class="title">{{item.title}}</span>
            </router-link>
            <span class="lastTime">{{item.last_reply_at | formatData}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
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
            }, (err) => {
              console.log(err)
            })
      }
    },
    watch: {
      '$route'(to, from) {
        this.getData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .userInfoWrapper {
    .userInfo {
      .userWrapper {
        .toRoot {
          span:first-child {
            color: #80BD01;
            &:hover {
              text-decoration: underline;
            }
          }
          span:nth-child(2) {
            color: #ccc;
          }
          background: #F6F6F6;
          padding: 10px;
          border-bottom: 1px solid #E5E5E5;
          font-size: 14px;
        }
        section {
          background: #fff;
          padding: 10px 10px 20px;
          .iconAndName {
            display: flex;
            align-items: center;
            margin-bottom: .8em;
            img {
              height: 40px;
              width: 40px;
            }
            span {
              color: #778087;
              font-size: 14px;
              padding-left: .5em;
            }
          }
          .scoreNum {
            font-size: 14px;
          }
          .registerTime {
            font-size: 14px;
            color: #ababab;
          }
        }
      }
      .bar {
        margin-top: 15px;
        background: #F6F6F6;
        padding: 10px;
        border-bottom: 1px solid #E5E5E5;
        font-size: 14px;
      }
      .topics, .replies {
        background: white;
        position: relative;
        ul {
          li {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #E5E5E5;
            font-size: 14px;
            position: relative;
            img {
              width: 30px;
              height: 30px;
            }
            .title {
              margin: 0 15px;
              color: #08c;
              &:hover {
                text-decoration: underline;
              }
            }
            .lastTime {
              position: absolute;
              right: 10px;
            }
          }
        }
      }
    }
  }
</style>