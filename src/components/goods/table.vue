<!--  -->
<template>
<div class=''>
   <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="classfyObj.result"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType"
      empty-text='暂无分类'
    >
      <!-- 是否有效状态栏 -->
      <template slot="cat_deleted">
        <i class="el-icon-success" style="color:skyblue"></i>
      </template>
      <!-- 排序栏 -->
      <template slot="cat_level" slot-scope="scope">
        <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
        <el-tag size="mini" type="success" v-if="scope.row.cat_level === 1">二级</el-tag>
        <el-tag size="mini" type="warning" v-if="scope.row.cat_level === 2">三级</el-tag>
      </template>
      <!-- 操作 -->
      <template slot="operation" slot-scope="scope">
        <el-button
          @click="editCategorys(scope.row)"
          size="mini"
          type="primary"
          icon="el-icon-edit"
        >编辑</el-button>
        <el-button
          @click="deleteCategorys(scope.row)"
          size="mini"
          type="danger"
          icon="el-icon-delete"
        >删除</el-button>
      </template>
    </zk-table>
      <!-- 分页组件 -->
    <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="classfyObj.total">
        </el-pagination>
    </div>
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
  // 当前页数
      pagenum: 1,
      // 当前页最大数
      pagesize: 5,
      // 每页最大数数组
      props: {
        stripe: false, //是否显示间隔斑马纹
        border: true, //是否显示纵向边框
        showHeader: true, //是否显示表头
        showSummary: false, //是否显示表尾合计行
        showRowHover: false, //鼠标悬停时，是否高亮当前行
        showIndex: true, //是否显示数据索引
        treeType: true, //是否为树形表格
        isFold: true, //树形表格中父级是否默认折叠
        expandType: false, //是否为展开行类型表格（为 True 时，需要添加作用域插槽, 它可以获取到 row, rowIndex)
        selectionType: false //是否显示间隔斑马纹
      },
       columns: [
        {
          label: "分类名称",
          prop: "cat_name"
          //   minWidth: "285px"
        },
        {
          label: "是否有效",
          type: "template",
          template: "cat_deleted",
          headerAlign: "center",
          align: "center"
        },
        {
          label: "排序",
          type: "template",
          template: "cat_level",
          headerAlign: "center",
          align: "center"
        },
        {
          label: "操作",
          type: "template",
          template: "operation",
          headerAlign: "center",
          align: "center"
        }
      ]
};

},
props: {},
//监听属性 类似于data概念

//监控data中的数据变化
watch: {},
//方法集合
methods: {
   ...goodsActions(["getCategory", "getCategoryByIds", "delCategory"]),
   // 更新数据
    getCategorys() {
        this.getCategory({
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            type: 3
        });
    },
    handleSizeChange: function (size) {
        this.pagesize = size;
            setTimeout(() => {
                this.getCategorys();
            }, 50);
    //   console.log(this.pagesize)  //每页下拉显示数据
},
    // 选择第几页
    handleCurrentChange: function(pagenum){
        this.pagenum = pagenum;
        setTimeout(() => {
            this.getCategorys();
        }, 50);
        //  console.log(this.pagenum)  //点击第几页
    },
    
     // 编辑框打开
    editCategorys(info) {
      this.$emit("editCategorys", true, this.pagenum, this.pagesize);
      this.getCategoryByIds(info.cat_id);
    },
      // 删除操作
    deleteCategorys(info) {
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delCategory(info.cat_id);
          setTimeout(() => {
            this.getCategory();
          }, 200);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消了删除"
          });
        });
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 this.getCategorys();
},
computed: {
     ...goodsState(["classfyObj"])
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