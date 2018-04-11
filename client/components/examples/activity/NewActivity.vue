<template>
  <div class="new-activity">
    <el-form :model="formData" :rules="formRules" ref="newActivity" label-width="100px" class="activity-form">
      <el-row type="flex" justify="flex-start">
        <el-col :xs="24" :sm="10">
          <el-form-item :label="$t('activity.account')" prop="account">
            <el-input v-model="formData.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="{span: 10, offset: 2}">
          <el-form-item :label="$t('activity.area')" prop="region">
            <el-select v-model="formData.region" filterable allow-create :placeholder="$t('activity.holder.area')">
              <el-option
                v-for="item in cities"
                v-if="!item.disabled"
                :key="item.label"
                :label="$t(item.label)"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="flex-start">
        <el-col :xs="24" :sm="10">
          <el-form-item :label="$t('activity.tag')" prop="label">
            <el-select v-model="formData.label" multiple filterable allow-create :placeholder="$t('activity.holder.tag')">
              <el-option
                v-for="item in labels"
                :key="item.label"
                :label="$t(item.label)"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="{span: 3, offset: 2}">
          <el-form-item :label="$t('activity.instDist')" prop="delivery">
            <el-switch active-text="" inactive-text="" v-model="formData.delivery"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="flex-start">
        <el-col :xs="24" :sm="10">
          <el-form-item :label="$t('activity.type')" prop="type">
            <el-checkbox-group v-model="formData.type">
              <el-checkbox :label="$t('activity.price')"></el-checkbox>
              <el-checkbox :label="$t('activity.rights')"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="{span: 10, offset: 2}">
          <el-form-item :label="$t('activity.priority')" prop="priority">
            <el-radio-group v-model="formData.priority">
              <el-radio :label="$t('activity.medium')"></el-radio>
              <el-radio :label="$t('activity.high')"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="flex-start">
        <el-col :xs="24" :sm="10">
          <el-form-item :label="$t('activity.rate')" prop="rate">
            <el-rate v-model="formData.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="{span: 10, offset: 2}">
          <el-form-item :label="$t('activity.organizer')" prop="organizer">
            <el-cascader :options="organizers" v-model="formData.organizer"
              :placeholder="$t('example.selPh')" change-on-select>
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="flex-start">
        <el-col :xs="24" :sm="22">
          <el-form-item :label="$t('activity.date')" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker :placeholder="$t('activity.holder.date')" v-model="formData.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1" :offset="1">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker :placeholder="$t('activity.holder.time')" v-model="formData.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="flex-start">
        <el-col :xs="24" :sm="22">
          <el-form-item :label="$t('activity.desc')" prop="desc">
            <el-input type="textarea" v-model="formData.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="submit('newActivity')">{{$t('activity.create')}}</el-button>
        <el-button @click="reset('newActivity')">{{$t('activity.reset')}}</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Component, { Getter, namespace } from 'class-component'

const ExampleGetter = namespace('examples/index', Getter)

@Component({
  props: {
    formData: {
      type: Object,
      default () {
        return {
          account: '',
          region: 'activity.city.ly',
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
  },
  data () {
    return {
      formRules: {
        account: [
          { required: true, message: this.$t('activity.rule.account.required'), trigger: 'blur' },
          { min: 6, message: this.$t('activity.rule.account.length'), trigger: 'blur' }
        ],
        region: [
          { required: true, message: this.$t('activity.rule.region.required'), trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: this.$t('activity.rule.date1.required'), trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: this.$t('activity.rule.date2.required'), trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: this.$t('activity.rule.type.required'), trigger: 'change' }
        ],
        priority: [
          { required: true, message: this.$t('activity.rule.priority.required'), trigger: 'change' }
        ],
        rate: [
          { type: 'integer', min: 1, required: true, message: this.$t('activity.rule.rate.required'), trigger: 'change' }
        ],
        desc: [
          { required: true, message: this.$t('activity.rule.desc.required'), trigger: 'blur' }
        ]
      }
    }
  }
})
export default class NewActivity extends Vue {
  @ExampleGetter labels
  @ExampleGetter organizers
  @ExampleGetter cities

  submit (formName) {
    /**
     * Example of how we can see each field value
     */
    let formData = {}
    for (const v of Object.keys(this.formData)) {
      formData[v] = this.formData[v]
    }
    console.log('NewActivity submit formData', formData)

    this.$refs[formName].validate((valid) => {
      if (valid) {
        this.$message.success(this.$t('activity.success'))
        if (formName === 'popForm') {
          this.popVisible = false
        }
        return false
      } else {
        this.$message.warning(this.$t('activity.failed'))
        return false
      }
    })
  }
  reset (formName) {
    this.$refs[formName].resetFields()
  }
}
</script>

<style lang="scss" scoped>
.el-select, .el-cascader {
  display: block
}
@media (max-width: 768px) {
  .el-row {
    flex-direction:column;
    .el-button+.el-button {
      margin-left: 0px;
      margin-top: 15px;
    }
  }
}
</style>
