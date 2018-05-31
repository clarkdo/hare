<template>
  <div class="content">
    <el-row
      type="flex"
      justify="center"
      :gutter="0"
    >
      <el-card style="width:90%">
        <div slot="header">
          <span>{{title}}</span>
        </div>
        <el-row type="flex">
          <el-col>
            <el-form
              label-width="220px"
              size="mini"
            >
              <el-form-item
                :label="$t('session.index.seeAlsoSideCar')"
              >
                <a href="/hpi/auth/validate" target="_blank">validate</a>
                <a href="/hpi/auth/whois" target="_blank">whois</a>
              </el-form-item>
              <access-token />
              <hr />
              <el-form-item
                :key="key"
                :label="key"
                v-for="(value, key) in user"
              >
                {{value}}
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import Component, { Getter, namespace } from 'class-component'
import AccessToken from '@/components/AccessToken'

const SessionGetter = namespace('session', Getter)

@Component({
  components: {
    AccessToken
  },
  head () {
    return {
      title: this.title
    }
  }
})
export default class Session extends Vue {
  @SessionGetter user

  title = 'session.index.title'

  created () {
    // Translate title both in the head, and in the data
    this.title = this.$t(this.title)
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 35px;
  .el-row {
    margin-top: 35px;
  }
}
a+a {
  margin-left: 10px;
}
hr {
  border: 0;
  height: 1px;
  margin: 35px 0 15px 0;
  background: #333;
}
</style>
