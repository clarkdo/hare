<template>
  <div class="content" v-if="loggedUser">
    <el-card>
      Element 卡片演示
    </el-card>
    <img :src="loggedUser.picture"/>
    <p>Hi {{ loggedUser.email }}!</p>
    <p>This is a super secure page! Try loading this page again using the incognito/private mode of your browser.</p>
    <div style="margin: 15px 0;"></div>
    <el-row>
      <el-col :span="6">
        <el-select v-model="selectval" placeholder="请选择">
          <el-option
            v-for="item in food"
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
      food: [{
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
      selectval: '选项4'
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
</style>
