<!--  -->
<template>
<div class=''>
    <!-- 头部 -->
   <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon></el-alert>  
   <!-- 选择属性框 -->
    <div class="select">
        <div class="desc">选择商品分类:</div>
        <!-- 级联选择器 -->
        <div class="cascader">
          <el-cascader
            v-model="nowId"
            :options="classfyArr"
            :props="{ expandTrigger: 'hover',value:'cat_id',label:'cat_name' }"
            @change="handleChange"
          ></el-cascader>
        </div>
    </div>   
    <div class="tab">
        <!-- many动态  only静态-->
         <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
           <tab selType="many" :nowId="nowId"></tab>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
           <tab selType="only" :nowId="nowId"></tab>
        </el-tab-pane>
    </el-tabs>
    </div>
</div>
</template>

<script>
import tab from "../../components/goods/tab";
import {createNamespacedHelpers} from 'vuex'
const goodsMoudle =createNamespacedHelpers('goods')
const {mapState: goodsState, mapMutations: goodsMutations, mapActions: goodsActions}=goodsMoudle
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    tab
},
data() {
//这里存放数据
return {
    nowId: [],
      // tab栏当前选中项
    activeName: 'many'
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 获取参数 分类
    ...goodsActions(["getParams", "getCategory"]),
       // 级联选择器方法 并获取相应的参数
     handleChange() {
      this.getParams({
        id: this.nowId[2],
        sel: this.activeName
      });
    },
      // tab栏方法
    handleClick() {
      this.getParams({
        id: this.nowId[2],
        sel: this.activeName
      });
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // 获得分类数据
 this.getCategory({ type: 3 });
},
computed:{
     ...goodsState(["classfyArr", "paramsArr"])
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
.select{
    display: flex;
    justify-content: flex-start;
    .desc{
    height: 40px;
    line-height: 40px;
    }
    .cascader{
        margin-left: 20px;
    }
}
.tab{
    margin-top: 20px;
}
</style>