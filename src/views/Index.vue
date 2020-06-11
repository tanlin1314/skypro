<template>
  <div class="app">
    <div class="app1">
      <el-container>
        <!-- 左页面 -->
        <el-aside width="200px" >
          <el-row class="tac">
            <el-col :span="12" >
              <div class="xt">
              <i class="iconfont icon-ziyuan"></i>
              <span class="xt1">外卖管理系统</span>
              </div>
            <el-menu
              :default-active="default_active"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              unique-opened
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b" router>
             <div v-for="v in jurisdiction" :key="v.index">
                <!-- 一级路由及二级路由 -->
                <el-submenu v-if="v.children" :index="v.index">
                  <span slot="title"><i :class="v.ifc"></i>{{v.title}}</span>
                  <!-- 二级 -->
                  <el-menu-item v-for="child in v.children" :key="child.index" :index="child.index">
                    <span slot="title">{{child.title}}</span>
                  </el-menu-item>
                </el-submenu>
            <!-- 一级路由  -->
                  <el-menu-item v-else    :index="v.index">
                    <i :class="v.ifc"></i>
                    <span slot="title">{{v.title}}</span>
                  </el-menu-item>
             </div>
            </el-menu>
          </el-col>
        </el-row>
        </el-aside>
        <!-- 右页面 -->
        <el-container>
            
            <el-main>
              <!-- hash改变数组 -->
             <div class="here">
                <el-breadcrumb separator="/"> 
                <el-breadcrumb-item v-for="v in mbx" :key="v">{{v}}</el-breadcrumb-item>
              </el-breadcrumb>
              <div>
                <div class="zbt">欢迎你
                  <el-dropdown >
                  <span class="el-dropdown-link">
                    {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link to="/Index/Personal">个人中心</router-link></el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                
                
                </div>
                <img :src="imgUrl" alt="" class="tu1">
              </div>
               
             </div>
              <router-view/>
            </el-main>
        
        </el-container>
      </el-container>
    </div>
    
  </div>
</template>

<script>
// index：路由路径  ifc:字体图片  title：标题
import {Token} from '@/api/apis.js'
import {Personal} from '@/api/apis.js'
export default {
  data() {
    return {
      treelist: [
        {
          index: "/Index/homePage",
          ifc: "iconfont icon-fangzi",
          title: "后台首页",
          role:["super","normal"]
        },
        {
          index: "/Index/management",
          ifc: "iconfont icon-dingdan",
          title: "订单管理",
          role:["super","normal"]
          
        },
        {
          index: "3",
          ifc: "iconfont icon-shangpinguanli",
          title: "商品管理",
          role:["super"],
          children: [
            { index: "/Index/goods_add", title: "商品列表" },
            { index: "/Index/Categories", title: "商品分类" },
            { index: "/Index/ProductList", title: "商品列表" },            
            
          ]
        },
        {
          index: "/Index/Order",
          ifc: "iconfont icon-02_dianpuguanli",
          title: "店铺管理",
          role:["super","normal"]          
        },
        {
          index: "5",
          ifc: "iconfont icon-yonghuzhuzhanghaoguanli",
          title: "账号管理",
          role:["super"],          
          children: [
            { index: "/Index/AccountList", title: "账号列表" },
            { index: "/Index/AddAccount", title: "添加账号" },
            { index: "/Index/Password", title: "修改密码" }
          ]
        },
        {
          index: "6",
          ifc: "iconfont icon-xiaoshoutongji",
          title: "销售统计",
          role:["super"],
          children: [
            { index: "/Index/Commodity", title: "商品统计" },
            { index: "/Index/Statistics", title: "订单统计" }
          ]
        }
      ],
      // 面包屑数组
      mbx:['首页'],
      // 默认选中
      default_active:'',
      // 当前是否登录
      user:'请登录',
      role:'',
      imgUrl:''
    };
  },
  watch: {
    $route: {
      handler: function(val) {
        // 判断val值    从多个选一个值用  switch
        /*
        /index/home  ['首页']
        /index/order  ['新增商品','新增商品']
        */
      window.__this=this.mbxei(val.path)

      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 根据hash值变化，切换面包屑
    mbxei(hash){
      let arr=[]
       switch(hash){
         case '/Index/homePage':arr=['首页'];break;
         case '/Index/management':arr=['订单管理'];break;
         case '/Index/goods_add':arr=['订单管理','添加商品'];break;
         case '/Index/Categories':arr=['订单管理','商品分类'];break;
         case '/Index/ProductList':arr=['订单管理','商品列表'];break;         
         case '/Index/Order':arr=['店铺管理'];break;
         case '/Index/AccountList':arr=['账号管理','账号列表'];break;
         case '/Index/AddAccount':arr=['账号管理','添加账号'];break;
         case '/Index/Password':arr=['账号管理','修改密码'];break;
         case '/Index/Commodity':arr=['销售统计','商品统计'];break;
         case '/Index/Statistics':arr=['销售统计','订单统计'];break;
         case '/Index/Personal':arr=['个人中心'];break;
         
       } 
       this.mbx=arr
    }
  },
  // 重新加载    改变左侧菜单默认选中  default-active    面包屑默认选中
  created(){
    // console.log(localStorage.token);
    
    var hash=this.$route.path;
    // console.log(this.$router);          //main.js里router对象实例
    console.log(hash);       //当前hash对象
    // 改变左侧菜单默认选中  default-active 
    this.default_active=this.$route.path;
    // 面包屑默认选中 
    this.mbxei(hash) ;
     window.__this=this
    
    
    // 发送请求验证token是否到期
    Token(localStorage.token).then((res)=>{
      console.log(res);
      if(res.data.code==0){
        // 登录中  把他在本地中的用户名赋值到user
        this.user=localStorage.name;
      }else{
        // 登录失效
        this.user='请登录';
      }
      
      // 保存权限
      this.role=localStorage.role
    }),

      this.id=localStorage.id;
      console.log(this.id);
      
        Personal(this.id).then((res)=>{
            console.log(res);
           this.imgUrl= res.data.accountInfo.imgUrl
           console.log(this.imgUrl);
           
        })
    
  },
  computed:{
      jurisdiction(){
          return this.treelist.filter((i)=>i.role.includes(this.role))
      }
  }
};
</script>


<style lang="less" >
body {
  padding: 0;
  margin: 0;
}
.app,
.app1,
.el-container {
  height: 100%;
}
.app {
  .el-container {
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
  }

  .el-aside {
    background-color: #304156;
    color: #333;
    text-align: center;
    // height: 800px;
  }

  .el-main {
    background-color: #e9eef3;
    padding: 0;
    // color: #333;
    // text-align: center;
    // line-height: 160px;
  }
  .tac {
    .el-col-12 {
      width: 100%;
    }
    a {
      text-decoration: none;
      color: #e9eef3;
      font-size: 14px;
    }
    .icon-ziyuan {
      height: 40px;
      width: 40px;
      font-size: 22px;
      line-height: 40px;
      display: inline-block;
      background-color: aqua;
      border-radius: 50%;
    }
    .xt1 {
      color: #ffffff;
      font-size: 22px;
      height: 56px;
      line-height: 56px;
    }
    .el-menu-item-group__title {
      padding: 0;
    }
    .el-submenu__title {
      min-width: 200px;
    }
    .el-submenu .el-menu-item {
      min-width: 200px;
    }

    .el-submenu__title {
      background-color: #304156 !important;
    }
    .el-icon-menu {
      // margin-right: -20px;
    }
    .el-menu-item {
      min-width: 200px;
      background-color: #304156 !important;

      padding: 0 !important;
    }
    // .el-icon-menu{
    //    margin-left: -90px;
    // }
  }
  .el-breadcrumb {
    height: 40px;
    line-height: 40px;
    // background-color: #ffffff;
  }
  .here{
    padding-left: 20px;
    padding-right: 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    div{
      display: flex;
      .zbt{
      line-height: 40px;
      
    }
    }
    
    // justify-content: space-between;
  }
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .tu1{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    
  }
 
}
</style>



