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
            <el-form label-width="120px">
              <el-form-item label="Token">
                <el-input
                  readonly
                  select
                  v-model="token"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  v-clipboard="token"
                  type="primary"
                >
                  Copy
                </el-button>
                <a href="/hpi/auth/validate" target="_blank">validate</a>
                <a href="/hpi/auth/whois" target="_blank">whois</a>
                <a href="/hpi/auth/token" target="_blank">token</a>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>

const data = {
  title: 'API Token bound to this session',
  token: '...'
}
const head = {
  title: data.title
}

export default {
  head,
  data: () => ({
    ...data
  }),
  async asyncData ({
    $axios
  }) {
    const recv = await $axios.get('/hpi/auth/token')
      .then(recv => recv.data)
    let token = recv.jwt || ``
    // console.log('rest of data is', {...recv})
    return {
      token
    }
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
.el-form-item a {
  margin-left: 10px;
}
</style>
