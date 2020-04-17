<!--  -->
<template>
<div class="">
   <div class="demo-input-suffix">
   <!-- slot 方式： -->
      <el-input placeholder="请输入搜索内容">
         <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" @click="gotoAdduser()">添加用户</el-button>
  </div>
  <!-- 添加用户 -->
  <el-dialog title="添加用户" :visible="dialogFormVisibleControl">
   <el-form :model="addUserfrom" :rules="rules" ref="addUserinfo" label-width="100px" class="demo-ruleForm">
         <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="addUserfrom.username" autocomplete="off" ></el-input>
         </el-form-item>
         <el-form-item label="密码" :label-width="formLabelWidth"   prop="password">
            <el-input v-model="addUserfrom.password" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="addUserfrom.email" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="addUserfrom.mobile" autocomplete="off"></el-input>
         </el-form-item>
         <!-- <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择状态">
            <el-option label="打开" value="true"></el-option>
            <el-option label="关闭" value="false"></el-option>
            </el-select>
         </el-form-item> -->
      </el-form>
   <div slot="footer" class="dialog-footer">
      <el-button  @click="resetForm('addUserinfo')">取 消</el-button>
      <el-button type="primary" @click="submitForm('addUserinfo')">确 定</el-button>
   </div>
   </el-dialog>
   <!-- 修改用户信息 -->
    <el-dialog title="修改用户" :visible="editUsercontrol">
      <el-form :model="editUserfrom" :rules="rule1" ref="editUserfrom" label-width="100px" class="demo-ruleForm">
         <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
            <el-input v-model="editUserfrom.username" autocomplete="off"  :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="editUserfrom.email" autocomplete="off"></el-input>
         </el-form-item>
         <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="editUserfrom.mobile" autocomplete="off"></el-input>
         </el-form-item>
      </el-form>
   <div slot="footer" class="dialog-footer">
      <el-button  @click="resetEdit('editUserfrom')">取 消</el-button>
      <el-button type="primary" @click="submitEdit('editUserfrom')">确 定</el-button>
   </div>
   </el-dialog>
   <!-- 分配角色权限 -->
    <el-dialog title="分配用户" :show-close="false" :visible.sync="rightDialog" width="40%">
      <el-form :model="roleForm" :rules="rule1" ref="editUserfrom" label-width="100px" class="demo-ruleForm">
         <el-form-item label="用户" :label-width="formLabelWidth" prop="username">
            <el-input v-model="roleForm.username" autocomplete="off"  :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="当前角色" :label-width="formLabelWidth" prop="role">
            <el-input v-model="roleForm.role" autocomplete="off"></el-input>
         </el-form-item>
      </el-form>
      <!-- 角色选择器 -->
      <el-select v-model="selectRole" placeholder="请选择" class="selectRole">
        <el-option
          v-for="(item,index) in roles"
          :key="index"
          :label="item.roleName"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="roleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  <div class='table'>
    <el-table
    :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="#"
      width="150">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色"
      width="120">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="300">
    </el-table-column>
    <el-table-column
      prop="mg_state"
      label="状态"
      width="100">
      <template slot-scope="scope">
       <el-switch
         v-model="scope.row.mg_state"
         :active-value='true'
         :inactive-value='false'
         active-color="#13ce66"
         inactive-color="#ff4949"
         @change="userState(scope.row)">
       </el-switch>
      </template>
      
    </el-table-column>
      <el-table-column
         label="操作"
         width="150">
         <template slot-scope="scope" class="handle">
            <el-button-group>
               <el-button  @click="editUsers(scope.row)" type="primary" icon="el-icon-edit" size="small"></el-button>
               <el-button @click="rights(scope.row)" type="primary" icon="el-icon-share" size="small"></el-button>
               <el-button @click="deletes(scope.row)" type="primary" icon="el-icon-delete" size="small"></el-button>
            </el-button-group>
         </template>
      </el-table-column>
    </el-table>
   </div>
   <div>
    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userList.length">
    </el-pagination>
  </div>
 </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const userModule = createNamespacedHelpers('user')
const { mapState: userState, mapMutations: userMutations, mapActions: userActions } = userModule
const rightModule = createNamespacedHelpers('right')
const { mapState: rightState, mapMutations: rightMutations, mapActions: rightActions,mapGetters:rightGetters } = rightModule
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
   currentPage4:1,
   currentPage:1, //初始页
   pagesize:3,    //每页的数据
   dialogFormVisibleControl:false,
   editUsercontrol:false,
   rightDialog:false,
   selectRole: "",
   // 添加用户
   addUserfrom:{
      username:'',
      password:'',
      email:'',
      mobile:'',
   },
   // 修改用户
   editUserfrom:{
      username:'',
      email:'',
      mobile:'',
   },
   // 分配权限
   roleForm:{
      username:'',
      role:'',
      id:''
   },
   rules:{
      username :[{required: true, message: '请输入', trigger: 'blur'}],
      password :[{required: true, message: '请输入', trigger: 'blur'}],
      email    :[{required: true, message: '请输入', trigger: 'blur'}],
      mobile    :[{required: true, message: '请输入', trigger: 'blur'}]
   },
   rule1:{
      username :[{ message: '请输入', trigger: 'blur'}],
      email    :[{required: true, message: '请输入', trigger: 'blur'}],
      mobile    :[{required: true, message: '请输入', trigger: 'blur'}]
   },
   formLabelWidth: '120px'
};
},
//监听属性 类似于data概念

//监控data中的数据变化
watch: {},
//方法集合
methods: {
...userActions(['getUserlist','addUser','deleteUser','editUserstate','editUser','assignRole']) ,
...userMutations(['setNowuser']),
...rightActions(['getRoles']),
//  操作状态
 rights(row){
  this.setNowuser(row)
  this.roleForm={
       username:row.username,
       role:row.role_name,
       id:row.id,
    }
  this.rightDialog=true
 },
 roleConfirm() {
      if (this.roleForm.username === "admin") {
        this.$message.error("不允许修改admin账户");
      } else {
        if (this.selectRole !== "") {
          this.rightDialog = false;
          this.assignRole({ id: this.roleForm.id, rid: this.selectRole });
          setTimeout(() => {
            this.selectRole = "";
            this.getUserlist()
          }, 80);
        } else {
          this.$message.error("角色ID不能为空");
        }
      }
 },
 cancel(){
   this.rightDialog=false
 },
//  分页
handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
},
handleCurrentChange: function(currentPage){
         this.currentPage = currentPage;
         console.log(this.currentPage)  //点击第几页
},
// 打开添加用户弹层
gotoAdduser(){
  this.dialogFormVisibleControl=true
},
// 确定添加
submitForm(formName) {
   this.$refs[formName].validate((valid) => {
      if (valid) {
         console.log(this.addUserfrom)
         this.addUser(this.addUserfrom)
         this.dialogFormVisibleControl=false
         //  this.$refs[formName].resetFields();
         setTimeout(()=>{
         this.getUserlist()
         },200)
      } else {
      console.log('error submit!!');
      return false;
      }
   });
},
// 取消添加
resetForm(formName){
   this.$refs[formName].resetFields();
   this.dialogFormVisibleControl=false
},
// 修改用户状态
userState(state){
let states={
   uId:state.id,
   type:state.mg_state
}
this.editUserstate(states)
},
// 修改用户信息
editUsers(row){
   if(row.mg_state){
      this.editUsercontrol=true
      this.editUserfrom={
         username:row.username,
         email:row.email,
         mobile:row.mobile,
         id:row.id
      }
   }else{
      this.$message({
          message: '请先开启允许开关',
          type: 'warning'
        });
      
   }


},
// 确定修改
submitEdit(formName) {
   this.$refs[formName].validate((valid) => {
      if (valid) {
         let froms ={
            uId:this.editUserfrom.id,
            email:this.editUserfrom.email,
            mobile:this.editUserfrom.mobile,
         }
             this.editUsercontrol=false 
             this.editUser(froms)
             this.$refs[formName].resetFields();
         setTimeout(()=>{
              this.getUserlist()
         },200)
      } else {
        console.log('error submit!!');
        return false;
      }
   });
},
// 取消修改
resetEdit(formName){
   this.$refs[formName].resetFields();
   this.editUsercontrol=false
},
// 删除用户
deletes(user){
// console.log(user)
let id =user.id
this.deleteUser(id)
this.getUserlist()
},
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
   this.getUserlist()
   this.getRoles()
},
onshow(){
   
},
computed: {
   ...userState(['userList','nowuser']),
   ...rightState(['roles'])
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
.demo-input-suffix{
   width: 20%;
   display: flex;
   justify-content: flex-start; 
   .el-button{
      margin-left: 20px;
   }
}
.table{
   margin-top: 20px;
}
.el-button-group{
     display: flex;
     justify-content: space-around; 
}
.selectRole{
   margin-left: 120px;
}
</style>