<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <p class="footer-main-title">Hare 2.0</p>
        <a href="//github.com/clarkdo/hare/issues" class="footer-main-link" target="_blank">Feedback</a>
        <a href="//github.com/clarkdo/hare/graphs/contributors" class="footer-main-link" target="_blank">Contributors</a>
      </div>
      <div class="footer-social">
        <el-popover
          ref="wechat"
          placement="top"
          width="120"
          popper-class="footer-popover"
          trigger="hover">
          <div class="footer-popover-title">CFC</div>
        </el-popover>
        <i class="icon-wechat element-icons" v-popover:wechat></i>
        <a href="//github.com/clarkdo/hare" target="_blank">
          <i class="icon-github element-icons"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import Vue from 'vue'
import Component from 'class-component'

@Component
export default class Footer extends Vue {
  version = '0.1.0'
}
</script>

<style lang="scss" scoped>
.footer {
  height: 80px;
  background-color: #324057;
  color: #a4aebd;
  width: 100%;
  z-index: 1000;
  margin-top: -80px;
  position: fixed;
  * {
    word-spacing: 0;
  }
  .container {
    padding: 0 40px;
    height: 100%;
    box-sizing: border-box;
  }
  .footer-main {
    font-size: 0;
    padding-top: 20px;
    display: inline-block;
    .footer-main-title {
      line-height: 1;
      font-size: 22px;
      margin: 0;
    }
    .footer-main-link {
      display: inline-block;
      margin: 12px 18px 0 0;
      line-height: 1;
      font-size: 12px;
      color: #768193;
      a {
        color: #768193;
        text-decoration: none;
      }
    }
  }
  .footer-social {
    float: right;
    line-height: 80px;
    .element-icons {
      transition: .3s;
      display: inline-block;
      line-height: 32px;
      text-align: center;
      color: #8D99AB;
      background-color: transparent;
      size: 32px;
      font-size: 32px;
      vertical-align: middle;
      &:hover {
          transform: scale(1.2);
      }
    }
    .icon-wechat {
      margin-right: 36px;
      &:hover {
        color: #fff;
      }
    }
    .icon-github {
      margin-right: 0;
      &:hover {
          color: #fff;
      }
    }
  }
}
.footer-popover {
  padding: 0;
  min-width: 120px;
  line-height: normal;
  box-shadow: 0 0 11px 0 rgba(174, 187, 211, 0.24);
  .footer-popover-title {
    border-bottom: solid 1px #eaeefb;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #99a9bf;
    background-color: #f8f9fe;
  }
  img {
    size: 100px;
    margin: 10px;
  }
}
@media (max-width: 768px) {
  .footer {
    .footer-social {
      display: none;
    }
  }
}
</style>
