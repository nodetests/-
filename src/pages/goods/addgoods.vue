<template>
  <div class="add-wrapper">
    <!-- 顶部步骤条 -->
    <div class="top m-b-20">
      <el-alert title="添加商品信息" type="info" :closable="false" center show-icon></el-alert>
      <!-- 步骤条 -->
      <div class="steps m-t-30">
        <el-steps :active="active" finish-status="success">
          <el-step :title="item.title" v-for="(item,index) in stepsArr" :key="index"></el-step>
        </el-steps>
      </div>
    </div>
    <!-- 下方的具体步骤栏 -->
    <div class="bot">
      <div class="tabs">
        <el-tabs tab-position="left" :value="currentTab" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="0">
            <basic-info @nextTo="nextTo"></basic-info>
          </el-tab-pane>
          <el-tab-pane label="商品参数" :disabled="tabsNum>=0 && tabsNum<1" name="1">
            <add-params @nextTo="nextTo"></add-params>
          </el-tab-pane>
          <el-tab-pane label="商品属性" :disabled="tabsNum>=0 && tabsNum<2" name="2">
            <attributes @nextTo="nextTo"></attributes>
          </el-tab-pane>
          <el-tab-pane label="商品图片" :disabled="tabsNum>=0 && tabsNum<3" name="3">
            <goodsImage @nextTo="nextTo"></goodsImage>
          </el-tab-pane>
          <el-tab-pane label="商品内容" :disabled="tabsNum>=0 && tabsNum<4" name="4">
            <goodsContent @submit="submit"></goodsContent>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import basicInfo from "../../components/goods/basicInfo";
import addParams from "../../components/goods/addParams";
import attributes from "../../components/goods/attributes";
import goodsImage from "../../components/goods/goodsImage";
import goodsContent from "../../components/goods/goodsContent";
import {createNamespacedHelpers} from 'vuex'
const goodsMoudle =createNamespacedHelpers('goods')
const {mapState: goodsState, mapMutations: goodsMutations, mapActions: goodsActions}=goodsMoudle
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    basicInfo,
    addParams,
    attributes,
    goodsImage,
    goodsContent
},
data() {
//这里存放数据
return {
       active: 0,
  // 步骤条状态数组
      stepsArr: [
        {
          title: "基本信息"
        },
        {
          title: "商品参数"
        },
        {
          title: "商品属性"
        },
        {
          title: "商品图片"
        },
        {
          title: "商品内容"
        },
        {
          title: "完成"
        }
      ],
        // 商品相关参数
      goodsObj: {
        // 商品名
        goods_name: "",
        // 商品价格
        goods_price: "",
        // 商品重量
        goods_weight: "",
        // 商品数量
        goods_number: "",
        // 商品分类
        goods_cat: "",
        // 商品参数(可以为空)
        attrs: [],
        // 商品图片(可以为空)
        pics: [],
        // 商品介绍
        goods_introduce: ""
      },
    // 标签的选中状态
      tabsNum: 0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
...goodsActions(['addGoods']),
 nextTo(num, info) {
      if (num == 1) {
        this.goodsObj.goods_name = info.goods_name;
        this.goodsObj.goods_price = Number(info.goods_price);
        this.goodsObj.goods_weight = Number(info.goods_weight);
        this.goodsObj.goods_number = Number(info.goods_number);
        this.goodsObj.goods_cat = info.goods_cat;
        console.log(this.goodsObj);
      }
      if (num > this.tabsNum) {
        this.active = num;
        this.tabsNum = num;
      } else {
        this.active = num;
      }
    },
       // tab栏切换
    handleClick(e) {
      // console.log(e);
    },
      // 提交按钮
    submit(desc) {
      this.goodsObj.goods_introduce = desc;
      setTimeout(() => {
        this.addGoods(this.goodsObj);
      }, 200);
    },
  
},

//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
computed: {
currentTab() {
    return this.active.toString();
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

</style>