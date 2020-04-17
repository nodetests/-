<!--  -->
<template>
<div class=''>
     <div class="demo-input-suffix">
   <!-- slot 方式： -->
      <el-input placeholder="请输入搜索内容">
         <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" @click="goaddCategory()">添加分类</el-button>
     </div>
     <el-card>
      <!-- 分类表单 -->
     <tables @editCategorys="editCategorys"></tables>
      <!-- 编辑dialog -->
      <el-dialog title="编辑分类" :show-close="false" :visible.sync="editFlag" width="35%">
        <el-form
          :model="editCategory"
          :rules="rules"
          ref="editForm"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="editCategory.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel('editForm')">取 消</el-button>
          <el-button type="primary" @click="confirm('editForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加dialog -->
      <el-dialog title="添加分类" :show-close="false" :visible.sync="addFlag" width="35%">
        <el-form
          :model="addObj"
          :rules="rules"
          ref="addForm"
          label-position="right"
          label-width="100px"
        >
          <!-- 分类名称 -->
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addObj.cat_name"></el-input>
          </el-form-item>
          <!-- 级联选择器 -->
          <el-form-item label="父级分类" prop="cat_id">
            <el-cascader
              :disabled="cascaderFlag"
              :options="classfyArr"
              :props="{ checkStrictly: true,value:'cat_id',label:'cat_name' }"
               clearable
              @change="handleChange"
              style="width:100%"
            ></el-cascader>
          </el-form-item>
          <!-- 父级分类框 -->
        </el-form>
        <!-- 底部 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel('addForm')">取 消</el-button>
          <el-button type="primary" @click="confirm('addForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import tables from '../../components/goods/table'
import {createNamespacedHelpers} from 'vuex'
const goodsMoudle =createNamespacedHelpers('goods')
const {mapState: goodsState, mapMutations: goodsMutations, mapActions: goodsActions}=goodsMoudle
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    tables
},
data() {
//这里存放数据
return {
    editFlag: false,
    addFlag: false,
    // 当前页数
    pagenum: 1,
    // 当前页最大数
    pagesize: 5,
    // 编辑分类框的状态
    
    // 编辑框验证规则
    rules: {
    cat_name: [
        { required: true, message: "分类名称不能为空", trigger: "blur" },
        { min: 2, max: 10, message: "分类名称在2-10位之间", trigger: "blur" }
    ]
    }, 
    // 添加框的内容
    addObj: {
    cat_pid: 0,
    cat_name: "",
    cat_level: 0
    }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
     ...goodsActions(["getCategory","changeCategory","addCategories"]),

// 添加分类
goaddCategory() {
    this.addFlag = true;
    // 点击添加分类还要发一个获取到一二级分类的请求
    this.getCategory({ type: 2 });
},

// 级联选择器方法
handleChange(value) {
    this.addObj.cat_pid = value[value.length - 1];
    this.addObj.cat_level = value.length;
    // console.log(this.addObj.cat_pid);
    // console.log(this.addObj.cat_level);
},
// 子组件分发回父组件打开编辑dialog的方法
editCategorys(flag, num, size) {
    this.editFlag = flag;
    this.pagenum = num;
    this.pagesize = size;
},
 // 确定按钮
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // if条件下为编辑框确定按钮触发 else条件下为添加框确定按钮触发
          if (formName === "editForm") {
            this.changeCategory({
              id: this.editCategory.cat_id,
              cat_name: this.editCategory.cat_name
            });
          } else {
            this.addCategories({
              cat_pid: this.addObj.cat_pid,
              cat_name: this.addObj.cat_name,
              cat_level: this.addObj.cat_level
            });
          }
          setTimeout(() => {
            this.editFlag = false;
            this.addFlag = false;
            this.getCategory({
              pagenum: this.pagenum,
              pagesize: this.pagesize,
              type: 3
            });
            this.$refs[formName].resetFields();
          }, 200);
        } else {
          return false;
        }
      });
    },
// 取消(添加)按钮
cancel(formName) {
    this.editFlag = false;
    this.addFlag = false;
    this.$refs[formName].resetFields();
},
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 this.getCategory();
},
computed: {
...goodsState(["editCategory", "classfyArr"]),
cascaderFlag() {
    if (this.addObj.cat_name.trim() === "") {
    return true;
    } else {
    return false;
    }
}
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