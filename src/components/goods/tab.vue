<!--  -->
<template>
<div class=''>
    <div class="add-btn">
    <el-button
        size="mini"
        type="primary"
        :disabled="nowId.length===0"
        @click="openAdd"
      >添加{{selType==='many'?'参数':'属性'}}</el-button>
    </div>
   <div>
       <el-table
        :data="paramsArr"
        style="width: 100%"
        @expand-change="showTags"
        row-key="attr_id"
        :expand-row-keys="expandArr"
    >
      <!-- # 下标 -->
      <el-table-column label="#" prop="index" width="50" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <!-- 展开行 -->
      <el-table-column type="expand" width="50">
        <template slot-scope="scope">
          <template v-if="scope.row.attr_vals !== ''">
            <el-tag
              class="tag"
              :key="index"
              v-for="(item,index) in scope.row.attr_vals.split(' ')"
              closable
              :disable-transitions="false"
              @close="handleClose(item,scope.row)"
            >
            <span> {{item}}</span>
            </el-tag>
          </template>
          <el-input
            class="input-new-tag"
            v-if="inputNum === scope.$index"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
            style="width:300px"
          > </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(scope)">+ New Tag</el-button>
        </template>
      </el-table-column>
      <!-- 参数名称 -->
      <el-table-column label="参数名称" prop="attr_name" width="550" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.attr_name }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="550" align="center">
        <template slot-scope="scope">
          <!-- 编辑商品 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editInfo(scope.row)">编辑</el-button>
          <!-- 删除商品 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   </div>
       <!-- 新增参数dialog -->
    <el-dialog :title="`添加${editDialogText}`" :visible.sync="addDialog" width="30%">
      <el-form
        :model="addObj"
        :rules="rules"
        ref="addForm"
        label-position="right"
        label-width="100px"
      >
        <el-form-item :label="editDialogText" prop="attr_name">
          <el-input v-model="addObj.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('addForm')">取 消</el-button>
        <el-button type="primary" @click="confirm('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑dialog -->
    <el-dialog :title="`修改${editDialogText}`" :visible.sync="editDialog" width="30%">
      <el-form
        :model="editObj"
        :rules="rules"
        ref="editForm"
        label-position="right"
        label-width="100px"
      >
        <el-form-item :label="editDialogText" prop="attr_name">
          <el-input v-model="editObj.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('editForm')">取 消</el-button>
        <el-button type="primary" @click="confirm('editForm')">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const goodsMoudle =createNamespacedHelpers('goods')
const {mapState: goodsState, mapMutations: goodsMutations, mapActions: goodsActions}=goodsMoudle
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 addDialog:false,
 editDialog:false,
 rules: {
        attr_name: [
          { required: true, message: "参数名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "参数名在2到10个字符", trigger: "blur" }
        ]
      },
      // 参数相关信息
      addObj: {
        attr_name: ""
      },
      editObj:{
        attr_name: ""
      },
      valsArr: [],
      inputNum: -1,
      // 添加标签输入框的值
      inputValue: "",
      // 默认展开行
      expandArr: []
    };
  },
  props: {
    // 参数类型
    selType: {
      type: String,
      default: "many"
    },
    // 判断依据
    nowId: {
      type: Array,
    }

},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  ...goodsActions(["delParam","getCategory","getParamById","confirmEditParam","addParam",'getParams']),
  ...goodsMutations(["setEditParam"]),
// 更新信息的方法
updateParams() {
    this.getParams({
        id: this.nowId[2],
        sel: this.selType
    });
},
//  添加参数
openAdd(){
this.addDialog=true
},
// 表格展开行触发的方法
showTags(row) {
    this.expandArr.push(row.attr_id);
    this.setEditParam(row);
},
// 添加标签
showInput(row){
// console.log(row)
this.setEditParam(row.row);
    this.inputNum = row.$index;
    this.$nextTick(_ => {
    this.$refs.saveTagInput.$refs.input.focus();
    });
    // console.log(this.editParam)
},
// 确定新增参数 编辑参数
confirm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addDialog = false;
          this.editDialog = false;
          if (formName === "editForm") {
            this.confirmEditParam({
              id: this.editParam.cat_id,
              attrid: this.editParam.attr_id,
              attr_name: this.editObj.attr_name,
              attr_sel: this.selType,
              attr_vals: this.editParam.attr_vals
            });
          } else {
            this.addParam({
              id: this.nowId[2],
              attr_name: this.addObj.attr_name,
              attr_sel: this.selType
            });
          }
          setTimeout(() => {
            this.updateParams();
            this.$refs[formName].resetFields();
          }, 200);
        } else {
          return false;
        }
      });
   
},
// 取消编辑 新增
cancel(formName){
   this.addDialog=false 
   this.editDialog=false
    this.$refs[formName].resetFields();
},
// 添加标签后点击确定
handleInputConfirm(row){
    let inputValue = this.inputValue;
    if (inputValue) {
        let arr =row.attr_vals === ""?row.attr_vals.split("") : row.attr_vals.split("");
        arr.push(inputValue);
        // let froms ={
        //         id:this.editParam.cat_id,
        //         attrid:this.editParam.attr_id,
        //         attr_name: this.editParam.attr_name,
        //         attr_sel: this.selType,
        //         attr_vals: arr.length === 1 ? arr.toString() : arr.join(" ")
        // }
        // console.log(froms)
        setTimeout(() => {
            this.confirmEditParam({
                  id:this.editParam.cat_id,
                attrid:this.editParam.attr_id,
                attr_name: this.editParam.attr_name,
                attr_sel: this.selType,
                attr_vals: arr.length === 1 ? arr.toString() : arr.join("")
                });   
        },20)
        setTimeout(() => {
            this.updateParams();
            this.inputNum = -1;
            this.inputValue = "";
        }, 60);       
    }

},
 // 删除标签
handleClose(tag, row) {
    this.setEditParam(row);
    let arr =
    row.attr_vals === ""
        ? row.attr_vals.split("")
        : row.attr_vals.split(" ");
    arr.splice(arr.indexOf(tag), 1);
    this.confirmEditParam({
    id: this.editParam.cat_id,
    attrid: this.editParam.attr_id,
    attr_name: this.editParam.attr_name,
    attr_sel: this.selType,
    attr_vals: arr.length === 1 ? arr.toString() : arr.join(" ")
    });
    setTimeout(() => {
    this.updateParams();
    }, 100);
},
  editInfo(row){
  this.editDialog = true;
 this.getParamById({
        id: row.cat_id,
        attrid: row.attr_id,
        attr_sel: this.selType,
        attr_vals: row.attr_vals
      });
  },
delInfo(row){
    this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
        })
        .then(() => {
            this.delParam({ id: row.cat_id, attrid: row.attr_id });
            setTimeout(() => {
            this.updateParams();
            }, 200);
        })
        .catch(() => {
            this.$message({
            type: "info",
            message: "取消了删除"
            });
        });
},

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
console.log(this.$props.selType)
},
computed: {
...goodsState(["paramsArr", "editParam"]),

editDialogText() {
    let text = "";
    if (this.selType === "many") {
    return (text = "动态参数");
    } else {
    return (text = "静态属性");
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
.tag{
    margin-left: 20px;
}
</style>