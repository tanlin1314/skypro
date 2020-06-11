<template>
    <div>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style=" padding: 3px 0" type="text">
                <el-button type="success" @click="submitForm('ruleForm')" icon="el-icon-check" circle ></el-button>
            </el-button>
        </div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="店铺名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <el-form-item label="店铺头像" prop="tx">
                <el-col :span="12">
      <div class="demo-basic--circle">
        <div class="block"><el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar></div>

      </div>
    </el-col> 
            </el-form-item>

            <el-form-item label="店铺图片" prop="tp">
               <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
              
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog >
                <img width="100%"  alt="">
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
            
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光1" name="type"></el-checkbox>                
                
                </el-checkbox-group>
            </el-form-item>
        
            
           
            </el-form>
       
        </el-card>
    </div>
</template>

<script>
    export default {
     data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          tx: '',
          tp:'',
    
          type: [],
          resource: '',
          desc: '',
          fy:'',
          pssj:'',
          miaos:'',
          pfen:'',
          xliang:'',
        //   照片
        //    dialogImageUrl: '',
        // dialogVisible: false
        },
         
       
        //  circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1726070383,703201590&fm=11&gp=0.jpg",
        sizeList: ["large", "medium", "small"]
      ,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          value1:[
           { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
           ] ,
        //   date2: ,
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //   照片
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    //   handlePictureCardPreview(file) {
    //     this.dialogImageUrl = file.url;
    //     this.dialogVisible = true;
    //   }
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
</style>