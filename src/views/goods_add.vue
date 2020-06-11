<template>
    <div>
     <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
            <el-select v-model="form.region" placeholder="请选择商品分类">
            <el-option label="商品分类1" value="shanghai"></el-option>
            <el-option label="商品分类2" value="beijing"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="商品价格">
        <el-input-number v-model="form.num" @change="handleChange" :min="1" :max="10" label="描述文字" ></el-input-number>
       
        </el-form-item>
        <el-form-item label="商品图片">
            <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
        </el-form-item>

          <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
            
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>

     </el-card>
    </div>
</template>

<script> 
import {Add} from '@/api/apis.js'
    export default {
         data() {
            return {
                form: {
                name: '',
                region: '',
                num:'1',
                desc:'',
                // 上传图片
                },
                 imageUrl: ''
              
            }
            },
            methods: {
            onSubmit() {
                // 获取名称            
                //添加商品
                Add(this.form.name,this.form.region,this.form.num,this.imageUrl,this.form.desc).then(res=>{
                    console.log(res);
                })
            },
            // 计数器
             handleChange(value) {
                console.log(value);
            },
            // 上传图片
          handleAvatarSuccess(file) {
         
             this.imageUrl=file.imgUrl;
                 console.log(file);
             
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
                }
                return isJPG && isLt1M;
            }
           
            },
            
    }
</script>

<style lang="less" scoped>
.box-card{
    margin: 20px;
     .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-input{
      width: 220px ;
  }
  .avatar-uploader{
      width: 179px;
      height: 179px;
      border: 2px dashed  #F5F7FA;
  }
  .el-textarea{
      width: 300px;
  }
}
</style>