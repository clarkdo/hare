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
            <access-token />
            <a href="/hpi/auth/validate" target="_blank">validate</a>
            <a href="/hpi/auth/whois" target="_blank">whois</a>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>

import AccessToken from '@/components/AccessToken'

const data = {
  title: 'session.whois.title',
  whois: []
}

export default {
  head () {
    // Translate title both in the head, and in the data
    const title = this.title = this.$t(this.title)
    return {
      title
    }
  },
  data: () => ({
    ...data
  }),
  components: {
    AccessToken
  }
}
</script>

<style lang="scss" scoped>
a+a {
  margin-left: 10px;
}
</style>
