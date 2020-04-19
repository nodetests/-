// 默认导出一个对象既一个模块
import api from '../../http/api'
import {Message} from 'element-ui'
import router from '../../router'
export default{
    // 需要命名空间
  namespaced: true,
    state: {
        menus:[],
        pathList:[],
        userList:[],
        userfrom:{},
        nowuser:{},
        // username:''
    },
    mutations: {
        setMenu(state,data){
            state.menus=data
        },
        setUserlist(state,data){
            state.userList=data
        },
        setuserfrom(state,data){
            state.userfrom=data
        },
        setNowuser(state,data){
            state.nowuser=data
        },
        // setUsername(state,data){
        //     state.username=data
        // }
    },
    actions: {
        // 用户登录
        async login({commit},params){
            try{
                let res = await api.login(params)
                console.log(res)
                if(res.meta.status===200){
                    //  存用户 token
                    localStorage.setItem('adminUser',JSON.stringify(res.data))
                    localStorage.setItem('adminToken',res.data.token)
                    // localStorage.setItem('username',res.data.username)
                    // commit('setUsername',res.data.username)
                    router.push('./')
                    Message.success('登录成功')
                }  
            }catch(err){
                console.log(err)
            }
        
        },
        // 首页菜单
        async getMenus({commit}){
            try{
                let res = await api.getMenus()
                // console.log(res)
                if(res.meta.status===200){
                    commit('setMenu',res.data)
                }
            }catch(err){
                console.log(err)
            }
         
        },
        // 用户数据
        async getUserlist({commit}){
             try{
             let res = await api.getUserlist(1,10,'')
             console.log(res)
             if(res.meta.status===200){
                commit('setUserlist',res.data.users)
            }
             }catch(err){
                console.log(err)
            }
        },
        // 添加用户
        async addUser({commit,dispatch},params){
            try{
            let res = await api.addUser(params)
            console.log(res)
            if(res.meta.status===201){
                Message.success('添加成功')
           }
            }catch(err){
            console.log(err)
           }
       },
        //    删除用户
        async deleteUser({commit,dispatch},params){
            try{
            let res =await api.deleteUser(params)
            if(res.meta.status===200){
                Message.success('删除成功')
        }
            }catch(err){
                console.log(err)
            }
        },
        // 修改用户状态
        async editUserstate({commit},{uId,type}){
          try{
            let res =await api.editUserstate({uId,type})
            console.log(res)
            if(res.meta.status===200){
                Message.success(res.meta.msg)
            }
          }catch(err){
            console.log(err)
          }  
        },
        // 修改用户信息
        async editUser({commit},{uId, email, mobile}){
            try{
                let res = await api.editUser({uId, email, mobile})
                if(res.meta.status===200){
                    Message.success(res.meta.msg)
                }
            }catch(err){
                console.log(err)
            }
        },
          // 给用户分配角色
          async assignRole({ commit }, { id, rid }) {
            let res = await api.assignRoles({ id, rid })
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            }
        }
        },  
    modules: {
    }
}