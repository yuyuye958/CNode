<template>
  <div class="header">
    <a href="#">
      <img src="../assets/cnodejs_light.svg" alt="headerBg">
    </a>
    <ul>
      <li>
        <a href="#">首页</a>
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
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style lang="scss" scoped>
  .header {
    background-color: #444444;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    > a {
      margin-left: 6vw;
      img {
        width: 120px;
      }
    }
    ul {
      list-style: none;
      display: flex;
      align-items: center;
      margin-right: 6vw;
      li {
        a {
          text-decoration: none;
          color: #ccc;
          font-size: 13px;
          padding: 10px 15px;
          &:hover {
            color: white;
          }
        }
      }
    }
  }

</style>