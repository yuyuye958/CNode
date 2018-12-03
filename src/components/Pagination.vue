<template>
  <div class="pageination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="currentPage > 5">···</button>
    <button v-for="btn in pageBtns" @click="changeBtn(btn)"
            :class="{currentPage: btn === currentPage}">{{btn}}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    data() {
      return {
        pageBtns: [1, 2, 3, 4, 5, '···'],
        currentPage: 1
      }
    },
    methods: {
      changeBtn(page) {
        if (typeof page !== 'number' && typeof page !== 'string') {
          let current = document.getElementsByClassName('currentPage')[0]
          if (current.innerText !== '1') { // 这里不加判断的话，点上一页会出bug
            this.currentPage++
          }
          switch (page.currentTarget.innerText) {
            case '首页':
              this.pageBtns = [1, 2, 3, 4, 5, '···']
              this.changeBtn(1)
              break
            case '上一页':
              current.previousElementSibling.click()
              break
            case '下一页':
              current.nextElementSibling.click()
              break
            default:
              break
          }
        } else if (typeof page === 'string') {
          return
        } else if (typeof page === 'number') {
          this.currentPage = page
          if (page === this.pageBtns[4]) {
            this.pageBtns.shift()  // 移除第一个元素
            this.pageBtns.splice(4, 0, this.pageBtns[3] + 1)  // 添加最后一个元素
          } else if (page === this.pageBtns[0] && this.pageBtns[0] !== 1) {
            this.pageBtns.unshift(this.pageBtns[0] - 1)  // 增加第一个元素
            this.pageBtns.splice(5, 1) // 移除第五个元素
          }
        }
        this.$emit('handleList', this.currentPage)
      }
    }
  }
</script>

<style scoped lang="scss">
  .pageination {
    margin-top: 1em;
    button {
      font-size: 14px;
      vertical-align: top;
      padding: 10px 20px;
      line-height: 14px;
      border: 1px solid gray;
      background: #fff;
      cursor: pointer;
      &:focus {
        outline: none;
      }
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
    .currentPage {
      color: #80bd01;
    }
  }
</style>