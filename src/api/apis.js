import axios from 'axios'
// 设置服务器ip地址
axios.defaults.baseURL = 'http://localhost:5000'
    // 登陆 
    //  account: 用户名
    //  password: 密码
    // export const XXXX = (传参1, 传参2) => axios.xxx('/xxx接口', {xxx, xxx})
export const Land = (account, password) => axios.post('/users/checkLogin', { account, password })

// 添加账号
// account  用户名
// password 密码
// userGroup 用户组  account
export const Account = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })

//获取账号列表
// currentPage  当前页码
// pageSize 每页条数
// 
export const AccountList = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })

//获取删除账号
// id  
// 
// 
export const DelID = (id) => axios.get('/users/del', { params: { id } })

// 批量删除
// ids要删除用户的字符串数组  '[1,2,2,3]'
export const Batchdel = (ids) => axios.get('/users/batchdel', { params: { ids } })


//修改账号
// id  
// account  用户名
// userGroup 用户组
export const Amend = (id, userGroup, account) => axios.post('/users/edit', { id, userGroup, account })


//  验证token是否过期
export const Token = (token) => axios.get('/users/checktoken', { params: { token } })



// 原密码
export const Checkoldpwd = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })


//修改密码
export const Editpwd = (newPwd, id) => axios.post('/users/editpwd', { newPwd, id })



// export const Token = (token) => axios.get('/users/checktoken', { params: { token } })



// 个人中心
// id


export const Personal = (id) => axios.get('/users/accountinfo', { params: { id } })

// 获取分类 /goods/catelist

export const Catelist = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })


// 添加分类 /goods/addcate

export const Addcate = (cateName, state) => axios.post('/goods/addcate', { cateName, state })


// 14. 删除分类

export const Delcate = (id) => axios.get('/goods/delcate', { params: { id } })

// 商品图片上传
// export const goods_img_upload = () => axios.post('/goods/goods_img_upload', {})



// 添加商品/goods/add

export const Add = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })

// /goods/list商品列表

export const Lsit = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })

//首页报表接口 /order/totaldata

export const Totaldata = () => axios.get('/order/totaldata', {})

// 删除商品 /goods/del
export const goodsDel = (id) => axios.get('/goods/del', { params: { id } })

// 订单管理 GET
export const orderList = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/list', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// 查询  /order/search  

export const orderSearch = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// 获取订单详情  查看  /order/detail

export const orderDetail = (id) => axios.get('/order/detail', { params: { id } })


//修改订单 order/edit
export const orderEdit = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post('order/edit', { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })


// 获取店铺管理  /shop/info

export const shopInfo = () => axios.get('/shop/info', { params: {} })


//  店铺内容修改/shop/edit
export const shopEdit = (id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics) => axios.post('/shop/edit', { id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics })


//订单报表 /order/ordertotal
export const orderOrdertotal = (date) => axios.get('/order/ordertotal', { params: { date } })