<template>
  <div class="content">
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span>{{$t('example.title1')}}</span>
        </div>
        <el-row type="flex" class="demo_row-flex">
          <el-col :offset="2" :xs="22" :sm="6">
            <el-row>
              <el-col><p>{{$t('example.food')}}: {{food}}</p></el-col>
              <el-col>
                <el-select v-model="food" :placeholder="$t('example.selPh')">
                  <el-option
                    v-for="item in foods"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="{offset: 2, span: 22}" :sm="{offset: 1, span: 6}">
            <el-row>
              <el-col><p>{{$t('example.counter')}}: {{num}}</p></el-col>
              <el-col>
                <el-input-number v-model.number="num" :min="1" :max="10"></el-input-number>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="{offset: 2, span: 22}" :sm="{offset: 1, span: 6}">
            <el-row>
              <el-col><p>{{$t('example.city')}}: {{$t(city)}}</p></el-col>
              <el-col>
                <el-radio-group v-model="city" @input="checkCity">
                  <el-radio-button
                    v-for="item in cities"
                    :key="item.value"
                    :label="$t(item.label)"
                    :disabled="item.disabled">
                    {{$t(item.label)}}
                  </el-radio-button>
                </el-radio-group>
                <el-button @click="checkCity('ShangHai')" type="text">&nbsp;&nbsp;{{$t('activity.city.sh')}}</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span>{{$t('example.title2')}}</span>
        </div>
        <el-row>
          <el-col :offset="2" :span="6" :xs="22">
            <el-radio-group v-model="province">
              <el-radio label="3">辽宁</el-radio>
              <el-radio disabled label="6">浙江</el-radio>
              <el-radio label="9">台湾</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :offset="2" :span="12" :xs="22">
            <el-checkbox-group v-model="district">
              <el-checkbox label="2">中山区</el-checkbox>
              <el-checkbox label="4">东城区</el-checkbox>
              <el-checkbox label="6">松山区</el-checkbox>
              <el-checkbox label="8" disabled>和平区</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="2" :span="6" :xs="22">
            <el-input placeholder="请输入内容" v-model="website">
              <template slot="prepend">Http://</template>
              <template slot="append">.com</template>
            </el-input>
          </el-col>
          <el-col :offset="2" :span="6" :xs="22">
            <el-input :placeholder="$t('example.inPh')" v-model="restaurant" class="input-with-select">
              <el-select v-model="restOptions" slot="prepend" :placeholder="$t('example.selPh')">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :offset="2" :span="6" :xs="22">
            <el-select v-model="multiFood" multiple :placeholder="$t('example.selPh')">
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
      </el-card>
    </el-row>
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span>{{$t('example.title3')}}</span>
        </div>
        <el-row>
          <el-col :offset="2" :span="6" :xs="22">
            <el-cascader :placeholder="$t('example.selPh')" :options="organizers" change-on-select></el-cascader>
          </el-col>
          <el-col :offset="2" :span="6" :xs="22">
            Switch:
            <el-tooltip :content="'Switch value: ' + switcher" placement="top">
              <el-switch v-model="switcher" active-color="#13ce66"
                inactive-color="#ff4949" active-value="1" inactive-value="0">
              </el-switch>
            </el-tooltip>
            <el-switch value='0' inactive-value="0" disabled></el-switch>
          </el-col>
          <el-col :offset="2" :span="6" :xs="22">
            <el-slider v-model="slider" :max="30" :min="10" :step="5" show-stops show-input></el-slider>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span style="line-height: 36px;">{{$t('example.title4')}}</span>
          <el-button style="float: right;" type="primary" @click="popVisible=true">{{$t('example.pop')}}</el-button>
        </div>
        <new-activity :form-data="activity" ref="formActivity"></new-activity>
      </el-card>
    </el-row>
    <el-dialog :title="$t('activity.title.create')" v-model="popVisible">
      <new-activity :form-data="activity" ref="popActivity"></new-activity>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import NewActivity from '@/components/examples/activity/NewActivity'
import Component, {Getter, namespace } from 'class-component'

const ExampleGetter = namespace('examples/index', Getter)

// TODO: https://github.com/ktsn/vuex-class/issues/9
@Component({
  components: {
    NewActivity
  },
  methods: {
    ...mapActions('examples/index', [
      'checkCity'
    ])
  }
})
export default class Demo extends Vue {
  @ExampleGetter city
  @ExampleGetter foods
  @ExampleGetter cities
  @ExampleGetter organizers

  num = '1'
  province = '6'
  district = ['2', '8']
  food = 'Fine Noodles'
  website = 'clarkdo.github'
  restaurant = null
  restOptions = '1'
  multiFood = []

  popVisible = false
  switcher = '1'
  slider = 15
  activity = {
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
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 35px;
  .el-row {
    margin-top: 35px;
  }
  .el-card .el-row {
    margin-top: 20px;
  }
  .el-card .el-row:first-child {
    margin-top: 0px;
  }
  @media (max-width: 768px) {
    .el-card .el-row {
      margin-top: 0px;
      .el-col{
        margin-top: 20px;
      }
      &:first-child {
        margin-top: -20px;
      }
    }
    .demo_row-flex {
      flex-flow: column;
      .el-row .el-col{
        margin-top: 0px;
      }
    }
  }
}
</style>

