<!--  -->
<template>
<div class=''>
   <el-card>
      <div class="demo-input-suffix">
         <el-input placeholder="请输入搜索内容">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
         </el-input>
         <el-button type="primary" @click="gotoRoles()">添加角色</el-button>
      </div>
       <!--角色列表  -->
      <div class='table'> 
      <el-table
      :data="roles"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column
         type="index"
         label="#"
         width="150">
      </el-table-column>
      <el-table-column
         prop="roleName"
         label="职位"
         width="300">
      </el-table-column>
      <el-table-column
         prop="roleDesc"
         label="描述"
         width="300">
      </el-table-column>
      <el-table-column label="操作" width="450" >
         <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
            size="mini"
            type="warning"
            @click="handleShared(scope.$index, scope.row)">分配权限</el-button>
         </template>
      </el-table-column>
      </el-table>
      <!-- 添加角色dialog -->
      <div class="addDialog">
         <el-dialog
            title="添加角色"
            :visible.sync="addDialog"
            :show-close="false"
            margin-top="15vh"
            width="30%">
            <div>
               <el-form 
               :model="addRolefrom"
               :rules="rules"
               ref="ruleForm"
               >
               <el-form-item label="角色名" prop="roleName">
                  <el-input v-model="addRolefrom.roleName" clearable autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="角色描述">
                  <el-input v-model="addRolefrom.roleDesc" clearable autocomplete="off"></el-input>
               </el-form-item>
               </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
               <el-button @click="canceladdRoles('ruleForm')">取 消</el-button>
               <el-button type="primary" @click="submitaddRoles('ruleForm')">确 定</el-button>
            </div>
         </el-dialog>
      </div>
      <!-- 编辑角色信息dialog -->
      <div>
       <el-dialog
            title="编辑角色"
            :visible.sync="editDialog"
            :show-close="false"
            margin-top="15vh"
            width="30%"
         >
         <el-form
          :model="editRoleform"
          :rules="rules"
          ref="editForm"
          label-position="right"
          label-width="100px">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="editRoleform.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editRoleform.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelRole('editForm')">取 消</el-button>
          <el-button type="primary" @click="editRole('editForm')">确 定</el-button>
        </span>
         </el-dialog>
      </div>
      <!-- 分配权限dialog -->
      <div>       
      <el-dialog title="分配权限" :show-close="false" :visible.sync="allowDialog" width="50%">
       <el-tree
          :data="treeRights"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="nowIdArr"
          :props="defaultProps"
          ref="tree"
          @check-change="handleCheckChange"
         >
         </el-tree>
        <!-- 底部 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelRight()">取 消</el-button>
          <el-button type="primary" @click="allowRight()">确 定</el-button>
        </span>
      </el-dialog>
      </div>
  </div> 
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
// 添加角色控制
addDialog:false,
// 编辑角色控制
editDialog:false,
//  权限分配
allowDialog:false,
// 添加角色
addRolefrom: {
      roleName: '',
      roleDesc: '',
},
editRoleform:{
      roleName: '',
      roleDesc: '',
      id:'',
},
rules: {
   roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
           ]
},
defaultProps: {
   children: "children",
   label: "authName"
},
// 角色本来的权限数组
idArr:[],
// 修改之后的权限数组
upidArr:[],
// 角色id
editId:0,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
...rightMutations(['setalreadyRightsArr']),
...rightActions(['getRoles','addRoles','deleteRoles','editRoles','getRights','roleRights']) ,
// 点击添加角色
gotoRoles(){
   this.addDialog=true
},
// 确定添加角色
submitaddRoles(formName){
     this.$refs[formName].validate((valid) => {
      if (valid) {
         this.addRoles(this.addRolefrom)
         this.addDialog=false
         setTimeout(()=>{
             this.$refs[formName].resetFields();
             this.getRoles()
         },200)
      } else {
      console.log('error submit!!');
      return false;
      }
   });
},
// 取消添加角色
canceladdRoles(formName){
      this.addDialog=false
      this.$refs[formName].resetFields();
},

// 操作--
// 编辑
handleEdit(index,row){
//  console.log(row)
 this.editDialog=true
 this.editRoleform={
     roleName:row.roleName,
     roleDesc:row.roleDesc,
     id:row.id,
 }
},
// 确定编辑
editRole(formName){
   // console.log(this.editRoleform)
 this.$refs[formName].validate((valid) => {
      if (valid) {
        let froms ={
            id: this.editRoleform.id,
            roleName: this.editRoleform.roleName,
            roleDesc: this.editRoleform.roleDesc
        }
        this.editRoles(froms)
         this.editDialog=false
         setTimeout(()=>{
             this.$refs[formName].resetFields();
             this.getRoles()
         },200)
      } else {
      console.log('error submit!!');
      return false;
      }
   });
},
// 取消编辑
cancelRole(){
this.editDialog=false
},
// 删除
handleDelete(index,row){
   console.log(row)
   this.$confirm("删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then((res) => {
         this.deleteRoles(row.id)
         this.getRoles()
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
   });
},
//分配权限
handleShared(index,row){
this.allowDialog=true
// 角色id
this.editId=row.id
this.getRights('tree')
this.setalreadyRightsArr(row.children)
},
// 分配权限
handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes());
      let arr = [];
      res.forEach(item => {
        arr.push(item.id);
      });
      // 更新之后的权限数组
      this.upidArr=arr
},
// 点击确定分配
allowRight(){
   // let formData= {
   //       roleId: this.editId,
   //       rids:this.upidArr
   // }
   // console.log(formData)
   this.roleRights({
         roleId: this.editId,
         rids:this.upidArr.toString()
       });
      this.allowDialog=false
      this.roleId=0
      this.rids=[]
      setTimeout(()=>{
         this.getRoles()
      },200)
},
// 取消分配
cancelRight(){
   this.allowDialog=false  
},
    // 树形控件选中状态修改后触发的方法


},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.getRoles()
},
computed: {
   ...rightState(['roles', 'treeRights', 'alreadyRightsArr']),
   ...rightGetters(['rightsIdArr', 'nowIdArr'])
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
.demo-input-suffix{
   width: 40%;
   display: flex;
   justify-content: flex-start; 
   .el-button{
      margin-left: 20px;
   }
}
.table{
   margin-top: 20px;
}

</style>