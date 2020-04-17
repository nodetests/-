<template>
  <div class="app" @click="cancelRightmenu">  
 <el-container class="container">
  <el-aside width="15%" style="background-color: #324157">
      <el-menu :default-openeds="['1']" background-color="#324157"  text-color="#bfcbd9">
        <!-- 首页 -->
        <el-submenu index="1"  >
          <template slot="title"><i class="el-icon-message"></i>首页</template> 
        </el-submenu>
      </el-menu>
      <!-- 得到数据渲染数据 -->
        <el-menu class="sidebar-el-menu"
                :default-active="onRoutes"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router >
          <el-submenu v-for="(item,index) in menus" :key="index" :index="item.path" @click="defaultOpenItem(item)">
            <template slot="title"><i class="el-icon-message"></i>{{item.authName}}</template>
             <el-menu-item-group v-for="(item1,index1) in item.children" :key="index1" >
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item  @click="childItem(item,item1)" :index="item1.path" >{{item1.authName}}</el-menu-item>
              </el-menu-item-group> 
          </el-submenu>
        </el-menu>
        
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px;height:100px" >
      <div>
        <!-- <index-header></index-header> -->天气
      </div>
      <div>
         <div class="header"> 
           <div class="dragDemo">
            <!-- 拽动组件 -->
            <draggable class="list-group"
                    element="div"
                    v-model="pathList"
                    :options="dragOptions1"
                    :move="onMove"
                    @start="rightStart"
                    @end="rightEnd">
              <div v-for="(item,index) in pathList" class="pathItem" :key="index" @contextmenu.prevent="menu(index)">
                    <div class="itemName" @click="goto(item,index)" >
                    <span :class="[colorContent===item.name ?'colors':'']">{{item.name}}</span>
                  </div>
            
                <div class="rightmenu" v-if="menuIndex===index">  
                  <ul>
                    <li @click="other(index)">关闭其他</li>
                    <!-- <li>关闭右侧</li> -->
                    <li @click="leftAll(index)">关闭左侧</li>
                    <li @click="nowItem(index)">关闭当前</li>
                  </ul>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
      
     </el-header>
    
    <el-main>
       
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import navbar from '../components/navbar'
// 引入vuex
import { createNamespacedHelpers } from 'vuex'
// 传模块的名字
const userModule = createNamespacedHelpers('user')
const { mapState: userState, mapMutations: userMutations, mapActions: userActions } = userModule
export default {
  
  name: '',
  props: {
  },
  components: {
  navbar,draggable
  },
  data() {
    return { 
      isDragging:false,
      oldleftlist:[],
      pathList:[{name:'首页',path:'/'}],
      // main上方的导航数据
      menuIndex:-1,
      defaultOpens:[],
      paths:'',
      colorContent:'首页'
    }
  },
  methods: {
    ...userActions(['getMenus']) ,
    //  上方导航栏
    childItem(item,item1){
      // console.log(item1)
      this.colorContent=item1.authName
      let objs ={
        name:item1.authName,
        path:item1.path
      }
      console.log(item1.path)
      let arr =this.pathList
      // 去重
      if(JSON.stringify(arr).includes(objs.name)){
        console.log()
      }else{
        this.pathList.push(objs)
      }
      // this.pathList= Array.from(new Set(arr))
      this.$router.push({path:item1.path})
    },
    defaultOpenItem(item){
          // console.log(item)
    },
    // 点击导航 右边也跳转
    goto(item,index){
      // console.log(this.$route.path)
     this.$router.push({path:item.path})
     console.log(item)
     this.colorContent=item.name
    
    },
    // 右键菜单------开始 
    // 监听自定义菜单显示
    // 拖拽效果
    onMove({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );

    },
    rightStart(){
     this.oldleftlist=this.pathList.concat();
      this.isDragging=true;
    },
    rightEnd(){
      this.isDragging=false;
      // 左边不变
      // this.pathList=this.oldleftlist
    },
    cancelRightmenu(){
      this.menuIndex= -1  
    },
    menu(index){
      this.menuIndex=index
    },
    // 关闭其他
    other(index){
       let length =this.pathList.length
      if(length===1){
        alert('只有一个啦')
      }else{
       let indexs =index
       console.log(this.pathList)
       let arr= this.pathList
       let arr1=arr.filter((item,index)=>{
         return index===indexs
       })
       console.log(arr1)
       this.pathList=arr1
      }
    },
    // 左边所有
    leftAll(index){
      let length =this.pathList.length
      if(length===1){
        alert('已经是第一个啦')
      }else{
        let indexs =index
        console.log(this.pathList)
        let arr= this.pathList
        let arr1=arr.filter((item,index)=>{
          return index>=indexs
        })
        this.pathList=arr1
      }
    
    },
    // 右边所有
    nowItem(index){
      let length =this.pathList.length
      if(length===1){
        alert('只剩一个啦')
      }else{
       let indexs =index
       console.log(this.pathList)
       let arr= this.pathList
       let arr1=arr.filter((item,index)=>{
         return index!==indexs
       })
       this.pathList=arr1
        // console.log(this.pathList[indexs-1].path)
       this.$router.push({path:this.pathList[indexs-1].path})
       }
      }, 
    
    // 右键菜单------结束

    // send() {
    //   this.$bus.$emit('send', this.msg)
     // }
  
  },
  mounted() {
     this.getMenus()
  },
  watch: {
    ...userState(['pathList'])
    // 计算属性
    //   data(val, oldVal){//普通的watch监听
    //     console.log(val)
    //     console.log(oldVal)
    //  },
    // // 第一次就监听
    //  immediate: true
  },
  computed: {
    ...userState(['menus']),
      dragOptions1() {
          return {
              animation: 0,
              group: {
                  name: "description",
                  pull:'clone'
              },
              ghostClass: "ghost",
          };
      },
     onRoutes() {
            //  返回当前路由
            if(JSON.stringify(this.menus).indexOf(this.$route.path)=== -1){
                return this.$route.path.replace('/', '')
            }else{
               return 'goods'
            }
    }
  } 
}
</script>

<style scoped lang='scss'>
.app{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.container{
  width: 100%;
  height: 100%;
  .el-header{
  width: 100%;
  // height: 150px  !important;
}
}

.header{
height: 200px;
}
.list-group{
display: flex;
justify-content: flex-start;
margin-top: 50px;
}
.pathItem{
  width: 100px;
  text-align: center;
  margin-left: 30px;
  position: relative;
}
.itemName{
  color: #1a1a1a;
 
  }
  .rightmenu{
    position: absolute;
    top: 10px;
    left: -30px;
    z-index: 999999;
    opacity: 0.8;
    // background: red;
    li{
      width: 90px;
      height: 25px;
      list-style: none;
      font-size: 12px;
      color: #1a1a1a;
      text-align: center;
      line-height: 25px;
      border: 1px solid #eee;
      box-shadow: 0.5em 0.5em 1em 0 rgba(0,0,0,.1);
      border-radius: 1px;
      background: #F5F6F7;
    } 
    li:nth-child(-n+3){
      border-bottom: none;
    }
}
.colors{
  color: #6BC7FF;
}
</style>