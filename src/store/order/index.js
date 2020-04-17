import api from '../../http/api'
import {Message} from 'element-ui'
import router from '../../router'
export default{
    namespaced:true,
    state: {
     orderlist:{},
     logArr: []
    },
    mutations: {
        // 订单信息
      setOrderlist(state,data){
          state.orderlist=data
      },
       // 物流信息处理
       setLogArr(state, data) {
        state.logArr = data
    }
    },
    getters: {
    
    },
    actions: {
        // 获取订单详情
        async getOrderList({commit},{ pagenum, pagesize, query }){
            try{
                let res = await api.getOrderList({ pagenum, pagesize, query })
                console.log(res)
                if (res.meta.status===200){
                        commit('setOrderlist',res.data)
                }
            }catch(err){
                console.log(err)
            }
       
        },
        // 修改订单
        async editOrder({commit},{id,params}){
            try{
              let res = await api.editOrder({id,params})
            }catch(err){
              console.log(err)
            }
        },
        // 获得订单详细信息
        async getOrderDetail({commit},id){
            try{
                let res = await api.getOrderDetail(id)
                // console.log(res)
              }catch(err){
                console.log(err)
              }
        },
        // 物流信息
        async checkwuliu({commit},id){
            try{
               let res =await api.checkwuliu(id)
               if (res.meta.status === 200) {
                commit('setLogArr', res.data)
             }
            }catch(err){
                console.log(err)
            }
        }
    }
}