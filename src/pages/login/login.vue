<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item >
        <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
// 传模块的名字
const userModule = createNamespacedHelpers('user')
const { mapState: userState, mapMutations: userMutations, mapActions: userActions } = userModule
export default {
  name: '',
  props: {
  },
  components: {

  },
  data() {
    return {
    form:{
          username:'admin',
          password:'123456'
        }
    }
  },
  methods: {
       ...userActions(['login']) ,
    submit(){
      this.login({
        username:this.form.username,
        password:this.form.password
      })
    }

  },
  mounted() {

  },
  watch: {

  },
  computed: {

  }
}
</script>

<style scoped lang='scss'>
</style>