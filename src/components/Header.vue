<template>
  <div class="header">
    <div class="header-inner">
      <Router-link :to="{name: 'root'}">
        <img src="../assets/cnodejs_light.svg" alt="headerBg">
      </Router-link>
      <ul>
        <li>
          <Router-link :to="{name: 'root'}">
            首页
          </Router-link>
        </li>
        <li>
          <a href="#">新手入门</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">关于</a>
        </li>
        <li>
          <a href="#">注册</a>
        </li>
        <li>
          <a href="#">登录</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style lang="scss" scoped>
  .header {
    background-color: #444444;
    font-size: 13px;
    display: flex;
    align-items: center;
    .header-inner {
      width: 90%;
      margin: auto;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      max-width: 1400px;
      > a {
        width: 120px;
        img {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    ul {
      display: flex;
      align-items: center;
      li {
        a {
          color: #ccc;
          padding: 10px 15px;
          &:hover {
            color: white;
          }
        }
      }
    }
  }

</style>