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
          <el-form :model="demoForm" :rules="demoRules" ref="demoForm" label-width="100px" class="demo-form">
            <el-row >
              <el-col :offset="4" :span="6">
                <el-form-item label="账号" prop="account">
                  <el-input v-model="demoForm.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="2" :span="6">
                <el-form-item label="活动区域" prop="region">
                  <el-select v-model="demoForm.region" placeholder="请选择活动区域">
                    <el-option label="上海" value="shanghai"></el-option>
                    <el-option label="北京" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="6">
                <el-form-item label="活动标签" prop="label">
                  <el-select v-model="demoForm.label" multiple filterable allow-create placeholder="请选择活动标签">
                    <el-option
                      v-for="item in labels"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :offset="2" :span="3">
                <el-form-item label="即时配送" prop="delivery">
                  <el-switch on-text="" off-text="" v-model="demoForm.delivery"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="6">
                <el-form-item label="活动类型" prop="type">
                  <el-checkbox-group v-model="demoForm.type">
                    <el-checkbox label="价格优惠"></el-checkbox>
                    <el-checkbox label="价格权益"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :offset="2" :span="6">
                <el-form-item label="优先级" prop="priority">
                  <el-radio-group v-model="demoForm.priority">
                    <el-radio label="中"></el-radio>
                    <el-radio label="高"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="6">
                <el-form-item label="活动评分" prop="rate" required>
                  <el-rate v-model="demoForm.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                </el-form-item>
              </el-col>
              <el-col :offset="2" :span="6">
                <el-form-item label="活动承办" prop="organizer">
                  <el-cascader :options="organizers" v-model="demoForm.organizer" change-on-select></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="14">
                <el-form-item label="活动时间" required>
                    <el-col :span="11">
                      <el-form-item prop="date1">
                        <el-date-picker placeholder="选择日期" v-model="demoForm.date1" style="width: 100%;"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="demoForm.date2" style="width: 100%;"></el-time-picker>
                      </el-form-item>
                    </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="14">
                <el-form-item label="活动描述" prop="desc">
                  <el-input type="textarea" v-model="demoForm.desc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="14">
                <el-form-item>
                  <el-button type="primary" @click="submit('demoForm')">立即创建</el-button>
                  <el-button @click="reset('demoForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-carousel-item>
      </el-carousel>
      <el-dialog title="新增活动" v-model="popVisible">
        <el-form :model="popForm" :rules="demoRules" ref="popForm" label-width="100px" class="demo-form">
          <el-row >
            <el-col :span="10">
              <el-form-item label="账号" prop="account">
                <el-input v-model="popForm.account"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="2" :span="10">
              <el-form-item label="活动区域" prop="region">
                <el-select v-model="popForm.region" placeholder="请选择活动区域">
                  <el-option label="上海" value="shanghai"></el-option>
                  <el-option label="北京" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="活动标签" prop="label">
                <el-select v-model="popForm.label" multiple filterable allow-create placeholder="请选择活动标签">
                  <el-option
                    v-for="item in labels"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :offset="2" :span="3">
              <el-form-item label="即时配送" prop="delivery">
                <el-switch on-text="" off-text="" v-model="popForm.delivery"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="活动类型" prop="type">
                <el-checkbox-group v-model="popForm.type">
                  <el-checkbox label="价格优惠"></el-checkbox>
                  <el-checkbox label="价格权益"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :offset="2" :span="8">
              <el-form-item label="优先级" prop="priority">
                <el-radio-group v-model="popForm.priority">
                  <el-radio label="中"></el-radio>
                  <el-radio label="高"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="活动评分" prop="rate" required>
                <el-rate v-model="popForm.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
              </el-form-item>
            </el-col>
            <el-col :offset="2" :span="10">
              <el-form-item label="活动承办" prop="organizer">
                <el-cascader :options="organizers" v-model="popForm.organizer" change-on-select></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="活动时间" required>
                  <el-col :span="11">
                    <el-form-item prop="date1">
                      <el-date-picker placeholder="选择日期" v-model="popForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-time-picker placeholder="选择时间" v-model="popForm.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                  </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="活动描述" prop="desc">
                <el-input type="textarea" v-model="popForm.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-row>
            <el-col :offset="7" :span="8">
              <el-button type="primary" @click="submit('popForm')">确 定</el-button>
              <el-button @click="popVisible = false">取 消</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['authUser']),
    ...mapGetters('demo', [
      'num', 'city', 'province', 'district',
      'food', 'website', 'restaurant', 'restoptions',
      'multiFood', 'foods', 'cities', 'labels', 'organizers'
    ])
  },
  methods: {
    ...mapActions('demo', [
      'checkCity'
    ]),
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('提交成功!')
          if (formName === 'popForm') {
            this.popVisible = false
          }
          return false
        } else {
          this.$message.warning('提交失败!!!')
          return false
        }
      })
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  },
  data () {
    return {
      popVisible: false,
      popForm: {
        account: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        priority: '',
        rate: null,
        organizer: [],
        desc: '',
        label: []
      },
      demoForm: {
        account: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        priority: '',
        rate: null,
        organizer: [],
        desc: '',
        label: []
      },
      demoRules: {
        account: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, message: '长度不少于 6 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动类型', trigger: 'change' }
        ],
        priority: [
          { required: true, message: '请选择活动优先级', trigger: 'change' }
        ],
        rate: [
          { type: 'integer', min: 1, required: true, message: '请选择活动评分', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动描述', trigger: 'blur' }
        ]
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
.el-select, .el-cascader {
  display: block
}
</style>

<style>
.el-select.input-sel .el-input {
  width: 110px;
}
</style>
