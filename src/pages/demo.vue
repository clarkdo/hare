<template>
  <div class="content" v-if="loggedUser">
    <el-carousel :interval="50000" height="580px" indicator-position="outside">
      <el-carousel-item>
        <el-row>
          <el-col :offset="4" :span="16">
            <el-card>
              Element 下拉框, 按钮, 计数器, 单选框演示
            </el-card>
          </el-col>
        </el-row>
        <img :src="loggedUser.picture"/>
        <p>Hi {{ loggedUser.email }}!</p>
        <p>This is a super secure page! Try loading this page again using the incognito/private mode of your browser.</p>
        <div style="margin: 15px 0;"></div>
        <el-row>
          <el-col :span="6">
            <el-select v-model="food" placeholder="请选择">
              <el-option
                v-for="item in foods"
                :key="item.label"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button>Default Button</el-button>
            <el-button type="primary">Primary Button</el-button>
            <el-button type="text">Text Button</el-button>
          </el-col>
          <el-col :span="6">
            <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
          </el-col>
          <el-col :span="6">
            <el-radio-group v-model="city">
              <el-radio-button label="1">上海</el-radio-button>
              <el-radio-button label="2" :disabled="true">北京</el-radio-button>
              <el-radio-button label="3">广州</el-radio-button>
              <el-radio-button label="4">深圳</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-carousel-item>
      <el-carousel-item>
        <el-row>
          <el-col :offset="4" :span="16">
            <el-card>
              Element 单选框, 多选框, 输入框, 多选下拉框演示
            </el-card>
          </el-col>
        </el-row>
        <div style="margin: 15px 0;"></div>
        <el-row>
          <el-col :span="6">
            <el-radio-group v-model="province">
              <el-radio :label="3">辽宁</el-radio>
              <el-radio disabled :label="6">浙江</el-radio>
              <el-radio :label="9">台湾</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="12">
            <el-checkbox-group v-model="district">
              <el-checkbox label="2">中山区</el-checkbox>
              <el-checkbox label="4">东城区</el-checkbox>
              <el-checkbox label="6">松山区</el-checkbox>
              <el-checkbox label="8" disabled>和平区</el-checkbox>
              <el-checkbox label="10" disabled>华盛顿哥伦比亚特区</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="6">
          </el-col>
        </el-row>
        <div style="margin: 15px 0;"></div>
        <el-row>
          <el-col :span="6">
            <el-input placeholder="请输入内容" v-model="website">
              <template slot="prepend">Http://</template>
              <template slot="append">.com</template>
            </el-input>
          </el-col>
          <el-col :offset="2" :span="6">
            <el-input placeholder="请输入内容" v-model="restaurant">
              <el-select class="input-sel" v-model="restoptions" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="search"></el-button>
            </el-input>
          </el-col>
          <el-col :offset="2" :span="6">
            <el-select v-model="multiFood" multiple placeholder="请选择">
              <el-option
                v-for="item in foods"
                :key="item.key"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: mapGetters(['loggedUser']),
  data () {
    return {
      num: '1',
      city: '3',
      province: 6,
      district: ['2', '8'],
      foods: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      food: '选项4',
      website: 'clarkdo.github.com',
      restaurant: null,
      restoptions: '1',
      multiFood: []
    }
  }
}
</script>

<style scoped>
.content {
  text-align: center;
  padding-top: 20px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin: 15px 0;
}
.el-select {
  width: 240px
}
</style>

<style>
.el-select.input-sel .el-input {
  width: 110px;
}
</style>
