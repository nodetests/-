<!--  -->
<template>
<div class=''>
      <div class="demo-input-suffix">
   <!-- slot 方式： -->
      <el-input placeholder="请输入搜索内容">
         <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" @click="gotoAddgood()">添加商品</el-button>
     </div>
     <!-- 商品列表 -->
      <div>
        <el-table :data="goodsObj.goods" style="width: 100%">
          <!-- 编号 -->
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index+1+pagesize*(pagenum-1)}}</span>
            </template>
          </el-table-column>
          <!-- 商品名称 -->
          <el-table-column label="商品名称" width="500"  align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.goods_name }}</span>
            </template>
          </el-table-column>
          <!-- 商品价格(元) -->
          <el-table-column label="商品价格(元)" width="140" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.goods_price }}</span>
            </template>
          </el-table-column>
          <!-- 商品重量 -->
          <el-table-column label="商品重量" width="100" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.goods_weight }}</span>
            </template>
          </el-table-column>
          <!-- 创建时间 -->
          <el-table-column label="创建时间" width="250" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.add_time | formatTime}}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <!-- 编辑商品 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editGoods(scope.row)"
              ></el-button>
              <!-- 删除商品 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delGoods(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 15, 20]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="goodsObj.total">
            </el-pagination>
        </div>
         <!-- 编辑框dialog -->
    <el-dialog title="编辑商品" :visible.sync="editDialog" width="40%">
      <el-form
        :model="editObj"
        :rules="rules"
        ref="ruleForm"
        label-position="right"
        label-width="100px"
      >
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editObj.goods_name"></el-input>
        </el-form-item>
        <!-- 商品价格 -->
        <el-form-item label="商品价格" prop="goods_price">
          <el-input type="number" min="0" v-model="editObj.goods_price"></el-input>
        </el-form-item>
        <!-- 商品数量 -->
        <el-form-item label="商品数量" prop="goods_number">
          <el-input type="number" min="0" v-model="editObj.goods_number"></el-input>
        </el-form-item>
        <!-- 商品重量 -->
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input type="number" min="0" v-model="editObj.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="editconfirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import dayjs from 'dayjs'
import {createNamespacedHelpers} from 'vuex'
const goodsMoudle =createNamespacedHelpers('goods')
const {mapState: goodsState, mapMutations: goodsMutations, mapActions: goodsActions}=goodsMoudle
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
pagenum:1, //初始页
pagesize:10,    //每页的数据
editDialog: false,
// 编辑表单
editObj:{
    goods_name:'',
    goods_price:0,
    goods_number:0,
    goods_weight:0,
},
// 表单验证
rules: {
    goods_name: [
        { required: true, message: "商品名称不能为空", trigger: "blur" }
    ],
    goods_price: [
        { required: true, message: "商品价格不能为空", trigger: "blur" }
    ],
    goods_number: [
        { required: true, message: "商品数量不能为空", trigger: "blur" }
    ],
    goods_weight: [
        { required: true, message: "商品重量不能为空", trigger: "blur" }
    ]
},

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
...goodsActions(['getGoodsLists','deleteGoods','editGoodInfo']),
gotoAddgood(){
    this.$router.push({path:'/addgoods'})
},
// 选择每页几个数据
handleSizeChange: function (size) {
      this.pagesize = size;
        this.getGoodsLists({
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: ''
        });
    //   console.log(this.pagesize)  //每页下拉显示数据
},
// 选择第几页
handleCurrentChange: function(pagenum){
        this.pagenum = pagenum;
        this.getGoodsLists({
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: ''
        });
        //  console.log(this.pagenum)  //点击第几页
},
// 打开更新商品
editGoods(row){
this.editDialog=true
this.editObj={
    goods_name:row.goods_name,
    goods_price:row.goods_price,
    goods_number:row.goods_number,
    goods_weight:row.goods_weight,
}
},
// 确定更新商品
editconfirm(formName){
     this.$refs[formName].validate((valid) => {
      if (valid) {
        this.$message({
            type: "success",
            message: "更新成功"
        })
         this.editDialog=false
         setTimeout(()=>{
            //  this.$refs[formName].resetFields();
            //  this.getGoodsLists({
            //     pagenum: this.pagenum,
            //     pagesize: this.pagesize,
            //     query: ''
            // });
         },200)
      } else {
      console.log('error submit!!');
      return false;
      }
   });
},
// 删除商品
delGoods(row){
 console.log(row.goods_id)
  this.$confirm("将会删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then((res) => {
        this.deleteGoods(row.goods_id)
        this.getGoodsLists({
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: ''
        })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
   });

},


},

//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 this.getGoodsLists({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: ''
      });
},
computed:{
    ...goodsState(['goodsObj'])
},
filters:{
 formatTime(data){
    var time = new Date(data);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds()
    let times = y+'年'+m+'月'+d+'日'+h+'时'+m+'分'+s+'秒'
    return times
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