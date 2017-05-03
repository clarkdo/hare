<template>
  <div class="new-activity">
    <el-form :model="formData" :rules="formRules" ref="newActivity" label-width="100px" class="activity-form">
      <el-row >
        <el-col :span="10">
          <el-form-item label="账号" prop="account">
            <el-input v-model="formData.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="10">
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="formData.region" placeholder="请选择活动区域">
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动标签" prop="label">
            <el-select v-model="formData.label" multiple filterable allow-create placeholder="请选择活动标签">
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
            <el-switch on-text="" off-text="" v-model="formData.delivery"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动类型" prop="type">
            <el-checkbox-group v-model="formData.type">
              <el-checkbox label="价格优惠"></el-checkbox>
              <el-checkbox label="价格权益"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="10">
          <el-form-item label="优先级" prop="priority">
            <el-radio-group v-model="formData.priority">
              <el-radio label="中"></el-radio>
              <el-radio label="高"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动评分" prop="rate" required>
            <el-rate v-model="formData.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="10">
          <el-form-item label="活动承办" prop="organizer">
            <el-cascader :options="organizers" v-model="formData.organizer" change-on-select></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="活动时间" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker placeholder="选择日期" v-model="formData.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker placeholder="选择时间" v-model="formData.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="活动描述" prop="desc">
            <el-input type="textarea" v-model="formData.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="4" :span="14">
          <el-form-item>
            <el-button type="primary" @click="submit('newActivity')">立即创建</el-button>
            <el-button @click="reset('newActivity')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Component, { Getter, namespace } from 'class-component'

const DemoGetter = namespace('demo', Getter)

@Component({
  props: {
    formData: {
      type: Object,
      default () {
        return {
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
})
export default class NewActivity extends Vue {
  @DemoGetter labels
  @DemoGetter organizers

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
  }
  reset (formName) {
    this.$refs[formName].resetFields()
  }
  formRules = {
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
</script>

<style lang="scss" scoped>
.el-select, .el-cascader {
  display: block
}
</style>
