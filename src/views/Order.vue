<template>
    <div>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style=" padding: 3px 0" type="text">
                <el-button type="success" @click="dialogFormVisible = true" icon="el-icon-check" circle ></el-button>
            </el-button>
        </div>
        <!-- 修改模态框 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                  <el-form :model="rule"  ref="rule" label-width="100px" class="demo-ruleForm">
            <el-form-item label="店铺名称" prop="name">
                <el-input v-model="rule.name"></el-input>
            </el-form-item>

            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="rule.desc"></el-input>
            </el-form-item>

            <el-form-item label="店铺头像" prop="tx">
                <el-col :span="12">
           <div class="demo-basic--circle">
            <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl">
              </el-avatar>
              </div>
            </div>
            </el-col> 
            </el-form-item>

            <el-form-item label="店铺图片" prop="tp">
             <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>

             <el-form-item label="配送费">
                <el-input v-model="rule.fy"></el-input>
            </el-form-item>
            <el-form-item label="配送时间">
                <el-input v-model="rule.pssj"></el-input>
            </el-form-item>
             <el-form-item label="配送描述">
                <el-input v-model="rule.miaos"></el-input>
            </el-form-item>
             <el-form-item label="配送评分">
                <el-input v-model="rule.pfen"></el-input>
            </el-form-item>
             <el-form-item label="销量">
                <el-input v-model="rule.xliang"></el-input>
            </el-form-item>
           
            <el-form-item label="营业时间" required>
                    <el-time-picker
                    type="date"
                     prop="value1"
                    is-range
                    v-model="rule.value1"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>
            
            <el-form-item label="活动性质" >
                <el-checkbox-group v-model="type1">
                <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
                <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
                <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
                <el-checkbox label="618精彩大促满20-10" name="type"></el-checkbox>      
                <el-checkbox label="玉米浓浓堡上心" name="type"></el-checkbox>
                <el-checkbox label="美团配送满25-5" name="type"></el-checkbox>
                         
                
                </el-checkbox-group>
            </el-form-item>
        
            
           
            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm(),dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
<!-- 列表 -->
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="店铺名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <el-form-item label="店铺头像" prop="tx">
                <el-col :span="12">
           <div class="demo-basic--circle">
            <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl">
              </el-avatar>
              </div>
            </div>
            </el-col> 
            </el-form-item>

            <el-form-item label="店铺图片" prop="tp">
               <el-upload
                action="http://127.0.0.1:5000/shop/upload"
                list-type="picture-card"
                 :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl1" alt="">
              </el-dialog>
            </el-form-item>

             <el-form-item label="配送费">
                <el-input v-model="ruleForm.fy"></el-input>
            </el-form-item>
            <el-form-item label="配送时间">
                <el-input v-model="ruleForm.pssj"></el-input>
            </el-form-item>
             <el-form-item label="配送描述">
                <el-input v-model="ruleForm.miaos"></el-input>
            </el-form-item>
             <el-form-item label="配送评分">
                <el-input v-model="ruleForm.pfen"></el-input>
            </el-form-item>
             <el-form-item label="销量">
                <el-input v-model="ruleForm.xliang"></el-input>
            </el-form-item>
           
            <el-form-item label="营业时间" required>
                    <el-time-picker
                    type="date"
                     prop="value1"
                    is-range
                    v-model="ruleForm.value1"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>
            
            <el-form-item label="活动性质" >
                <el-checkbox-group v-model="type">
                <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
                <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
                <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
                <el-checkbox label="618精彩大促满20-10" name="type"></el-checkbox>      
                <el-checkbox label="玉米浓浓堡上心" name="type"></el-checkbox>
                <el-checkbox label="美团配送满25-5" name="type"></el-checkbox>
                         
                
                </el-checkbox-group>
            </el-form-item>
        
            
           
            </el-form>
       
        </el-card>
    </div>
</template>

<script>
import {shopInfo,shopEdit} from '@/api/apis.js'
    export default {
     data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          value1: [],
          tx: '',
          tp:'',
    
         
          resource: '',
          desc: '',
          fy:'',
          pssj:'',
          miaos:'',
          pfen:'',
          xliang:'',

        },
        // 修改
           rule: {
          name: '',
          region: '',
          value1: [ "2018-02-03 18:56:03", "2020-06-10 09:15:00"],
          tx: '',
          tp:'',
          resource: '',
          desc: '',
          fy:'',
          pssj:'',
          miaos:'',
          pfen:'',
          xliang:'',

        },
        imageUrl: '',
        id:'',
         gridData:[],
         dialogFormVisible: false,
         fileList: [{
          name: 'food.jpeg',
          url: 'http://127.0.0.1:5000/upload/shop/1590480883773.webp'
        }, {
          name: 'food2.jpeg',
          url: 'http://127.0.0.1:5000/upload/shop/1590480889717.webp'
        }],
        form: {
          name: '',
          region: '',
        },
        formLabelWidth: '120px',
         type: [],
         type1: [],
        // imageUrl: '',
        squareUrl1:'',
        dialogImageUrl1:'',
        dialogImageUrl: '',
        dialogVisible: false,
        squareUrl:"",
        sizeList: ["large", "medium", "small"]
      ,
      };
    },
    methods: {
      handleAvatarSuccess(res, file){
         this.imageUrl = URL.createObjectURL(file.raw);
         console.log(res);
         
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
      },
      submitForm() {
      
        console.log(this.squareUrl);
     
        
        
       shopEdit(this.id,this.rule.name,this.rule.desc,this.squareUrl,this.rule.fy,this.rule.pssj,this.rule.miaos,this.rule.pfen,this.rule.xliang,JSON.stringify(this.type1),JSON.stringify(this.rule.value1),JSON.stringify(this.dialogImageUrl1)).then(res=>{
         console.log(res);
         
       })
        
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    created(){
      // 获取商品详情
        shopInfo().then((res)=>{
         this.ruleForm.name= res.data.data.name
         this.ruleForm.desc= res.data.data.bulletin
         this.squareUrl=res.data.data.avatar
         this.ruleForm.fy= res.data.data.deliveryPrice
         this.ruleForm.pssj= res.data.data.deliveryTime
         this.ruleForm.miaos= res.data.data.description
         this.ruleForm.pfen= res.data.data.score
         this.ruleForm.xliang= res.data.data.sellCount
         this.ruleForm.value1= res.data.data.date
         this.type = res.data.data.supports
         this.id=res.data.data.id
        //  console.log();
         
         this.dialogImageUrl=res.data.data.pics
         
         
        //  console.log(this.id);
          // console.log( this.type);
        })
    }
  }
</script>

<style lang="less" scoped>
.el-card__header{
    display: flex;
    justify-content: flex-end;
}
.el-button{
    margin-left: 85%
}
.el-input{
    width: 38%;
}
.el-textarea{
    width: 45%;
}

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
</style>