<!--  -->
<template>
    
    <div class="text">
        <div v-if="username">{{username}}</div>
        <div>欢迎来到小爱商城</div>
        </div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
// 传模块的名字
const userModule = createNamespacedHelpers('user')
const { mapState: userState, mapMutations: userMutations, mapActions: userActions } = userModule

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
username:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
computed:{
//    ...userState('username') 
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 this.username=this.$store.state.username
 console.log( this.username)
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.text{
    height: 100%;
    background: url('../../../public/static/bg.png.jpeg') no-repeat;
    background-size: 100% 110%;
    color: red;
}
</style>