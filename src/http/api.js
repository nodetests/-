import service from './index'

export default {
  // 用户管理---------------
 login(params) {
   return service.post('login', params)
 },
 // 根据id查询用户
 getUserinfo(id) {
   return service.get(`users/${id}`)
 },
 // 获取菜单
 getMenus() {
   return service.get('menus')
 },
 getUserlist(pagenum,pagesize,query){
   return service.get(`users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
 },
//  添加用户
 addUser(params){
   return service.post('users',params)
 },
//  删除用户
deleteUser(id){
  return service.delete(`users/${id}`)
},
// 修改用户状态
editUserstate({ uId, type }) {
  return service.put(`users/${uId}/state/${type}`)
},
// 修改用户信息
editUser({uId,email,mobile }) {
  return service.put(`users/${uId}`, { email, mobile })
},
// 分配权限
assignRoles({id,rid}){
  return service.put(`users/${id}/role`,{ rid })
},

// 角色权限---------------------------
// 获取角色列表
getRoles(){
 return service.get(`roles`)
},
// 添加角色
addRoles(params){
  return service.post('roles', params)
},
// 删除角色
deleteRoles(id){
  return service.delete(`roles/${id}`)
},
// 角色编辑
editRoles({id, roleName, roleDesc }){
  return service.put(`roles/${id}`, { roleName, roleDesc })
},
// 获取权限列表
getRights(type){
  return service.get(`rights/${type}`)
},
// 角色授权
 // rids:以,分割的权限ID列表（获取所有被选中、叶子节点的key和半选中节点的key,包括 1，2，3级节点）
roleRights({ roleId, rids }) {
  return service.post(`roles/${roleId}/rights`, { rids })
},
 // 删除角色单个权限
 deleteOneRight({ roleId, rightId }) {
  return service.delete(`roles/${roleId}/rights/${rightId}`)
},



// 商品类
// 商品分类管理
    // 获取商品分类数据列表
    // type:[1,2,3] pagenum:当前页码值 pagesize:每页显示多少条数据
    getGoodsCategories({ pagenum, pagesize, type }) {
      if (pagenum && pagesize) {
          return service.get(`categories?pagenum=${pagenum}&pagesize=${pagesize}&type=${type}`)
      } else {
          return service.get(`categories?type=${type}`)
      }

  },
  // 添加分类
  // @params cat_pid:分类父ID(不能为空,如果要添加1级分类,则父分类Id应该设置为0) 
  //         cat_name:分类名称 cat_level:分类层级
  addCategory({ cat_pid, cat_name, cat_level }) {
      return service.post('categories', { cat_pid, cat_name, cat_level })
  },
  // 根据id查询分类
  getCategoryById(id) {
      return service.get(`categories/${id}`)
  },
  // 编辑提交分类
  editCategory({ id, cat_name }) {
      return service.put(`categories/${id}`, { cat_name })
  },
  // 删除分类
  deleteCategory(id) {
      return service.delete(`categories/${id}`)
  },

  // 分类参数管理(id为分类ID)
  // 参数列表
  // sel:[only,many] 通过 only 或 many 来获取分类静态参数还是动态参数
  getAttributesList({ id, sel }) {
      return service.get(`categories/${id}/attributes?sel=${sel}`)
  },
  // 添加动态参数或者静态属性
  // @params attr_name:参数名称 attr_sel:[only,many] attr_vals:如果是 many 就需要填写值的选项，以逗号分隔
  addAttributes({ id, attr_name, attr_sel, attr_vals }) {
      if (!attr_vals) {
          return service.post(`categories/${id}/attributes`, { attr_name, attr_sel })
      } else {
          return service.post(`categories/${id}/attributes`, { attr_name, attr_sel, attr_vals })
      }
  },
  // 删除参数
  // attrid:参数 ID
  deleteAttributes({ id, attrid }) {
      return service.delete(`categories/${id}/attributes/${attrid}`)
  },
  // 根据ID查询参数
  // attr_sel:[only,many] attr_vals:如果是many就需要填写值的选项，以逗号分隔
  getAttributesById({ id, attrid, attr_sel, attr_vals }) {
      return service.get(`categories/${id}/attributes/${attrid}?attr_sel=${attr_sel}&attr_vals=${attr_vals}`)
  },
  // 编辑提交参数
  // @params attr_name:新属性的名字 attr_sel:属性的类型[many或only] attr_vals:参数的属性值
  editAttributes({ id, attrid, attr_name, attr_sel, attr_vals }) {
      return service.put(`categories/${id}/attributes/${attrid}`, { attr_name, attr_sel, attr_vals })
  },

  // 商品管理(id均为商品id)
  // 获取商品列表数据
  // query:查询参数(搜索使用,可以为空) pagenum:当前页码 pagesize:每页显示条数
  getGoodsList({ pagenum, pagesize, query }) {
      return service.get(`goods?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
  },
  // 添加商品
  // @params
  //  goods_name:商品名称 goods_cat:以为','分割的分类列表 goods_price:价格
  //  goods_number:数量 goods_weight:重量 goods_introduce:介绍
  //  pics:上传的图片临时路径（对象） attrs 商品的参数（数组），包含 动态参数 和 静态属性
  //  注:介绍、图片和商品参数可以为空
  addGoods(params) {
      return service.post('goods', params)
  },
  // 根据ID查询商品
  getGoodsById(id) {
      return service.get(`goods/${id}`)
  },
  // 编辑提交商品(只做效果,不提交接口)
  // @params
  //  goods_name:商品名称 goods_cat:以为','分割的分类列表 goods_price:价格
  //  goods_number:数量 goods_weight:重量 goods_introduce:介绍
  //  pics:上传的图片临时路径（对象） attrs 商品的参数（数组），包含 动态参数 和 静态属性
  //  注:介绍、图片和商品参数可以为空
  editGoodInfo(id, params) {
      return service.put(`goods/${id}`, params)
  },
  // 删除商品
  deleteGoods(id) {
      return service.delete(`goods/${id}`)
  },
  // 同步商品图片
  // pics:商品图片集合(如果有 pics_id 字段会保留该图片，如果没有 pics_id 但是有 pic 字段就会新生成图片数据)
  synchroPics(id, { pics }) {
      return service.put(`goods/${id}/pics`, { pics })
  },
  // 同步商品属性
  synchroGoods(id) {
      return service.put(`goods/${id}/attributes`)
  },

  // 图片上传
  uploadImage({ file }) {
      return service.post('upload', { file })
  },


   // 订单管理(此模块下的接口中的Id为订单id)
    // 获取订单数据列表
    // pagenum:当前页码 pagesize:每页显示条数 query:查询参数(查询参数为搜索时使用,在获取订单时也可以不传)
    // 注:以下参数用于订单分类时使用(可以不传)
    // user_id:用户 ID, pay_status:支付状态, is_send:是否发货
    // order_fapiao_title:['个人','公司'], order_fapiao_company:公司名称
    // order_fapiao_content:发票内容, consignee_addr:发货地址
    getOrderList({ pagenum, pagesize, query }) {
      return service.get(`orders?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
  },
    // 修改订单状态
    // @params
    //  is_send:是否发货 order_pay:订单支付(支付方式 0 未支付 1 支付宝 2 微信 3 银行卡)
    //  order_price:订单价格 order_number:订单数量 pay_status:支付状态(订单状态： 0 未付款、1 已付款)
    editOrder(id, params) {
        return service.put(`orders/${id}`, params)
    },
    // 查看订单详情
    getOrderDetail(id) {
        return service.get(`orders/${id}`)
    },
    // 查看物流信息(此处的id为物流单号id)
    // 供测试的物流单号：1106975712662 或者 804909574412544600
    checkwuliu(id) {
        return service.get(`/kuaidi/${id}`)
    },

    // 数据统计
    // 基于时间统计的折线图
    getReports() {
        return service.get('reports/type/1')
    }
}