<template>
  <div class="postList">
    <div class="loading" v-if="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>
    <div class="main" v-else>
      <ul>
        <li class="nav">
          <span class="active">全部</span>
          <span>精华</span>
          <span>分享</span>
          <span>问答</span>
          <span>招聘</span>
          <span>客户端测试</span>
        </li>
        <li class="list" v-for="post in posts">
          <img :src="post.author.avatar_url">
          <span class="count">
              <span class="reply_count">{{post.reply_count}}/</span>
              <span class="visit_count">{{post.visit_count}}</span>
          </span>
          <span :class="[{good: post.good}, {top: post.top}, {tab: !post.good && !post.top}]">
              {{post | tabFormatter}}
          </span>
          <router-link :to="{
            name: 'post_content',
            params: {
              id: post.id
            }
          }">
            <span class="title">
              {{post.title}}
            </span>
          </router-link>
          <span class="last_reply">
             {{post.last_reply_at | formatData}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostList",
    data() {
      return {
        loading: false,
        posts: [],
      }
    },
    beforeMount() {
      this.loading = true
      this.getData()
    },
    methods: {
      getData() {
        this.$axios.get('https://cnodejs.org/api/v1/topics', {
          page: 1,
          limit: 20
        }).then((res) => {
          this.loading = false
          this.posts = res.data.data
          console.log(this.posts)
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
  }

  .main {
    ul {
      padding: 0;
      .nav {
        display: flex;
        align-items: center;
        padding: 8px 10px;
        border-bottom: 1px solid #F5F5F5;
        background: #F5F5F5;
        span {
          margin: 0 10px;
          color: #80bd01;
          font-size: 14px;
          &:hover {
            color: #005580;
          }
          &.active {
            background-color: #80bd01;
            color: #fff;
            padding: 3px 4px;
            border-radius: 3px;
          }
        }
      }
      .list {
        display: flex;
        align-items: center;
        padding: 10px 10px;
        border-bottom: 1px solid #F5F5F5;
        position: relative;
        background: #fff;
        &:hover {
          background: #F5F5F5;
          .title {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        > * {
          margin: 0 6px;
        }
        img {
          width: 30px;
          height: 30px;
        }
        .count {
          width: 50px;
          text-align: center;
          .reply_count {
            color: #9e78c0;
            font-size: 14px;
          }
          .visit_count {
            color: #b4b4b4;
            font-size: 10px;
          }
        }
        .top, .good {
          color: #fff;
          font-size: 12px;
          background: #80bd01;
          padding: 2px 4px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .tab {
          color: #999;
          font-size: 12px;
          background: #e5e5e5;
          padding: 2px 4px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .title {
          max-width: 70%;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .last_reply {
          white-space: nowrap;
          position: absolute;
          right: 9px;
          color: #778087;
          font-size: 11px;
        }
      }
    }
  }
</style>