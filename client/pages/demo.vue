<template>
  <div>
    <div class="content" v-if="authUser">
      <el-carousel :interval="50000" height="580px" indicator-position="outside">
        <el-carousel-item>
          <el-row>
            <el-col :offset="4" :span="16">
              <el-card>
                Element 下拉框, 按钮, 计数器, 单选框演示
              </el-card>
            </el-col>
          </el-row>
          <img :src="authUser.picture"/>
          <el-row>
            <el-col :span="6">
              <p>食物: {{food}}</p>
            </el-col>
            <el-col :span="6">
              <p>计数器: {{num}}</p>
            </el-col>
            <el-col :span="6">
              <p>城市: {{city}}</p>
            </el-col>
          </el-row>
          <div style="margin: 15px 0;"></div>
          <el-row>
            <el-col :span="6">
              <el-select v-model="$store.state.demo.food" placeholder="请选择">
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
              <el-input-number v-model="$store.state.demo.num" :min="1" :max="10"></el-input-number>
            </el-col>
            <el-col :span="6">
              <el-radio-group v-model="$store.state.demo.city">
                <el-radio-button
                  v-for="item in cities"
                  :key="item.value"
                  :label="item.value"
                  :disabled="item.disabled">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="6">
              <el-button @click="checkCity('GuangZhou')" type="primary">广州</el-button>
              <el-button @click="checkCity('ShenZhen')" type="text">深圳</el-button>
              <el-button @click="checkCity('ShangHai')">上海</el-button>
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
              <el-radio-group v-model="$store.state.demo.province">
                <el-radio label="3">辽宁</el-radio>
                <el-radio disabled label="6">浙江</el-radio>
                <el-radio label="9">台湾</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12">
              <el-checkbox-group v-model="$store.state.demo.district">
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
              <el-input placeholder="请输入内容" v-model="$store.state.demo.website">
                <template slot="prepend">Http://</template>
                <template slot="append">.com</template>
              </el-input>
            </el-col>
            <el-col :offset="2" :span="6">
              <el-input placeholder="请输入内容" v-model="$store.state.demo.restaurant">
                <el-select class="input-sel" v-model="$store.state.demo.restoptions" slot="prepend" placeholder="请选择">
                  <el-option label="餐厅名" value="1"></el-option>
                  <el-option label="订单号" value="2"></el-option>
                  <el-option label="用户电话" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="search"></el-button>
              </el-input>
            </el-col>
            <el-col :offset="2" :span="6">
              <el-select v-model="$store.state.demo.multiFood" multiple placeholder="请选择">
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
        <el-carousel-item>
          <el-row>
            <el-col :offset="4" :span="16">
              <el-card>
                Element 表单, <el-button size="small" @click="popVisible = true">弹框</el-button> 演示
              </el-card>
            </el-col>
          </el-row>
          <div style="margin: 30px 0;"></div>
          <new-activity :form-data="activity" ref="formActivity"></new-activity>
        </el-carousel-item>
      </el-carousel>
      <el-dialog title="新增活动" v-model="popVisible">
        <new-activity :form-data="activity" ref="popActivity"></new-activity>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NewActivity from '~components/activity/NewActivity'

export default {
  components: {
    NewActivity
  },
  computed: {
    ...mapGetters(['authUser']),
    ...mapGetters('demo', [
      'num', 'city', 'province', 'district',
      'food', 'website', 'restaurant', 'restoptions',
      'multiFood', 'foods', 'cities'
    ])
  },
  methods: {
    ...mapActions('demo', [
      'checkCity'
    ])
  },
  data () {
    return {
      popVisible: false,
      activity: {
        account: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        priority: '',
        rate: 0,
        organizer: [],
        desc: '',
        label: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
.el-carousel .new-activity {
  margin-left: 16.66667%;
  width: 66.66667%;
}
</style>

<style>
.el-select.input-sel .el-input {
  width: 110px;
}
</style>
