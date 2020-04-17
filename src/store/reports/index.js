// 默认导出一个对象既一个模块
import api from '../../http/api'
import {Message} from 'element-ui'
import router from '../../router'
export default{
    namespaced:true,
    state: {
        reportsData:[]
    },
    mutations: {
        setReportsData(state,data){
            state.reportsData=data
        }
    },
    getters: {
    
    },
    actions: {
      async getReports({commit}){
        try{
            let res = await api.getReports()
            // console.log(res)
            commit('setReportsData',res.data)
          }catch(err){
            console.log(err)
          }
    },
    },
}