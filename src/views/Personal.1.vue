<template>
    <div>
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>管理员信息</span>
  </div>

    <div class="xian">
     管理员id：<span>{{id}}</span>
    </div>
      <div class="xian">
     账户：<span>{{name}}</span>
    </div> 
     <div class="xian">
     用户组：<span>{{userGroup}}</span>
    </div> 
     <div class="xian">
     创建时间：<span>{{ctime}}</span>
    </div>

    <div class="demo-basic--circle">
    <div class="block"><div class="tu">管理员头像:
        </div>

        </div>
    </div>

</el-card>
    </div>
</template>

<script>
// import tu from '../assets/img/0.jpg'
import {Personal} from '@/api/apis.js'
    export default {
        data () {
      return {
        // id:localStorage.id,
        id:'',
        name:'',
        account:'',
        userGroup:'',
        ctime:'',
         imageUrl: ''

      }
    },
    // 页面加载渲染值
    created(){
        let id=localStorage.id;
        Personal(id).then((res)=>{
            console.log(res);
        this.name=res.data.accountInfo.account
        this.account=res.data.accountInfo.account
        this.id=res.data.accountInfo.id
        this.userGroup=res.data.accountInfo.userGroup
        this.ctime=res.data.accountInfo.ctime

        })
    },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
</script>

<style lang="less" scoped>
    .xian{
       height: 40px;
       line-height: 40px;
        border-bottom:1px solid #EBEEF5;
    }
    .block{
        display: flex;
        margin-top: 10px;
        .tu{
            line-height: 50px;
            // text-align:center;
        }
    }
</style>