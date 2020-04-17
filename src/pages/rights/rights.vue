<template>
  <div>
    <el-card>
      <el-table :data="listRights" stripe border style="width: 100%">
        <el-table-column align="center" prop="index" label="#" width="100">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="authName" label="权限名称" width="550">
          <template slot-scope="scope">
            <span>{{ scope.row.authName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="level" label="权限等级" width="550">
          <template slot-scope="scope">
            <!-- 等级标签 -->
            <el-tag v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag v-if="scope.row.level==='1'" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level==='2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const rightModule = createNamespacedHelpers('right')
const { mapState: rightState, mapMutations: rightMutations, mapActions: rightActions,mapGetters:rightGetters } = rightModule

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
...rightActions(['getRoles','addRoles','deleteRoles','editRoles','getRights','roleRights']) ,
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.getRights('list')
},
computed:{
   ...rightState(["listRights"])
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

</style>