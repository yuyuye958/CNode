<template>
  <div class="article">
    <div class="loading" v-if="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>
    <div class="postContent" v-else>
      <div class="topicHeader">
        <div class="topicTitle">
          {{post.title}}
        </div>
        <ul>
          <li>• 发布于 {{post.create_at | formatData}}</li>
          <li>• 作者 {{post.author.loginname}}</li>
          <li>• {{post.visit_count}}次浏览</li>
          <li>• 来自 {{post | tabFormatter}}</li>
        </ul>
      </div>
      <div class="content">
        <div v-html="post.content"></div>
      </div>
      <div class="replyWrapper" v-if="post.replies.length > 0">
        <div class="replyNum">{{post.replies.length}} 回复</div>
        <div v-for="(reply,index) in post.replies" class="replyContent">
          <div class="userWrapper">
            <router-link :to="{
              name: 'user_info',
              params: {
                id: reply.author.id
              }
            }">
              <img :src="reply.author.avatar_url" alt="">
            </router-link>
            <span class="userName">{{reply.author.loginname}}</span>
            <span class="replyInfo">
              <span>{{index+1}}楼• </span>
              {{reply.create_at | formatData}}
            </span>
          </div>

          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data() {
      return {
        loading: false,
        post: [],
      }
    },
    beforeMount() {
      this.loading = true
      this.getArticleData()
    },
    methods: {
      getArticleData() {
        this.$axios(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
            .then((res) => {
              this.post = res.data.data
              this.loading = false
            }, (error) => {
              console.log(error)
            })
      }
    }
  }
</script>

<style lang="scss">
  @import url('../assets/markdown-github.css');

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
  }

  .postContent {
    border-radius: 6px;
    margin-right: 305px;
    .topicHeader {
      border-bottom: 1px solid #E5E5E5;
      padding: 10px;
      background: #fff;
      .topicTitle {
        font-size: 22px;
        font-weight: 700;
        margin: 8px 0;
      }
      ul {
        display: flex;
        li {
          font-size: 12px;
          color: #838383;
        }
      }
    }
    .content {
      padding: 10px 20px 20px;
      background: #fff;
    }
  }

  .replyWrapper {
    background: #fff;
    border-radius: 3px;
    margin-top: 14px;
    .replyNum {
      background: #F6F6F6;
      padding: 13px 8px;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
    }
    .replyContent {
      border-bottom: 1px solid #f0f0f0;
      padding: 11px;
      .userWrapper {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
        }
        .userName {
          font-size: 12px;
          font-weight: 700;
          color: #666;
          margin: 0 8px;
        }
        .replyInfo {
          color: #08c;
          font-size: 11px;
        }
      }
      > p {
        margin-left: 50px;
        margin-bottom: 1em;
        a {
          color: #08c;
        }
      }
    }
  }

</style>