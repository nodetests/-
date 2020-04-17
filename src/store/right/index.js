// 默认导出一个对象既一个模块
import api from '../../http/api'
import {Message} from 'element-ui'
import router from '../../router'
export default{
    namespaced: true,
    state: {
    roles:[],
    // 接收所有的权限(list)
    listRights: [],
    // 接收所有的权限(tree)
    treeRights: [],
    // 当前选中用户的权限列表
    alreadyRightsArr: [],
    // // 当前选中的角色(商品、用户)
    // editObj: {},
    },
    mutations: {
     setRoles(state,data){
         state.roles=data
     },
     
    // 权限信息的处理(list)
     setListRights(state, data) {
        state.listRights = data 
    },
     // 权限信息的处理(tree) 总的权限信息
     setTreeRights(state,data){
        state.treeRights=data
    },
    // 每个用户的权限信息
    // 当前选中用户权限信息的处理
    setalreadyRightsArr(state, data) {
        state.alreadyRightsArr = data
    },
    // 当前角色的处理
    // setEditObj(state, data) {
    //     state.editObj = data
    //     // console.log(state.editObj);
    // },
    },
   
    actions: {
    //  获取角色列表
    async getRoles({commit}){
       try{
          let res =await api.getRoles()
        //   console.log(res)
          if(res.meta.status===200){
            commit('setRoles',res.data)
          }
       }catch(err){

       }
    },
    // 添加角色
    async addRoles({ commit, dispatch }, params) {
        let res = await api.addRoles(params)
        if (res.meta.status === 201) {
            Message.success(res.meta.msg)
            // dispatch('roles')
        }
    },
    // 删除角色
    async deleteRoles({ commit, dispatch }, id) {
        let res = await api.deleteRoles(id)
        console.log(res)
        if (res.meta.status === 200) {
            Message.success(res.meta.msg)
            // dispatch('roles')
        }
    },
    // 更新角色信息
    async editRoles({ dispatch }, { id, roleName, roleDesc }) {
        let res = await api.editRoles({ id, roleName, roleDesc })
        if (res.meta.status === 200) {
            Message.success('修改成功')
            // dispatch('roles')
        }
    },
    // 获取权限列表
    async getRights({commit},type){
        try{
            let res = await api.getRights(type)
            console.log(res)
            if (res.meta.status === 200) {
                if (type === 'list') {
                    commit('setListRights', res.data)
                } else {
                    commit('setTreeRights', res.data)

                }
            }
        }catch(err){
 
        }
     },
    // 角色授权
      // roleid 角色id rightId权限id数组 给某一个角色相应的权限
    async roleRights({ commit, dispatch }, { roleId, rids }) {
        let res = await api.roleRights({roleId, rids})
        console.log(res)
        if (res.meta.status === 200) {
            Message.success(res.meta.msg)
            // dispatch('roles')
        }
     },
    // 删除角色某一权限
    // roleid 角色id rightId权限id
    async deleteOneRight({ commit, dispatch }, { roleId, rightId }) {
        let res = await api.deleteOneRight({ roleId, rightId })
        if (res.meta.status === 200) {
            Message.success('删除权限成功')
            commit('setEditRightsArr', res.data)
        }
    },
   },
    getters: {
        // 所有权限id
        rightsIdArr(state) {
            let idArr = []
            state.listRights.map(item => {
                if (item.level == '0' || item.level == '1') {
                    idArr.push(item.id)
                }
            })
            return idArr
        },
        // 当前选中角色id数组
        nowIdArr(state) {
            let nowidArr = []
            if (state.alreadyRightsArr.length > 0) {
                state.alreadyRightsArr.map(item => {
                    if (item.children.length > 0) {
                        item.children.map(item0 => {
                            if (item0.children.length > 0) {
                                item0.children.map(item1 => {
                                    nowidArr.push(item1.id)
                                })
                            }
                        })
                    }
                })
            }
            return nowidArr
        }
    },
}