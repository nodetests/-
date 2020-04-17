<template>
<div class=''>
    <!-- 头部搜索 -->
    <div class="demo-input-suffix">
      <el-input placeholder="请输入搜索内容">
         <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!-- 订单表格 -->
    <div class="table">
         <el-table :data="orderlist.goods" style="width: 100%">
          <!-- 编号 -->
          <el-table-column label="#" width="50" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index+1+pagesize*(pagenum-1)}}</span>
            </template>
          </el-table-column>
          <!-- 订单编号 -->
         <el-table-column label="订单编号" width="400" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.order_number }}</span>
            </template>
          </el-table-column>
          <!-- 价格 -->
         <el-table-column label="订单价格" width="220" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.order_price }}</span>
            </template>
          </el-table-column>
          <!-- 是否付款 -->
           <el-table-column label="是否付款" width="180" align="center">
            <template slot-scope="scope">
              <span v-if=" scope.row.pay_status"><el-tag type="success">已付款</el-tag></span>
              <span v-else><el-tag type="danger">未付款</el-tag></span>
            </template>
          </el-table-column>
          <!-- 是否发货 -->
           <el-table-column label="是否发货" width="180" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.is_send }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <!-- 物流信息 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="getwuliu(scope.row)"
              ></el-button>
              <!-- 地址编辑 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="editOrder(scope.row)"
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
            :total="orderlist.total">
            </el-pagination>
        </div>
    </div>
    <!-- 物流dialog框 -->
      <el-dialog title="物流信息" :visible.sync="wuliuDialog" width="40%">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in logArr"
            :key="index"
            :timestamp="activity.ftime"
            size="large"
          >{{activity.context}}</el-timeline-item>
        </el-timeline>
      </el-dialog>
     <!-- 编辑地址dialog -->
      <el-dialog title="编辑地址" :visible.sync="addressDialog" width="40%" @close="handleClose">
        <el-cascader v-model="address" :options="regionData" style="width:100%"></el-cascader>
      </el-dialog>
</div>
</template>

<script>
import { regionData } from "../../utils/cityData";
import { createNamespacedHelpers } from 'vuex'
const orderModule =createNamespacedHelpers('order')
const { mapState: orderState, mapMutations: orderMutations, mapActions: orderActions } = orderModule

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
return {
addressDialog:false,
wuliuDialog:false,
// 当前页
pagenum:1,
// 尺寸
pagesize:10,
address:[],
// 物流id
oId: 804909574412544600,
regionData,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
...orderActions(['getOrderList','getOrderDetail','checkwuliu']),
// 改变当前页数的尺寸
handleSizeChange(size){
    this.size=size
    this.getOrderList({
         pagenum:this.pagenum,
         pagesize:this.pagesize
    })
},
// 改变当前页码
handleCurrentChange(num){
    this.pagenum=num
    this.getOrderList({
         pagenum:this.pagenum,
         pagesize:this.pagesize
    })
},
// 打开修改订单
editOrder(row){
    // console.log(row)
  this.wuliuDialog=true
//   this.getOrderDetail(row.order_id)
},
// 物流信息
getwuliu(row){
    this.addressDialog=true
    this.checkwuliu(this.oId);
},
handleClose(){
   this.addressDialog=false 
},
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.getOrderList({
    pagenum:this.pagenum,
    pagesize:this.pagesize
})


},
computed:{
...orderState(['orderlist','logArr'])
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
   width: 35%;
}

</style>